import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";
import { UserPlus, Search, MessageCircle, Calendar, Star } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: UserPlus,
      title: "Crie sua Conta",
      description: "Cadastre-se como pai/mãe ou babá em poucos minutos",
    },
    {
      icon: Search,
      title: "Busque ou Seja Encontrado",
      description: "Pais buscam babás qualificadas, babás criam perfis atrativos",
    },
    {
      icon: MessageCircle,
      title: "Converse e Negocie",
      description: "Chat direto para tirar dúvidas e fazer propostas",
    },
    {
      icon: Calendar,
      title: "Agende o Serviço",
      description: "Defina data, horário e valor de forma simples",
    },
    {
      icon: Star,
      title: "Avalie a Experiência",
      description: "Compartilhe sua experiência para ajudar outros usuários",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="BabyCare" className="h-12 w-auto" />
          </Link>
          <Link to="/" className="text-foreground hover:text-primary transition-colors">
            Voltar
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Como Funciona
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Simples, seguro e eficiente. Veja como o BabyCare facilita a conexão 
            entre famílias e cuidadores
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {steps.map((step, index) => (
            <div key={index} className="flex gap-6 items-start">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <step.icon className="w-8 h-8 text-primary" />
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-3xl font-bold text-primary">{index + 1}</span>
                  <h3 className="text-2xl font-semibold text-foreground">{step.title}</h3>
                </div>
                <p className="text-lg text-muted-foreground">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 p-8 bg-card/30 rounded-2xl border border-border max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold text-foreground mb-4 text-center">
            Pronto para começar?
          </h2>
          <p className="text-center text-muted-foreground mb-6">
            Junte-se a centenas de famílias e babás que já usam o BabyCare
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              to="/auth?mode=signup&type=parent"
              className="bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:opacity-90 transition-opacity"
            >
              Sou Pai/Mãe
            </Link>
            <Link
              to="/auth?mode=signup&type=babysitter"
              className="bg-secondary text-secondary-foreground px-6 py-3 rounded-lg hover:opacity-90 transition-opacity"
            >
              Sou Babá
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HowItWorks;
