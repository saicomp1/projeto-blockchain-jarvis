import { useState } from 'react';
import { TrendingUp, Users, Award, MessageCircle, ThumbsUp, Share2, Trophy, Star, ExternalLink } from 'lucide-react';

interface Activity {
  id: string;
  user: string;
  avatar: string;
  action: string;
  details: string;
  timestamp: string;
  likes: number;
  comments: number;
  category: 'swap' | 'nft' | 'staking' | 'lending';
}

interface Ranking {
  rank: number;
  address: string;
  avatar: string;
  username: string;
  score: number;
  badges: string[];
  volume24h: number;
  transactions: number;
}

interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  earned: boolean;
}

const ACTIVITIES: Activity[] = [
  {
    id: '1',
    user: '0x742d...4Bc8',
    avatar: '🦊',
    action: 'Swap',
    details: 'Trocou 2.5 ETH por 5,000 USDC',
    timestamp: '2 minutos atrás',
    likes: 12,
    comments: 3,
    category: 'swap',
  },
  {
    id: '2',
    user: '0xA1b2...9DeF',
    avatar: '🐺',
    action: 'NFT',
    details: 'Comprou "Bored Ape #8234" por 45 ETH',
    timestamp: '5 minutos atrás',
    likes: 45,
    comments: 12,
    category: 'nft',
  },
  {
    id: '3',
    user: '0x5E3c...7Aa1',
    avatar: '🦁',
    action: 'Staking',
    details: 'Depositou 10,000 USDT no pool de staking',
    timestamp: '12 minutos atrás',
    likes: 8,
    comments: 1,
    category: 'staking',
  },
  {
    id: '4',
    user: '0x9Bc7...2FfE',
    avatar: '🐻',
    action: 'Lending',
    details: 'Emprestou 5 ETH no protocolo Aave',
    timestamp: '18 minutos atrás',
    likes: 15,
    comments: 5,
    category: 'lending',
  },
  {
    id: '5',
    user: '0xC3d1...6BeA',
    avatar: '🦅',
    action: 'NFT',
    details: 'Mintou nova coleção "Cyber Punks"',
    timestamp: '25 minutos atrás',
    likes: 32,
    comments: 8,
    category: 'nft',
  },
  {
    id: '6',
    user: '0xF8e2...1CcD',
    avatar: '🐉',
    action: 'Swap',
    details: 'Trocou 1,000 MATIC por 0.5 ETH',
    timestamp: '32 minutos atrás',
    likes: 6,
    comments: 2,
    category: 'swap',
  },
];

const RANKINGS: Ranking[] = [
  {
    rank: 1,
    address: '0x742d...4Bc8',
    avatar: '🦊',
    username: 'CryptoWhale',
    score: 9850,
    badges: ['🏆', '💎', '⭐'],
    volume24h: 1250000,
    transactions: 1432,
  },
  {
    rank: 2,
    address: '0xA1b2...9DeF',
    avatar: '🐺',
    username: 'DeFiKing',
    score: 8920,
    badges: ['🏆', '💎'],
    volume24h: 980000,
    transactions: 1201,
  },
  {
    rank: 3,
    address: '0x5E3c...7Aa1',
    avatar: '🦁',
    username: 'NFTCollector',
    score: 7650,
    badges: ['🏆', '🎨'],
    volume24h: 750000,
    transactions: 856,
  },
  {
    rank: 4,
    address: '0x9Bc7...2FfE',
    avatar: '🐻',
    username: 'YieldFarmer',
    score: 6780,
    badges: ['💎', '🌾'],
    volume24h: 620000,
    transactions: 743,
  },
  {
    rank: 5,
    address: '0xC3d1...6BeA',
    avatar: '🦅',
    username: 'GasOptimizer',
    score: 5920,
    badges: ['⚡', '🎯'],
    volume24h: 490000,
    transactions: 612,
  },
];

