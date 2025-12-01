import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Star, MapPin, Clock, Search } from "lucide-react";
import logo from "@/assets/logo.png";

interface BabysitterProfile {
  id: string;
  user_id: string;
  age: number;
  years_experience: number;
  description: string;
  hourly_rate: number;
  average_rating: number;
  total_reviews: number;
  profiles: {
    name: string;
    city: string;
  };
}

const SearchBabysitters = () => {
  const [user, setUser] = useState<User | null>(null);
  const [babysitters, setBabysitters] = useState<BabysitterProfile[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
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
    fetchBabysitters();
  }, []);

  const fetchBabysitters = async () => {
    try {
      const { data, error } = await supabase
        .from("babysitter_profiles")
        .select(`
          *,
          profiles (
            name,
            city
          )
        `)
        .order("average_rating", { ascending: false });

      if (error) throw error;
      setBabysitters(data || []);
    } catch (error) {
      console.error("Error fetching babysitters:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  const filteredBabysitters = babysitters.filter((b) =>
    b.profiles?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.profiles?.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/dashboard" className="flex items-center gap-2">
            <img src={logo} alt="BabyCare" className="h-12 w-auto" />
          </Link>
          <div className="flex items-center gap-4">
            <Link to="/dashboard" className="text-foreground hover:text-primary">
              Dashboard
            </Link>
            <Button variant="outline" onClick={handleSignOut}>
              Sair
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Encontrar Babás
          </h1>
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              type="text"
              placeholder="Buscar por nome ou cidade..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Carregando babás...</p>
          </div>
        ) : filteredBabysitters.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">
              {searchTerm
                ? "Nenhuma babá encontrada com esses critérios."
                : "Ainda não há babás cadastradas. Seja a primeira a se cadastrar!"}
            </p>
            {!searchTerm && (
              <Button asChild variant="outline">
                <Link to="/auth?mode=signup&type=babysitter">Cadastrar como Babá</Link>
              </Button>
            )}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBabysitters.map((babysitter) => (
              <Card key={babysitter.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <Avatar className="w-16 h-16">
                      <AvatarFallback className="text-xl bg-primary/10 text-primary">
                        {babysitter.profiles?.name?.split(" ").map(n => n[0]).join("") || "?"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <CardTitle className="text-xl mb-1">
                        {babysitter.profiles?.name}
                      </CardTitle>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
                        <MapPin className="w-4 h-4" />
                        {babysitter.profiles?.city}
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-semibold">{babysitter.average_rating.toFixed(1)}</span>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          ({babysitter.total_reviews} avaliações)
                        </span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-4 line-clamp-3">
                    {babysitter.description}
                  </CardDescription>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-primary font-semibold">
                      R$ {babysitter.hourly_rate?.toFixed(2)}/hora
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      {babysitter.years_experience} anos
                    </div>
                  </div>
                  <Button className="w-full mt-4" asChild>
                    <Link to={`/babysitter/${babysitter.user_id}`}>
                      Ver Perfil
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default SearchBabysitters;
