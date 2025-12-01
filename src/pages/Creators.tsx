import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const creators = [
  { name: "Nathan Miranda", role: "Desenvolvedor Full-Stack" },
  { name: "Kely André", role: "Designer UI/UX" },
  { name: "Letícia Fonseca", role: "Gerente de Projeto" },
  { name: "Heitor Gonçalves", role: "Desenvolvedor Backend" },
  { name: "Matheus Afonso", role: "Analista de Negócios" },
  { name: "Gustavo Barcelos", role: "Desenvolvedor Frontend" },
];

const Creators = () => {
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
            Criadores do Projeto BabyCare
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Conheça a equipe apaixonada por conectar famílias e cuidadores
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {creators.map((creator, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <Avatar className="w-24 h-24 mx-auto mb-4">
                  <AvatarFallback className="text-2xl bg-primary/10 text-primary">
                    {creator.name.split(" ").map(n => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {creator.name}
                </h3>
                <p className="text-muted-foreground">
                  {creator.role}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Creators;