const BADGES: Badge[] = [
  {
    id: '1',
    name: 'Primeiro Swap',
    description: 'Realizou sua primeira troca de tokens',
    icon: '🔄',
    rarity: 'common',
    earned: true,
  },
  {
    id: '2',
    name: 'Colecionador NFT',
    description: 'Possui mais de 10 NFTs',
    icon: '🎨',
    rarity: 'rare',
    earned: true,
  },
  {
    id: '3',
    name: 'Staking Master',
    description: 'Manteve stake por mais de 90 dias',
    icon: '💎',
    rarity: 'epic',
    earned: true,
  },
  {
    id: '4',
    name: 'Volume Trader',
    description: 'Ultrapassou $1M em volume de trading',
    icon: '🏆',
    rarity: 'legendary',
    earned: false,
  },
  {
    id: '5',
    name: 'Early Adopter',
    description: 'Está entre os primeiros 1000 usuários',
    icon: '⭐',
    rarity: 'rare',
    earned: true,
  },
  {
    id: '6',
    name: 'Gas Guru',
    description: 'Economizou mais de $1000 em taxas de gas',
    icon: '⚡',
    rarity: 'epic',
    earned: false,
  },
];

export default function Social() {
  const [activeTab, setActiveTab] = useState<'feed' | 'rankings' | 'badges'>('feed');
  const [filterCategory, setFilterCategory] = useState<'all' | 'swap' | 'nft' | 'staking' | 'lending'>('all');

  const filteredActivities = filterCategory === 'all' 
    ? ACTIVITIES 
    : ACTIVITIES.filter(a => a.category === filterCategory);

  const getRarityColor = (rarity: string): string => {
    switch (rarity) {
      case 'common': return 'border-gray-500 bg-gray-500/10';
      case 'rare': return 'border-blue-500 bg-blue-500/10';
      case 'epic': return 'border-purple-500 bg-purple-500/10';
      case 'legendary': return 'border-yellow-500 bg-yellow-500/10';
      default: return 'border-gray-500 bg-gray-500/10';
    }
  };

  const formatNumber = (num: number): string => {
    if (num >= 1000000) return `$${(num / 1000000).toFixed(2)}M`;
    if (num >= 1000) return `$${(num / 1000).toFixed(0)}K`;
    return `$${num}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900 pt-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-3xl font-bold text-white">Comunidade & Social</h1>
          </div>
          <p className="text-gray-400">
            Acompanhe atividades, rankings e conquistas da comunidade
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto">
          <button
            onClick={() => setActiveTab('feed')}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-colors whitespace-nowrap ${
              activeTab === 'feed'
                ? 'bg-orange-500 text-white'
                : 'bg-navy-800/50 text-gray-400 hover:bg-navy-700/50'
            }`}
          >
            <MessageCircle className="w-5 h-5" />
            Feed de Atividades
          </button>
          <button
            onClick={() => setActiveTab('rankings')}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-colors whitespace-nowrap ${
              activeTab === 'rankings'
                ? 'bg-orange-500 text-white'
                : 'bg-navy-800/50 text-gray-400 hover:bg-navy-700/50'
            }`}
          >
            <Trophy className="w-5 h-5" />
            Rankings
          </button>
          <button
            onClick={() => setActiveTab('badges')}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-colors whitespace-nowrap ${
              activeTab === 'badges'
                ? 'bg-orange-500 text-white'
                : 'bg-navy-800/50 text-gray-400 hover:bg-navy-700/50'
            }`}
          >
            <Award className="w-5 h-5" />
            Badges & Conquistas
          </button>
        </div>

        {/* Feed de Atividades */}
        {activeTab === 'feed' && (
          <div className="space-y-6">
            {/* Filters */}
            <div className="flex gap-2 overflow-x-auto pb-2">
              {(['all', 'swap', 'nft', 'staking', 'lending'] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilterCategory(cat)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
                    filterCategory === cat
                      ? 'bg-orange-500 text-white'
                      : 'bg-navy-800/50 text-gray-400 hover:bg-navy-700/50'
                  }`}
                >
                  {cat === 'all' ? 'Todas' : cat.charAt(0).toUpperCase() + cat.slice(1)}
                </button>
              ))}
            </div>

            {/* Activities */}
            <div className="space-y-4">
              {filteredActivities.map((activity) => (
                <div
                  key={activity.id}
                  className="bg-navy-800/50 backdrop-blur-sm rounded-xl border border-navy-700 p-6 hover:border-orange-500/30 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <div className="text-4xl">{activity.avatar}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-orange-400 font-semibold">{activity.user}</span>
                        <span className="text-gray-500">•</span>
                        <span className="text-gray-400 text-sm">{activity.timestamp}</span>
                        <span
                          className={`ml-2 px-2 py-0.5 rounded text-xs font-semibold ${
                            activity.category === 'swap'
                              ? 'bg-blue-500/20 text-blue-400'
                              : activity.category === 'nft'
                              ? 'bg-purple-500/20 text-purple-400'
                              : activity.category === 'staking'
                              ? 'bg-green-500/20 text-green-400'
                              : 'bg-orange-500/20 text-orange-400'
                          }`}
                        >
                          {activity.action}
                        </span>
                      </div>
                      <p className="text-white mb-3">{activity.details}</p>
                      <div className="flex items-center gap-6">
                        <button className="flex items-center gap-2 text-gray-400 hover:text-orange-400 transition-colors">
                          <ThumbsUp className="w-4 h-4" />
                          <span className="text-sm">{activity.likes}</span>
                        </button>
                        <button className="flex items-center gap-2 text-gray-400 hover:text-orange-400 transition-colors">
                          <MessageCircle className="w-4 h-4" />
                          <span className="text-sm">{activity.comments}</span>
                        </button>
                        <button className="flex items-center gap-2 text-gray-400 hover:text-orange-400 transition-colors">
                          <Share2 className="w-4 h-4" />
                          <span className="text-sm">Compartilhar</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Rankings */}
        {activeTab === 'rankings' && (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-navy-800/50 backdrop-blur-sm rounded-xl p-6 border border-navy-700">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400 text-sm">Top Trader</span>
                  <Trophy className="w-5 h-5 text-yellow-400" />
                </div>
                <p className="text-2xl font-bold text-white mb-1">{RANKINGS[0].username}</p>
                <p className="text-sm text-gray-400">{formatNumber(RANKINGS[0].volume24h)} em 24h</p>
              </div>
              <div className="bg-navy-800/50 backdrop-blur-sm rounded-xl p-6 border border-navy-700">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400 text-sm">Usuários Ativos</span>
                  <Users className="w-5 h-5 text-blue-400" />
                </div>
                <p className="text-2xl font-bold text-white mb-1">12,847</p>
                <p className="text-sm text-green-400">+15% esta semana</p>
              </div>
              <div className="bg-navy-800/50 backdrop-blur-sm rounded-xl p-6 border border-navy-700">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400 text-sm">Volume Total</span>
                  <TrendingUp className="w-5 h-5 text-orange-400" />
                </div>
                <p className="text-2xl font-bold text-white mb-1">{formatNumber(4090000)}</p>
                <p className="text-sm text-green-400">+28% esta semana</p>
              </div>
            </div>

            {/* Rankings Table */}
            <div className="bg-navy-800/50 backdrop-blur-sm rounded-xl border border-navy-700 overflow-hidden">
              <div className="p-6 border-b border-navy-700">
                <h2 className="text-xl font-bold text-white">Top Traders</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-navy-800/80">
                    <tr className="text-gray-400 text-sm">
                      <th className="text-left p-4">Rank</th>
                      <th className="text-left p-4">Usuário</th>
                      <th className="text-right p-4">Score</th>
                      <th className="text-right p-4">Volume 24h</th>
                      <th className="text-right p-4">Transações</th>
                      <th className="text-left p-4">Badges</th>
                      <th className="text-right p-4">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-navy-700">
                    {RANKINGS.map((ranking) => (
                      <tr key={ranking.address} className="hover:bg-navy-700/30 transition-colors">
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            {ranking.rank === 1 && <span className="text-2xl">🥇</span>}
                            {ranking.rank === 2 && <span className="text-2xl">🥈</span>}
                            {ranking.rank === 3 && <span className="text-2xl">🥉</span>}
                            {ranking.rank > 3 && <span className="text-white font-bold">#{ranking.rank}</span>}
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="text-3xl">{ranking.avatar}</div>
                            <div>
                              <p className="text-white font-semibold">{ranking.username}</p>
                              <p className="text-gray-400 text-sm">{ranking.address}</p>
                            </div>
                          </div>
                        </td>
                        <td className="text-right p-4">
                          <p className="text-orange-400 font-bold">{ranking.score.toLocaleString()}</p>
                        </td>
                        <td className="text-right p-4">
                          <p className="text-white font-semibold">{formatNumber(ranking.volume24h)}</p>
                        </td>
                        <td className="text-right p-4">
                          <p className="text-gray-400">{ranking.transactions.toLocaleString()}</p>
                        </td>
                        <td className="p-4">
                          <div className="flex gap-1">
                            {ranking.badges.map((badge, idx) => (
                              <span key={idx} className="text-xl">
                                {badge}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="text-right p-4">
                          <button className="text-orange-400 hover:text-orange-300 transition-colors">
                            <ExternalLink className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Badges & Conquistas */}
        {activeTab === 'badges' && (
          <div className="space-y-6">
            {/* Progress */}
            <div className="bg-navy-800/50 backdrop-blur-sm rounded-xl border border-navy-700 p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-xl font-bold text-white">Seu Progresso</h2>
                  <p className="text-gray-400 text-sm">
                    {BADGES.filter((b) => b.earned).length} de {BADGES.length} badges desbloqueados
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-orange-400">
                    {Math.round((BADGES.filter((b) => b.earned).length / BADGES.length) * 100)}%
                  </p>
                  <p className="text-gray-400 text-sm">Completo</p>
                </div>
              </div>
              <div className="w-full bg-navy-700 rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-orange-500 to-orange-400 h-3 rounded-full transition-all"
                  style={{ width: `${(BADGES.filter((b) => b.earned).length / BADGES.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Badges Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {BADGES.map((badge) => (
                <div
                  key={badge.id}
                  className={`rounded-xl border-2 p-6 transition-all ${
                    badge.earned
                      ? `${getRarityColor(badge.rarity)} hover:scale-105`
                      : 'border-navy-700 bg-navy-800/30 opacity-50'
                  }`}
                >
                  <div className="text-center">
                    <div className={`text-6xl mb-4 ${!badge.earned && 'grayscale'}`}>{badge.icon}</div>
                    <h3 className="text-lg font-bold text-white mb-2">{badge.name}</h3>
                    <p className="text-gray-400 text-sm mb-3">{badge.description}</p>
                    <div className="flex items-center justify-center gap-2">
                      <Star
                        className={`w-4 h-4 ${
                          badge.rarity === 'common'
                            ? 'text-gray-500'
                            : badge.rarity === 'rare'
                            ? 'text-blue-500'
                            : badge.rarity === 'epic'
                            ? 'text-purple-500'
                            : 'text-yellow-500'
                        }`}
                      />
                      <span
                        className={`text-xs font-semibold uppercase ${
                          badge.rarity === 'common'
                            ? 'text-gray-500'
                            : badge.rarity === 'rare'
                            ? 'text-blue-500'
                            : badge.rarity === 'epic'
                            ? 'text-purple-500'
                            : 'text-yellow-500'
                        }`}
                      >
                        {badge.rarity}
                      </span>
                    </div>
                    {badge.earned && (
                      <div className="mt-4 flex items-center justify-center gap-2 text-green-400">
                        <Award className="w-4 h-4" />
                        <span className="text-sm font-semibold">Desbloqueado</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
