import { useState } from 'react';
import { BookOpen, GraduationCap, TrendingUp, Play, CheckCircle, Lock, Search, Filter } from 'lucide-react';

interface Tutorial {
  id: string;
  title: string;
  description: string;
  duration: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  completed: boolean;
  locked: boolean;
  icon: string;
}

interface GlossaryTerm {
  term: string;
  definition: string;
  category: string;
  related: string[];
}

interface SimulatorTrade {
  id: string;
  type: 'buy' | 'sell';
  token: string;
  amount: number;
  price: number;
  timestamp: string;
  profit?: number;
}

const TUTORIALS: Tutorial[] = [
  {
    id: '1',
    title: 'Introdução ao Blockchain',
    description: 'Aprenda os conceitos básicos da tecnologia blockchain e como ela funciona',
    duration: '15 min',
    difficulty: 'beginner',
    category: 'Fundamentos',
    completed: true,
    locked: false,
    icon: '📚',
  },
  {
    id: '2',
    title: 'Como Conectar sua Carteira',
    description: 'Passo a passo para conectar MetaMask e outras carteiras Web3',
    duration: '10 min',
    difficulty: 'beginner',
    category: 'Fundamentos',
    completed: true,
    locked: false,
    icon: '👛',
  },
  {
    id: '3',
    title: 'Seu Primeiro Swap',
    description: 'Aprenda a trocar tokens usando exchanges descentralizadas',
    duration: '20 min',
    difficulty: 'beginner',
    category: 'DeFi',
    completed: true,
    locked: false,
    icon: '🔄',
  },
  {
    id: '4',
    title: 'Entendendo NFTs',
    description: 'O que são NFTs, como comprar e vender tokens não-fungíveis',
    duration: '25 min',
    difficulty: 'intermediate',
    category: 'NFTs',
    completed: false,
    locked: false,
    icon: '🎨',
  },
  {
    id: '5',
    title: 'Staking e Yield Farming',
    description: 'Aprenda a ganhar recompensas depositando seus tokens',
    duration: '30 min',
    difficulty: 'intermediate',
    category: 'DeFi',
    completed: false,
    locked: false,
    icon: '🌾',
  },
  {
    id: '6',
    title: 'Empréstimos DeFi',
    description: 'Como emprestar e tomar emprestado usando protocolos descentralizados',
    duration: '35 min',
    difficulty: 'intermediate',
    category: 'DeFi',
    completed: false,
    locked: false,
    icon: '💰',
  },
  {
    id: '7',
    title: 'Análise Técnica Avançada',
    description: 'Estratégias avançadas de trading e análise de mercado',
    duration: '45 min',
    difficulty: 'advanced',
    category: 'Trading',
    completed: false,
    locked: true,
    icon: '📊',
  },
  {
    id: '8',
    title: 'Segurança e Boas Práticas',
    description: 'Como proteger seus ativos e evitar golpes comuns',
    duration: '40 min',
    difficulty: 'advanced',
    category: 'Segurança',
    completed: false,
    locked: true,
    icon: '🔒',
  },
];

