import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Star, MapPin, Clock, Award, Calendar, DollarSign, ArrowLeft } from "lucide-react";
import logo from "@/assets/logo.png";
import { mockBabysitters, MockBabysitter } from "@/data/mockBabysitters";

interface BabysitterProfile {
  id: string;
  user_id: string;
  age: number;
  years_experience: number;
  certifications: string[];
  description: string;
  specialties: string[];
  hourly_rate: number;
  availability: string[];
  average_rating: number;
  total_reviews: number;
  profiles: {
    name: string;
    city: string;
    phone: string;
  };
}

const BabysitterProfile = () => {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [babysitter, setBabysitter] = useState<BabysitterProfile | null>(null);
  const [mockBabysitter, setMockBabysitter] = useState<MockBabysitter | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (!session) {
        navigate("/auth");
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      if (event === "SIGNED_OUT") {
        navigate("/auth");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  useEffect(() => {
    if (id) {
      fetchBabysitter();
    }
  }, [id]);

  const fetchBabysitter = async () => {
    if (!id) return;

    // Check if it's a mock babysitter
    if (id.startsWith("mock-")) {
      const mock = mockBabysitters.find((b) => b.id === id);
      if (mock) {
        setMockBabysitter(mock);
      }
      setLoading(false);
      return;
    }

    // Fetch real babysitter
    try {
      const { data, error } = await supabase
        .from("babysitter_profiles")
        .select(`
          *,
          profiles (
            name,
            city,
            phone
          )
        `)
        .eq("user_id", id)
        .single();

      if (error) throw error;
      setBabysitter(data);
    } catch (error) {
      console.error("Error fetching babysitter:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-foreground">Carregando...</p>
      </div>
    );
  }

  const displayData = mockBabysitter || (babysitter ? {
    name: babysitter.profiles?.name,
    age: babysitter.age,
    city: babysitter.profiles?.city,
    years_experience: babysitter.years_experience,
    certifications: babysitter.certifications || [],
    description: babysitter.description,
    specialties: babysitter.specialties || [],
    hourly_rate: babysitter.hourly_rate,
    availability: babysitter.availability || [],
    average_rating: babysitter.average_rating,
    total_reviews: babysitter.total_reviews,
    avatar_initials: babysitter.profiles?.name?.split(" ").map(n => n[0]).join("") || "?",
  } : null);

  if (!displayData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Babá não encontrada.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/dashboard" className="flex items-center gap-2">
            <img src={logo} alt="BabyCare" className="h-12 w-auto" />
          </Link>
          <div className="flex items-center gap-4">
            <Link to="/search" className="text-foreground hover:text-primary">
              Buscar Babás
            </Link>
            <Button variant="outline" onClick={handleSignOut}>
              Sair
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <Button variant="ghost" asChild className="mb-6">
          <Link to="/search">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar à Busca
          </Link>
        </Button>

        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <Avatar className="w-32 h-32">
                <AvatarFallback className="text-4xl bg-primary/10 text-primary">
                  {displayData.avatar_initials}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <div className="flex items-start justify-between flex-wrap gap-4">
                  <div>
                    <CardTitle className="text-3xl mb-2">{displayData.name}</CardTitle>
                    <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-3">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {displayData.city}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {displayData.age} anos
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {displayData.years_experience} anos de experiência
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                        <span className="text-2xl font-bold">{displayData.average_rating.toFixed(1)}</span>
                      </div>
                      <span className="text-muted-foreground">
                        ({displayData.total_reviews} avaliações)
                      </span>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="flex items-center gap-2 text-3xl font-bold text-primary mb-2">
                      <DollarSign className="w-8 h-8" />
                      R$ {displayData.hourly_rate.toFixed(2)}/h
                    </div>
                    <Button size="lg" className="w-full">
                      Enviar Proposta
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            <Separator />
            
            <div>
              <h3 className="text-xl font-semibold mb-3">Sobre Mim</h3>
              <CardDescription className="text-base leading-relaxed">
                {displayData.description}
              </CardDescription>
            </div>

            <Separator />

            <div>
              <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                <Award className="w-5 h-5" />
                Certificações
              </h3>
              {displayData.certifications.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {displayData.certifications.map((cert, index) => (
                    <Badge key={index} variant="secondary" className="text-sm py-1 px-3">
                      {cert}
                    </Badge>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">Nenhuma certificação registrada</p>
              )}
            </div>

            <Separator />

            <div>
              <h3 className="text-xl font-semibold mb-3">Especialidades</h3>
              <div className="flex flex-wrap gap-2">
                {displayData.specialties.map((specialty, index) => (
                  <Badge key={index} className="text-sm py-1 px-3">
                    {specialty}
                  </Badge>
                ))}
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="text-xl font-semibold mb-3">Disponibilidade</h3>
              <div className="flex flex-wrap gap-2">
                {displayData.availability.map((time, index) => (
                  <Badge key={index} variant="outline" className="text-sm py-1 px-3">
                    {time}
                  </Badge>
                ))}
              </div>
            </div>

            {mockBabysitter && (
              <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  ℹ️ Este é um perfil de demonstração. Para enviar propostas reais, aguarde babás se cadastrarem na plataforma.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default BabysitterProfile;
