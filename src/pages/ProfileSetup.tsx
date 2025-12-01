import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import logo from "@/assets/logo.png";

const ProfileSetup = () => {
  const [user, setUser] = useState<User | null>(null);
  const [userType, setUserType] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Common fields
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");

  // Babysitter fields
  const [age, setAge] = useState("");
  const [experience, setExperience] = useState("");
  const [description, setDescription] = useState("");
  const [hourlyRate, setHourlyRate] = useState("");

  // Parent fields
  const [numberOfChildren, setNumberOfChildren] = useState("");
  const [specialNeeds, setSpecialNeeds] = useState("");

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate("/auth");
        return;
      }
      setUser(session.user);
      setUserType(session.user.user_metadata?.user_type || "parent");
      setName(session.user.user_metadata?.name || "");
    });
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    setLoading(true);

    try {
      // Update profiles table
      const { error: profileError } = await supabase
        .from("profiles")
        .update({
          name,
          phone,
          city,
        })
        .eq("id", user.id);

      if (profileError) throw profileError;

      if (userType === "babysitter") {
        // Create or update babysitter profile
        const { error: babysitterError } = await supabase
          .from("babysitter_profiles")
          .upsert({
            user_id: user.id,
            age: parseInt(age),
            years_experience: parseInt(experience),
            description,
            hourly_rate: parseFloat(hourlyRate),
          });

        if (babysitterError) throw babysitterError;
      } else {
        // Create or update parent profile
        const { error: parentError } = await supabase
          .from("parent_profiles")
          .upsert({
            user_id: user.id,
            number_of_children: parseInt(numberOfChildren),
            special_needs: specialNeeds,
          });

        if (parentError) throw parentError;
      }

      toast({
        title: "Perfil atualizado!",
        description: "Suas informações foram salvas com sucesso.",
      });

      navigate("/dashboard");
    } catch (error: any) {
      toast({
        title: "Erro",
        description: error.message || "Não foi possível salvar o perfil.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/dashboard">
            <img src={logo} alt="BabyCare" className="h-12 w-auto" />
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-2xl">
        <h1 className="text-4xl font-bold text-foreground mb-2">
          Complete seu Perfil
        </h1>
        <p className="text-muted-foreground mb-8">
          Preencha seus dados para {userType === "babysitter" ? "começar a oferecer seus serviços" : "encontrar babás"}
        </p>

        <form onSubmit={handleSubmit} className="space-y-6 bg-card p-8 rounded-2xl border border-border">
          <div>
            <Label htmlFor="name">Nome Completo *</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="phone">Telefone</Label>
            <Input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="(11) 99999-9999"
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="city">Cidade *</Label>
            <Input
              id="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
              className="mt-1"
            />
          </div>

          {userType === "babysitter" && (
            <>
              <div>
                <Label htmlFor="age">Idade *</Label>
                <Input
                  id="age"
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  required
                  min="18"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="experience">Anos de Experiência *</Label>
                <Input
                  id="experience"
                  type="number"
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  required
                  min="0"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="description">Descrição Profissional *</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  rows={4}
                  placeholder="Conte um pouco sobre você, sua experiência e diferenciais..."
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="hourlyRate">Valor por Hora (R$) *</Label>
                <Input
                  id="hourlyRate"
                  type="number"
                  step="0.01"
                  value={hourlyRate}
                  onChange={(e) => setHourlyRate(e.target.value)}
                  required
                  min="0"
                  className="mt-1"
                />
              </div>
            </>
          )}

          {userType === "parent" && (
            <>
              <div>
                <Label htmlFor="numberOfChildren">Número de Crianças *</Label>
                <Input
                  id="numberOfChildren"
                  type="number"
                  value={numberOfChildren}
                  onChange={(e) => setNumberOfChildren(e.target.value)}
                  required
                  min="1"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="specialNeeds">Necessidades Especiais</Label>
                <Textarea
                  id="specialNeeds"
                  value={specialNeeds}
                  onChange={(e) => setSpecialNeeds(e.target.value)}
                  rows={3}
                  placeholder="Descreva qualquer necessidade especial ou informação importante..."
                  className="mt-1"
                />
              </div>
            </>
          )}

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Salvando..." : "Salvar Perfil"}
          </Button>
        </form>
      </main>
    </div>
  );
};

export default ProfileSetup;
