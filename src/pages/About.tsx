import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";

const About = () => {
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

      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-8">
          Sobre o BabyCare
        </h1>

        <div className="space-y-8 text-lg text-muted-foreground">
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Nossa Missão</h2>
            <p>
              Conectar pais e cuidadores qualificados de forma segura, prática e confiável, 
              proporcionando tranquilidade para as famílias e oportunidades para profissionais dedicados.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Nossa Visão</h2>
            <p>
              Ser a plataforma líder em conexão entre famílias e babás, reconhecida pela segurança, 
              qualidade e pelo impacto positivo na vida de crianças e cuidadores.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Nossos Valores</h2>
            <ul className="list-disc list-inside space-y-2">
              <li><strong>Segurança:</strong> Verificação rigorosa de todos os profissionais</li>
              <li><strong>Confiança:</strong> Avaliações transparentes e honestas da comunidade</li>
              <li><strong>Respeito:</strong> Tratamento digno para pais e cuidadores</li>
              <li><strong>Inclusão:</strong> Oportunidades para todos, sem discriminação</li>
              <li><strong>Qualidade:</strong> Compromisso com excelência no atendimento</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Segurança em Primeiro Lugar</h2>
            <p>
              No BabyCare, a segurança das crianças é prioridade absoluta. Todas as babás passam por 
              verificação de documentos e antecedentes, e o sistema de avaliações permite que a 
              comunidade compartilhe experiências reais.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Nossos Diferenciais</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Plataforma intuitiva e fácil de usar</li>
              <li>Sistema de agendamento integrado</li>
              <li>Chat em tempo real entre pais e babás</li>
              <li>Avaliações verificadas</li>
              <li>Propostas e contrapropostas flexíveis</li>
              <li>Suporte dedicado</li>
            </ul>
          </section>
        </div>
      </main>
    </div>
  );
};

export default About;
