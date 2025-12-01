import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
      if (!session) {
        navigate("/auth");
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      if (event === "SIGNED_OUT") {
        navigate("/auth");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

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

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="BabyCare" className="h-12 w-auto" />
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-foreground">
              Olá, {user?.user_metadata?.name || user?.email}
            </span>
            <Button variant="outline" onClick={handleSignOut}>
              Sair
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-foreground mb-6">
          Dashboard
        </h1>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-card p-8 rounded-2xl border border-border">
            <h2 className="text-2xl font-semibold mb-4">Buscar Babás</h2>
            <p className="text-muted-foreground mb-4">
              Encontre babás qualificadas próximas a você
            </p>
            <Button asChild>
              <Link to="/search">Buscar Agora</Link>
            </Button>
          </div>
          
          <div className="bg-card p-8 rounded-2xl border border-border">
            <h2 className="text-2xl font-semibold mb-4">Meu Perfil</h2>
            <p className="text-muted-foreground mb-4">
              Complete ou edite suas informações
            </p>
            <Button variant="secondary" asChild>
              <Link to="/profile/setup">Editar Perfil</Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
