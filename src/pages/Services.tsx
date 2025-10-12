import { Card } from '@components/ui';
import { Shield, Lock, Zap, Code, HeadphonesIcon, FileCheck } from 'lucide-react';

/**
 * Services - Services page
 * Lists all services provided by Jarvis
 */

const services = [
  {
    icon: Shield,
    title: 'Gerenciamento Seguro de Carteiras',
    description: 'Integração com carteiras físicas com suporte a MetaMask, Ledger e Trezor. Suas chaves nunca saem do seu dispositivo.',
    features: [
      'Suporte a multi-assinatura',
      'Integração com carteiras físicas',
      'Opções de backup criptografado',
      'Alertas de segurança em tempo real',
    ],
  },
  {
    icon: Zap,
    title: 'Transações Ultra Rápidas',
    description: 'Roteamento otimizado de transações com estimativa de preço de gas em tempo real e agrupamento para máxima eficiência.',
    features: [
      'Otimização de preço de gas',
      'Agrupamento de transações',
      'Integração Layer 2',
      'Trocas entre cadeias',
    ],
  },
  {
    icon: Code,
    title: 'API para Desenvolvedores',
    description: 'API RESTful e suporte a WebSocket para construir em cima do Jarvis. Documentação abrangente incluída.',
    features: [
      'Acesso a API RESTful',
      'Suporte a WebSocket',
      'Notificações via webhook',
      'Documentação extensa',
    ],
  },
  {
    icon: Lock,
    title: 'Auditoria de Contratos Inteligentes',
    description: 'Serviços profissionais de auditoria de contratos inteligentes para garantir que seus contratos sejam seguros e sem bugs.',
    features: [
      'Análise de segurança',
      'Otimização de gas',
      'Revisão de melhores práticas',
      'Relatórios detalhados',
    ],
  },
  {
    icon: HeadphonesIcon,
    title: 'Suporte 24/7',
    description: 'Suporte ao cliente 24 horas por dia via email, chat e Discord. Estamos aqui para ajudar sempre que precisar.',
    features: [
      'Suporte por email',
      'Chat ao vivo',
      'Comunidade Discord',
      'Base de conhecimento',
    ],
  },
  {
    icon: FileCheck,
    title: 'Conformidade & KYC',
    description: 'Serviços opcionais de KYC/AML para empresas que precisam cumprir requisitos regulatórios.',
    features: [
      'Verificação KYC',
      'Triagem AML',
      'Monitoramento de transações',
      'Relatórios regulatórios',
    ],
  },
];

export default function Services() {
  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-6">
            Nossos Serviços
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Tudo que você precisa para interagir com a blockchain de forma segura e eficiente.
            Do gerenciamento de carteiras à auditoria de contratos inteligentes, nós temos tudo.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <Card key={service.title} className="p-8">
                <div className="flex items-start gap-4 mb-6">
                  <div className="p-3 rounded-lg bg-bitcoin/10 dark:bg-bitcoin/20 shrink-0">
                    <Icon className="h-8 w-8 text-bitcoin" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold mb-2">{service.title}</h2>
                    <p className="text-gray-600 dark:text-gray-400">{service.description}</p>
                  </div>
                </div>

                <div className="border-t border-gray-200 dark:border-gray-800 pt-6">
                  <h3 className="font-semibold mb-3">Recursos Principais:</h3>
                  <ul className="space-y-2">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                        <div className="h-1.5 w-1.5 rounded-full bg-bitcoin shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-20 text-center">
          <Card className="p-12 bg-gradient-to-r from-bitcoin/10 to-ethereum/10 dark:from-bitcoin/5 dark:to-ethereum/5">
            <h2 className="text-3xl font-bold mb-4">Precisa de Algo Personalizado?</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Oferecemos soluções personalizadas adaptadas às suas necessidades específicas. Entre em contato para discutir seus requisitos.
            </p>
            <a
              href="/contact"
              className="inline-block px-8 py-3 bg-bitcoin text-white font-semibold rounded-lg hover:bg-bitcoin/90 transition-colors"
            >
              Entre em Contato
            </a>
          </Card>
        </div>
      </div>
    </div>
  );
}
