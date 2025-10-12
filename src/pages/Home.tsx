import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Zap, Lock, TrendingUp, Users, Code } from 'lucide-react';
import { Button, Card } from '@components/ui';

/**
 * Home - Landing page
 * SEO: Hero section, features, CTA
 */

const features = [
  {
    icon: Shield,
    title: 'Segurança de Nível Militar',
    description: 'Construído com princípios de segurança em primeiro lugar. Suporte a carteiras físicas, sem armazenamento de chaves, código auditado.',
  },
  {
    icon: Zap,
    title: 'Extremamente Rápido',
    description: 'Performance otimizada com divisão de código, carregamento sob demanda e gerenciamento eficiente de estado.',
  },
  {
    icon: Lock,
    title: 'Privacidade em Primeiro Lugar',
    description: 'Seus dados permanecem seus. Sem rastreamento, sem análises, sem scripts de terceiros.',
  },
  {
    icon: TrendingUp,
    title: 'Dados em Tempo Real',
    description: 'Dados ao vivo da blockchain, preços de gas e monitoramento de transações.',
  },
  {
    icon: Users,
    title: 'Suporte Multi-Carteiras',
    description: 'Conecte com MetaMask, WalletConnect, Ledger e Trezor.',
  },
  {
    icon: Code,
    title: 'Código Aberto',
    description: 'Base de código totalmente transparente. Audite o código, contribua, faça fork.',
  },
];

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-bitcoin/10 via-white to-ethereum/10 dark:from-bitcoin/5 dark:via-gray-950 dark:to-ethereum/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
          <div className="text-center max-w-6xl mx-auto">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl px-6 py-4 leading-tight">
              <span className="bg-gradient-to-r from-orange-500 via-orange-600 to-blue-900 bg-clip-text text-transparent inline-block">
                Sua Interface Blockchain
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-900 via-orange-600 to-orange-500 bg-clip-text text-transparent inline-block">
                Moderna e Confiável
              </span>
            </h1>
            <p className="mt-8 text-lg sm:text-xl leading-8 text-gray-400 dark:text-gray-300 max-w-3xl mx-auto px-6">
              Jarvis é uma solução avançada e de fácil acesso às suas carteiras cripto. Desenvolvido com 
              foco em alta performance e experiência excepcional do usuário.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link to="/wallet">
                <Button size="lg">
                  Começar Agora
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/about">
                <Button variant="outline" size="lg">
                  Saiba Mais
                </Button>
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-3 text-center">
            <div>
              <p className="text-4xl font-bold text-orange-500 dark:text-orange-400">99.9%</p>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Tempo Online</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-orange-500 dark:text-orange-400">10K+</p>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Usuários Ativos</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-orange-500 dark:text-orange-400">$50M+</p>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Volume</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Construído para Segurança, Projetado para Você
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
              Tudo que você precisa para interagir com a blockchain de forma segura e eficiente.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <Card key={feature.title} className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-2 rounded-lg bg-bitcoin/10 dark:bg-bitcoin/20">
                      <Icon className="h-6 w-6 text-bitcoin" />
                    </div>
                    <h3 className="text-xl font-semibold">{feature.title}</h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-bitcoin dark:bg-bitcoin/90">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white">
              Pronto para começar?
            </h2>
            <p className="mt-4 text-lg text-white/90">
              Conecte sua carteira e comece a explorar a blockchain hoje mesmo.
            </p>
            <div className="mt-8">
              <Link to="/wallet">
                <Button size="lg" variant="secondary">
                  Acessar App
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
