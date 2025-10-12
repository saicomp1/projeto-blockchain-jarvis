import { Shield, Target, Users, Heart } from 'lucide-react';
import { Card } from '@components/ui';

/**
 * About - About page with mission, team, values
 */

const values = [
  {
    icon: Shield,
    title: 'Segurança em Primeiro Lugar',
    description: 'Priorizamos segurança acima de tudo. Cada recurso é construído com princípios de segurança em primeiro lugar.',
  },
  {
    icon: Target,
    title: 'Foco no Usuário',
    description: 'UX bonita que não compromete a segurança. Projetado tanto para iniciantes quanto para especialistas.',
  },
  {
    icon: Users,
    title: 'Impulsionado pela Comunidade',
    description: 'Código aberto e transparente. Construído pela comunidade, para a comunidade.',
  },
  {
    icon: Heart,
    title: 'Apaixonados',
    description: 'Amamos o que fazemos. Construindo o futuro das finanças descentralizadas com cuidado e dedicação.',
  },
];

export default function About() {
  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <div className="mx-auto max-w-3xl text-center mb-20">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-6">
            Sobre o Jarvis
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
            Estamos construindo a maneira mais segura e fácil de interagir com a blockchain.
            Nossa missão é tornar a Web3 acessível para todos sem comprometer a segurança.
          </p>
        </div>

        {/* Mission */}
        <section className="mb-20">
          <div className="bg-gradient-to-r from-bitcoin/10 to-ethereum/10 dark:from-bitcoin/5 dark:to-ethereum/5 rounded-3xl p-12">
            <h2 className="text-3xl font-bold mb-6 text-center">Nossa Missão</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 text-center max-w-3xl mx-auto">
              Democratizar o acesso à tecnologia blockchain fornecendo uma plataforma segura, transparente e intuitiva
              que capacita os usuários a assumir o controle de seus ativos digitais. Acreditamos que todos
              devem ter as ferramentas para participar do futuro descentralizado.
            </p>
          </div>
        </section>

        {/* Values */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Nossos Valores</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <Card key={value.title} className="p-8">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-bitcoin/10 dark:bg-bitcoin/20 shrink-0">
                      <Icon className="h-8 w-8 text-bitcoin" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400">{value.description}</p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Tech Stack */}
        <section>
          <h2 className="text-3xl font-bold text-center mb-12">Construído Com</h2>
          <Card className="p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <p className="text-4xl font-bold text-blue-500 mb-2">React</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Framework UI</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-blue-600 mb-2">TypeScript</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Segurança de Tipos</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-purple-500 mb-2">Vite</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Ferramenta de Build</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-cyan-500 mb-2">Tailwind</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Estilização</p>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800 text-center">
              <p className="text-gray-600 dark:text-gray-400">
                Além de Ethers.js, Zustand, React Hook Form, Zod, Vitest, Playwright e muito mais.
              </p>
            </div>
          </Card>
        </section>
      </div>
    </div>
  );
}