const GLOSSARY: GlossaryTerm[] = [
  {
    term: 'Blockchain',
    definition: 'Um livro-razão digital descentralizado que registra transações em múltiplos computadores de forma que os registros não podem ser alterados retroativamente.',
    category: 'Fundamentos',
    related: ['Descentralização', 'Hash', 'Mineração'],
  },
  {
    term: 'DeFi',
    definition: 'Decentralized Finance (Finanças Descentralizadas) - Sistema financeiro construído sobre blockchain que não depende de intermediários como bancos.',
    category: 'Fundamentos',
    related: ['Smart Contract', 'Liquidity Pool', 'Yield Farming'],
  },
  {
    term: 'Smart Contract',
    definition: 'Programa autoexecutável armazenado na blockchain que automaticamente executa acordos quando condições predefinidas são atendidas.',
    category: 'Tecnologia',
    related: ['Blockchain', 'DApp', 'Gas'],
  },
  {
    term: 'Gas',
    definition: 'Taxa paga para executar transações ou contratos na blockchain Ethereum. Medido em Gwei.',
    category: 'Tecnologia',
    related: ['Gwei', 'Transaction', 'Ethereum'],
  },
  {
    term: 'NFT',
    definition: 'Non-Fungible Token - Token único que representa propriedade de um item digital ou físico específico na blockchain.',
    category: 'NFTs',
    related: ['ERC-721', 'Metadata', 'Minting'],
  },
  {
    term: 'Staking',
    definition: 'Processo de bloquear criptomoedas para suportar operações da rede e ganhar recompensas passivas.',
    category: 'DeFi',
    related: ['Proof of Stake', 'Validator', 'APY'],
  },
  {
    term: 'APY',
    definition: 'Annual Percentage Yield - Rendimento percentual anual que considera juros compostos.',
    category: 'DeFi',
    related: ['Staking', 'Yield Farming', 'Interest'],
  },
  {
    term: 'Liquidity Pool',
    definition: 'Conjunto de fundos bloqueados em um smart contract para facilitar trading descentralizado.',
    category: 'DeFi',
    related: ['DeFi', 'AMM', 'Liquidity Provider'],
  },
];

