import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";
import { Heart, Shield, Users, Clock } from "lucide-react";

const Home = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="BabyCare" className="h-12 w-auto" />
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link to="/about" className="text-foreground hover:text-primary transition-colors">
              Sobre
            </Link>
            <Link to="/how-it-works" className="text-foreground hover:text-primary transition-colors">
              Como Funciona
            </Link>
            <Link to="/creators" className="text-foreground hover:text-primary transition-colors">
              Criadores
            </Link>
          </nav>
          <div className="flex gap-3">
            <Button variant="outline" asChild>
              <Link to="/auth">Entrar</Link>
            </Button>
            <Button asChild>
              <Link to="/auth?mode=signup">Cadastrar</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
            Encontre a Babá Perfeita<br />
            <span className="text-primary">para sua Família</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Conectamos pais e babás qualificadas com segurança, confiança e praticidade. 
            Cuide de quem você ama com quem realmente se importa.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button size="lg" asChild>
              <Link to="/auth?mode=signup&type=parent">Sou Pai/Mãe</Link>
            </Button>
            <Button size="lg" variant="secondary" asChild>
              <Link to="/auth?mode=signup&type=babysitter">Sou Babá</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4 bg-card/30">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-foreground">
            Por que escolher o BabyCare?
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Segurança</h3>
              <p className="text-muted-foreground">
                Babás verificadas e avaliadas pela comunidade
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Comunidade</h3>
              <p className="text-muted-foreground">
                Avaliações reais de pais e babás
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Praticidade</h3>
              <p className="text-muted-foreground">
                Agende e gerencie tudo em um só lugar
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Cuidado</h3>
              <p className="text-muted-foreground">
                Profissionais dedicadas ao bem-estar das crianças
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6 text-foreground">
            Pronto para começar?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Junte-se a centenas de famílias que já confiam no BabyCare
          </p>
          <Button size="lg" asChild>
            <Link to="/auth?mode=signup">Criar Conta Gratuita</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-4">
        <div className="container mx-auto text-center text-muted-foreground">
          <p>&copy; 2025 BabyCare. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