export default function Education() {
  const [activeTab, setActiveTab] = useState<'tutorials' | 'glossary' | 'simulator'>('tutorials');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDifficulty, setFilterDifficulty] = useState<'all' | 'beginner' | 'intermediate' | 'advanced'>('all');
  const [filterCategory, setFilterCategory] = useState('all');

  // Simulator state
  const [portfolio, setPortfolio] = useState({ balance: 10000, tokens: {} as Record<string, number> });
  const [trades, setTrades] = useState<SimulatorTrade[]>([]);
  const [currentPrice] = useState({ ETH: 2450, BTC: 62000, USDT: 1 });

  const filteredTutorials = TUTORIALS.filter((tutorial) => {
    const matchesSearch = tutorial.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDifficulty = filterDifficulty === 'all' || tutorial.difficulty === filterDifficulty;
    const matchesCategory = filterCategory === 'all' || tutorial.category === filterCategory;
    return matchesSearch && matchesDifficulty && matchesCategory;
  });

  const filteredGlossary = GLOSSARY.filter((item) =>
    item.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.definition.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getDifficultyColor = (difficulty: string): string => {
    switch (difficulty) {
      case 'beginner': return 'text-green-400 bg-green-500/20';
      case 'intermediate': return 'text-yellow-400 bg-yellow-500/20';
      case 'advanced': return 'text-red-400 bg-red-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const getDifficultyLabel = (difficulty: string): string => {
    switch (difficulty) {
      case 'beginner': return 'Iniciante';
      case 'intermediate': return 'Intermediário';
      case 'advanced': return 'Avançado';
      default: return difficulty;
    }
  };

  const executeTrade = (type: 'buy' | 'sell', token: string, amount: number) => {
    const price = currentPrice[token as keyof typeof currentPrice];
    const cost = amount * price;

    if (type === 'buy' && portfolio.balance >= cost) {
      setPortfolio({
        balance: portfolio.balance - cost,
        tokens: { ...portfolio.tokens, [token]: (portfolio.tokens[token] || 0) + amount },
      });

      const trade: SimulatorTrade = {
        id: Date.now().toString(),
        type,
        token,
        amount,
        price,
        timestamp: new Date().toLocaleTimeString(),
      };
      setTrades([trade, ...trades]);
    } else if (type === 'sell' && (portfolio.tokens[token] || 0) >= amount) {
      setPortfolio({
        balance: portfolio.balance + cost,
        tokens: { ...portfolio.tokens, [token]: (portfolio.tokens[token] || 0) - amount },
      });

      const trade: SimulatorTrade = {
        id: Date.now().toString(),
        type,
        token,
        amount,
        price,
        timestamp: new Date().toLocaleTimeString(),
        profit: cost - (amount * (currentPrice[token as keyof typeof currentPrice] * 0.95)),
      };
      setTrades([trade, ...trades]);
    }
  };

  const totalPortfolioValue = portfolio.balance + 
    Object.entries(portfolio.tokens).reduce((sum, [token, amount]) => 
      sum + (amount * currentPrice[token as keyof typeof currentPrice]), 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900 pt-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Educação & Aprendizado</h1>
          <p className="text-gray-400">
            Aprenda sobre blockchain, DeFi e criptomoedas do básico ao avançado
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto">
          <button
            onClick={() => setActiveTab('tutorials')}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-colors whitespace-nowrap ${
              activeTab === 'tutorials'
                ? 'bg-orange-500 text-white'
                : 'bg-navy-800/50 text-gray-400 hover:bg-navy-700/50'
            }`}
          >
            <GraduationCap className="w-5 h-5" />
            Tutoriais
          </button>
          <button
            onClick={() => setActiveTab('glossary')}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-colors whitespace-nowrap ${
              activeTab === 'glossary'
                ? 'bg-orange-500 text-white'
                : 'bg-navy-800/50 text-gray-400 hover:bg-navy-700/50'
            }`}
          >
            <BookOpen className="w-5 h-5" />
            Glossário
          </button>
          <button
            onClick={() => setActiveTab('simulator')}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-colors whitespace-nowrap ${
              activeTab === 'simulator'
                ? 'bg-orange-500 text-white'
                : 'bg-navy-800/50 text-gray-400 hover:bg-navy-700/50'
            }`}
          >
            <TrendingUp className="w-5 h-5" />
            Simulador de Trading
          </button>
        </div>

        {/* Tutoriais */}
        {activeTab === 'tutorials' && (
          <div className="space-y-6">
            {/* Search and Filters */}
            <div className="bg-navy-800/50 backdrop-blur-sm rounded-xl border border-navy-700 p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Buscar tutoriais..."
                    className="w-full bg-navy-900 border border-navy-700 rounded-lg pl-10 pr-4 py-2 text-white focus:outline-none focus:border-orange-500"
                  />
                </div>
                <select
                  value={filterDifficulty}
                  onChange={(e) => setFilterDifficulty(e.target.value as any)}
                  className="bg-navy-900 border border-navy-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-orange-500"
                >
                  <option value="all">Todas Dificuldades</option>
                  <option value="beginner">Iniciante</option>
                  <option value="intermediate">Intermediário</option>
                  <option value="advanced">Avançado</option>
                </select>
              </div>
            </div>

            {/* Progress Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-navy-800/50 backdrop-blur-sm rounded-xl p-6 border border-navy-700">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400 text-sm">Tutoriais Completos</span>
                  <CheckCircle className="w-5 h-5 text-green-400" />
                </div>
                <p className="text-2xl font-bold text-white">
                  {TUTORIALS.filter((t) => t.completed).length}/{TUTORIALS.length}
                </p>
                <p className="text-xs text-green-400 mt-1">
                  {Math.round((TUTORIALS.filter((t) => t.completed).length / TUTORIALS.length) * 100)}% completo
                </p>
              </div>
              <div className="bg-navy-800/50 backdrop-blur-sm rounded-xl p-6 border border-navy-700">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400 text-sm">Tempo de Estudo</span>
                  <Play className="w-5 h-5 text-blue-400" />
                </div>
                <p className="text-2xl font-bold text-white">3h 45min</p>
                <p className="text-xs text-blue-400 mt-1">Esta semana</p>
              </div>
              <div className="bg-navy-800/50 backdrop-blur-sm rounded-xl p-6 border border-navy-700">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400 text-sm">Nível Atual</span>
                  <GraduationCap className="w-5 h-5 text-orange-400" />
                </div>
                <p className="text-2xl font-bold text-white">Intermediário</p>
                <p className="text-xs text-orange-400 mt-1">Continue aprendendo!</p>
              </div>
            </div>

            {/* Tutorials Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredTutorials.map((tutorial) => (
                <div
                  key={tutorial.id}
                  className={`bg-navy-800/50 backdrop-blur-sm rounded-xl border border-navy-700 p-6 transition-all ${
                    tutorial.locked
                      ? 'opacity-50 cursor-not-allowed'
                      : 'hover:border-orange-500/30 cursor-pointer'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className="text-4xl">{tutorial.icon}</div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-lg font-bold text-white">{tutorial.title}</h3>
                        {tutorial.locked && <Lock className="w-5 h-5 text-gray-500" />}
                        {tutorial.completed && <CheckCircle className="w-5 h-5 text-green-400" />}
                      </div>
                      <p className="text-gray-400 text-sm mb-3">{tutorial.description}</p>
                      <div className="flex items-center gap-3 flex-wrap">
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${getDifficultyColor(tutorial.difficulty)}`}>
                          {getDifficultyLabel(tutorial.difficulty)}
                        </span>
                        <span className="text-gray-400 text-xs">{tutorial.duration}</span>
                        <span className="text-gray-400 text-xs">• {tutorial.category}</span>
                      </div>
                      {!tutorial.locked && (
                        <button className="mt-4 w-full bg-orange-500 text-white py-2 rounded-lg font-semibold hover:bg-orange-600 transition-colors flex items-center justify-center gap-2">
                          <Play className="w-4 h-4" />
                          {tutorial.completed ? 'Revisar' : 'Iniciar'}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Glossário */}
        {activeTab === 'glossary' && (
          <div className="space-y-6">
            {/* Search */}
            <div className="bg-navy-800/50 backdrop-blur-sm rounded-xl border border-navy-700 p-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Buscar termos..."
                  className="w-full bg-navy-900 border border-navy-700 rounded-lg pl-10 pr-4 py-2 text-white focus:outline-none focus:border-orange-500"
                />
              </div>
            </div>

            {/* Glossary List */}
            <div className="space-y-4">
              {filteredGlossary.map((item, index) => (
                <div
                  key={index}
                  className="bg-navy-800/50 backdrop-blur-sm rounded-xl border border-navy-700 p-6 hover:border-orange-500/30 transition-colors"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-bold text-orange-400">{item.term}</h3>
                    <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-lg text-xs font-semibold">
                      {item.category}
                    </span>
                  </div>
                  <p className="text-gray-300 mb-4">{item.definition}</p>
                  {item.related.length > 0 && (
                    <div>
                      <p className="text-gray-400 text-sm mb-2">Termos Relacionados:</p>
                      <div className="flex flex-wrap gap-2">
                        {item.related.map((related, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-navy-700 text-gray-300 rounded-lg text-sm hover:bg-navy-600 cursor-pointer transition-colors"
                          >
                            {related}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Simulador de Trading */}
        {activeTab === 'simulator' && (
          <div className="space-y-6">
            {/* Portfolio Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-navy-800/50 backdrop-blur-sm rounded-xl p-6 border border-navy-700">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400 text-sm">Saldo em USD</span>
                  <span className="text-2xl">💵</span>
                </div>
                <p className="text-2xl font-bold text-white">${portfolio.balance.toFixed(2)}</p>
              </div>
              <div className="bg-navy-800/50 backdrop-blur-sm rounded-xl p-6 border border-navy-700">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400 text-sm">Valor Total</span>
                  <span className="text-2xl">💎</span>
                </div>
                <p className="text-2xl font-bold text-white">${totalPortfolioValue.toFixed(2)}</p>
                <p className={`text-xs mt-1 ${totalPortfolioValue >= 10000 ? 'text-green-400' : 'text-red-400'}`}>
                  {totalPortfolioValue >= 10000 ? '+' : ''}{((totalPortfolioValue - 10000) / 10000 * 100).toFixed(2)}%
                </p>
              </div>
              <div className="bg-navy-800/50 backdrop-blur-sm rounded-xl p-6 border border-navy-700">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400 text-sm">Total de Trades</span>
                  <span className="text-2xl">📊</span>
                </div>
                <p className="text-2xl font-bold text-white">{trades.length}</p>
              </div>
            </div>

            {/* Trading Interface */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Buy/Sell Form */}
              <div className="bg-navy-800/50 backdrop-blur-sm rounded-xl border border-navy-700 p-6">
                <h3 className="text-xl font-bold text-white mb-4">Executar Trade (Simulado)</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Token</label>
                    <select className="w-full bg-navy-900 border border-navy-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500">
                      <option>ETH - $2,450</option>
                      <option>BTC - $62,000</option>
                      <option>USDT - $1.00</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Quantidade</label>
                    <input
                      type="number"
                      placeholder="0.0"
                      className="w-full bg-navy-900 border border-navy-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={() => executeTrade('buy', 'ETH', 0.1)}
                      className="bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors"
                    >
                      Comprar
                    </button>
                    <button
                      onClick={() => executeTrade('sell', 'ETH', 0.1)}
                      className="bg-red-500 text-white py-3 rounded-lg font-semibold hover:bg-red-600 transition-colors"
                    >
                      Vender
                    </button>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-navy-700">
                  <h4 className="text-white font-semibold mb-3">Seus Tokens</h4>
                  <div className="space-y-2">
                    {Object.entries(portfolio.tokens).map(([token, amount]) => (
                      <div key={token} className="flex justify-between items-center">
                        <span className="text-gray-400">{token}</span>
                        <span className="text-white font-semibold">{amount.toFixed(4)}</span>
                      </div>
                    ))}
                    {Object.keys(portfolio.tokens).length === 0 && (
                      <p className="text-gray-400 text-sm text-center py-4">Nenhum token ainda</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Trade History */}
              <div className="bg-navy-800/50 backdrop-blur-sm rounded-xl border border-navy-700 p-6">
                <h3 className="text-xl font-bold text-white mb-4">Histórico de Trades</h3>
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {trades.map((trade) => (
                    <div
                      key={trade.id}
                      className={`p-4 rounded-lg border ${
                        trade.type === 'buy'
                          ? 'bg-green-500/10 border-green-500/30'
                          : 'bg-red-500/10 border-red-500/30'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <span className={`font-semibold ${trade.type === 'buy' ? 'text-green-400' : 'text-red-400'}`}>
                          {trade.type === 'buy' ? 'COMPRA' : 'VENDA'}
                        </span>
                        <span className="text-gray-400 text-xs">{trade.timestamp}</span>
                      </div>
                      <p className="text-white text-sm">
                        {trade.amount} {trade.token} @ ${trade.price.toFixed(2)}
                      </p>
                      <p className="text-gray-400 text-xs mt-1">
                        Total: ${(trade.amount * trade.price).toFixed(2)}
                      </p>
                    </div>
                  ))}
                  {trades.length === 0 && (
                    <p className="text-gray-400 text-sm text-center py-8">Nenhum trade ainda. Comece a negociar!</p>
                  )}
                </div>
              </div>
            </div>

            {/* Info Banner */}
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-6">
              <div className="flex items-start gap-3">
                <TrendingUp className="w-6 h-6 text-blue-400 flex-shrink-0" />
                <div>
                  <h4 className="text-blue-400 font-semibold mb-2">Simulador de Trading</h4>
                  <p className="text-blue-300 text-sm">
                    Este é um ambiente simulado para você praticar trading sem risco. Os preços são fictícios e nenhuma
                    transação real é executada. Use para aprender estratégias antes de operar com dinheiro real.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
