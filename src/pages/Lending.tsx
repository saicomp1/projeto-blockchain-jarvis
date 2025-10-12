import { useState } from 'react';
import { TrendingUp, TrendingDown, Percent, AlertCircle, Clock, Shield } from 'lucide-react';

interface LendingPool {
  id: string;
  token: string;
  symbol: string;
  icon: string;
  totalSupplied: number;
  totalBorrowed: number;
  supplyAPY: number;
  borrowAPY: number;
  utilizationRate: number;
  collateralFactor: number;
  liquidationThreshold: number;
  priceUSD: number;
}

interface UserPosition {
  token: string;
  symbol: string;
  supplied: number;
  borrowed: number;
  supplyValue: number;
  borrowValue: number;
  earnedInterest: number;
}

const LENDING_POOLS: LendingPool[] = [
  {
    id: '1',
    token: 'Ethereum',
    symbol: 'ETH',
    icon: '⟠',
    totalSupplied: 125000,
    totalBorrowed: 95000,
    supplyAPY: 2.85,
    borrowAPY: 4.25,
    utilizationRate: 76,
    collateralFactor: 82,
    liquidationThreshold: 85,
    priceUSD: 2450,
  },
  {
    id: '2',
    token: 'USD Coin',
    symbol: 'USDC',
    icon: '💵',
    totalSupplied: 8500000,
    totalBorrowed: 6200000,
    supplyAPY: 4.15,
    borrowAPY: 6.8,
    utilizationRate: 72.9,
    collateralFactor: 85,
    liquidationThreshold: 90,
    priceUSD: 1,
  },
  {
    id: '3',
    token: 'Tether',
    symbol: 'USDT',
    icon: '💲',
    totalSupplied: 9200000,
    totalBorrowed: 7100000,
    supplyAPY: 3.95,
    borrowAPY: 6.5,
    utilizationRate: 77.2,
    collateralFactor: 85,
    liquidationThreshold: 90,
    priceUSD: 1,
  },
  {
    id: '4',
    token: 'Wrapped Bitcoin',
    symbol: 'WBTC',
    icon: '₿',
    totalSupplied: 2800,
    totalBorrowed: 1950,
    supplyAPY: 1.25,
    borrowAPY: 3.8,
    utilizationRate: 69.6,
    collateralFactor: 75,
    liquidationThreshold: 80,
    priceUSD: 62000,
  },
  {
    id: '5',
    token: 'Dai Stablecoin',
    symbol: 'DAI',
    icon: '◈',
    totalSupplied: 7800000,
    totalBorrowed: 5900000,
    supplyAPY: 4.45,
    borrowAPY: 7.2,
    utilizationRate: 75.6,
    collateralFactor: 85,
    liquidationThreshold: 90,
    priceUSD: 1,
  },
];

export default function Lending() {
  const [selectedPool, setSelectedPool] = useState<LendingPool | null>(null);
  const [actionType, setActionType] = useState<'supply' | 'borrow' | 'withdraw' | 'repay'>('supply');
  const [amount, setAmount] = useState('');
  const [showModal, setShowModal] = useState(false);

  // Mock user positions
  const userPositions: UserPosition[] = [
    {
      token: 'Ethereum',
      symbol: 'ETH',
      supplied: 5.5,
      borrowed: 0,
      supplyValue: 13475,
      borrowValue: 0,
      earnedInterest: 125.45,
    },
    {
      token: 'USD Coin',
      symbol: 'USDC',
      supplied: 0,
      borrowed: 8000,
      supplyValue: 0,
      borrowValue: 8000,
      earnedInterest: 0,
    },
  ];

  const totalSupplied = userPositions.reduce((sum, pos) => sum + pos.supplyValue, 0);
  const totalBorrowed = userPositions.reduce((sum, pos) => sum + pos.borrowValue, 0);
  const netAPY = 2.35; // Mock calculation
  const healthFactor = totalBorrowed > 0 ? (totalSupplied * 0.82) / totalBorrowed : 0;
  const borrowLimit = totalSupplied * 0.82;
  const borrowLimitUsed = totalBorrowed > 0 ? (totalBorrowed / borrowLimit) * 100 : 0;

  const formatNumber = (num: number): string => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(2)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(2)}K`;
    return num.toFixed(2);
  };

  const openModal = (pool: LendingPool, action: 'supply' | 'borrow' | 'withdraw' | 'repay') => {
    setSelectedPool(pool);
    setActionType(action);
    setAmount('');
    setShowModal(true);
  };

  const handleAction = () => {
    alert(`${actionType === 'supply' ? 'Emprestando' : actionType === 'borrow' ? 'Tomando' : actionType === 'withdraw' ? 'Retirando' : 'Pagando'} ${amount} ${selectedPool?.symbol} concluído com sucesso!`);
    setShowModal(false);
  };

  const getHealthFactorColor = (hf: number): string => {
    if (hf >= 2) return 'text-green-400';
    if (hf >= 1.5) return 'text-yellow-400';
    if (hf >= 1.1) return 'text-orange-400';
    return 'text-red-400';
  };

  const getHealthFactorStatus = (hf: number): string => {
    if (hf >= 2) return 'Excelente';
    if (hf >= 1.5) return 'Bom';
    if (hf >= 1.1) return 'Atenção';
    return 'Risco Alto';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900 pt-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-3xl font-bold text-white">Empréstimos & Crédito</h1>
          </div>
          <p className="text-gray-400">
            Empreste seus ativos para ganhar juros ou tome emprestado usando seus tokens como garantia
          </p>
        </div>

        {/* User Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-navy-800/50 backdrop-blur-sm rounded-xl p-6 border border-navy-700">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400 text-sm">Total Emprestado</span>
                  <TrendingUp className="w-5 h-5 text-green-400" />
                </div>
                <p className="text-2xl font-bold text-white">${formatNumber(totalSupplied)}</p>
                <p className="text-xs text-green-400 mt-1">APY: +{netAPY}%</p>
              </div>

              <div className="bg-navy-800/50 backdrop-blur-sm rounded-xl p-6 border border-navy-700">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400 text-sm">Total Tomado</span>
                  <TrendingDown className="w-5 h-5 text-orange-400" />
                </div>
                <p className="text-2xl font-bold text-white">${formatNumber(totalBorrowed)}</p>
                <p className="text-xs text-orange-400 mt-1">APY: -{((totalBorrowed / borrowLimit) * 6.5).toFixed(2)}%</p>
              </div>

              <div className="bg-navy-800/50 backdrop-blur-sm rounded-xl p-6 border border-navy-700">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400 text-sm">Limite de Empréstimo</span>
                  <Percent className="w-5 h-5 text-blue-400" />
                </div>
                <p className="text-2xl font-bold text-white">${formatNumber(borrowLimit)}</p>
                <div className="mt-2">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-400">Usado</span>
                    <span className={borrowLimitUsed > 80 ? 'text-red-400' : 'text-gray-400'}>
                      {borrowLimitUsed.toFixed(1)}%
                    </span>
                  </div>
                  <div className="w-full bg-navy-700 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        borrowLimitUsed > 80 ? 'bg-red-400' : borrowLimitUsed > 60 ? 'bg-yellow-400' : 'bg-green-400'
                      }`}
                      style={{ width: `${Math.min(borrowLimitUsed, 100)}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="bg-navy-800/50 backdrop-blur-sm rounded-xl p-6 border border-navy-700">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400 text-sm">Fator de Saúde</span>
                  <Shield className="w-5 h-5 text-purple-400" />
                </div>
                <p className={`text-2xl font-bold ${getHealthFactorColor(healthFactor)}`}>
                  {healthFactor > 0 ? healthFactor.toFixed(2) : '∞'}
                </p>
                <p className={`text-xs mt-1 ${getHealthFactorColor(healthFactor)}`}>
                  {healthFactor > 0 ? getHealthFactorStatus(healthFactor) : 'Sem Empréstimos'}
                </p>
              </div>
            </div>

            {/* Health Factor Warning */}
            {healthFactor > 0 && healthFactor < 1.5 && (
              <div className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-4 mb-8 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-orange-400 font-semibold mb-1">Atenção: Fator de Saúde Baixo</h3>
                  <p className="text-orange-300 text-sm">
                    Seu fator de saúde está baixo. Considere depositar mais garantia ou pagar parte do empréstimo para
                    evitar liquidação. Liquidação ocorre quando o fator cai abaixo de 1.0.
                  </p>
                </div>
              </div>
            )}

            {/* User Positions */}
            {userPositions.length > 0 && (
              <div className="bg-navy-800/50 backdrop-blur-sm rounded-xl border border-navy-700 mb-8 overflow-hidden">
                <div className="p-6 border-b border-navy-700">
                  <h2 className="text-xl font-bold text-white">Suas Posições</h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-navy-800/80">
                      <tr className="text-gray-400 text-sm">
                        <th className="text-left p-4">Ativo</th>
                        <th className="text-right p-4">Emprestado</th>
                        <th className="text-right p-4">Tomado</th>
                        <th className="text-right p-4">Juros Ganhos</th>
                        <th className="text-right p-4">Ações</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-navy-700">
                      {userPositions.map((position) => (
                        <tr key={position.symbol} className="hover:bg-navy-700/30 transition-colors">
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              <div className="text-2xl">
                                {LENDING_POOLS.find((p) => p.symbol === position.symbol)?.icon}
                              </div>
                              <div>
                                <p className="text-white font-semibold">{position.token}</p>
                                <p className="text-gray-400 text-sm">{position.symbol}</p>
                              </div>
                            </div>
                          </td>
                          <td className="text-right p-4">
                            <p className="text-white font-semibold">{position.supplied} {position.symbol}</p>
                            <p className="text-gray-400 text-sm">${formatNumber(position.supplyValue)}</p>
                          </td>
                          <td className="text-right p-4">
                            <p className="text-white font-semibold">{position.borrowed} {position.symbol}</p>
                            <p className="text-gray-400 text-sm">${formatNumber(position.borrowValue)}</p>
                          </td>
                          <td className="text-right p-4">
                            <p className="text-green-400 font-semibold">+${position.earnedInterest.toFixed(2)}</p>
                          </td>
                          <td className="text-right p-4">
                            <div className="flex items-center justify-end gap-2">
                              {position.supplied > 0 && (
                                <button
                                  onClick={() => {
                                    const pool = LENDING_POOLS.find((p) => p.symbol === position.symbol);
                                    if (pool) openModal(pool, 'withdraw');
                                  }}
                                  className="px-3 py-1 bg-orange-500/20 text-orange-400 rounded-lg text-sm hover:bg-orange-500/30 transition-colors"
                                >
                                  Retirar
                                </button>
                              )}
                              {position.borrowed > 0 && (
                                <button
                                  onClick={() => {
                                    const pool = LENDING_POOLS.find((p) => p.symbol === position.symbol);
                                    if (pool) openModal(pool, 'repay');
                                  }}
                                  className="px-3 py-1 bg-green-500/20 text-green-400 rounded-lg text-sm hover:bg-green-500/30 transition-colors"
                                >
                                  Pagar
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Lending Pools */}
            <div className="bg-navy-800/50 backdrop-blur-sm rounded-xl border border-navy-700 overflow-hidden">
              <div className="p-6 border-b border-navy-700">
                <h2 className="text-xl font-bold text-white">Mercados Disponíveis</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-navy-800/80">
                    <tr className="text-gray-400 text-sm">
                      <th className="text-left p-4">Ativo</th>
                      <th className="text-right p-4">Total Emprestado</th>
                      <th className="text-right p-4">APY Empréstimo</th>
                      <th className="text-right p-4">Total Tomado</th>
                      <th className="text-right p-4">APY Tomado</th>
                      <th className="text-right p-4">Utilização</th>
                      <th className="text-right p-4">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-navy-700">
                    {LENDING_POOLS.map((pool) => (
                      <tr key={pool.id} className="hover:bg-navy-700/30 transition-colors">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="text-2xl">{pool.icon}</div>
                            <div>
                              <p className="text-white font-semibold">{pool.token}</p>
                              <p className="text-gray-400 text-sm">{pool.symbol}</p>
                            </div>
                          </div>
                        </td>
                        <td className="text-right p-4">
                          <p className="text-white font-semibold">{formatNumber(pool.totalSupplied)}</p>
                          <p className="text-gray-400 text-sm">${formatNumber(pool.totalSupplied * pool.priceUSD)}</p>
                        </td>
                        <td className="text-right p-4">
                          <p className="text-green-400 font-semibold">{pool.supplyAPY}%</p>
                        </td>
                        <td className="text-right p-4">
                          <p className="text-white font-semibold">{formatNumber(pool.totalBorrowed)}</p>
                          <p className="text-gray-400 text-sm">${formatNumber(pool.totalBorrowed * pool.priceUSD)}</p>
                        </td>
                        <td className="text-right p-4">
                          <p className="text-orange-400 font-semibold">{pool.borrowAPY}%</p>
                        </td>
                        <td className="text-right p-4">
                          <div className="flex items-center justify-end gap-2">
                            <div className="w-16 bg-navy-700 rounded-full h-2">
                              <div
                                className={`h-2 rounded-full ${
                                  pool.utilizationRate > 80
                                    ? 'bg-red-400'
                                    : pool.utilizationRate > 60
                                    ? 'bg-yellow-400'
                                    : 'bg-green-400'
                                }`}
                                style={{ width: `${pool.utilizationRate}%` }}
                              />
                            </div>
                            <span className="text-white text-sm w-12">{pool.utilizationRate}%</span>
                          </div>
                        </td>
                        <td className="text-right p-4">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => openModal(pool, 'supply')}
                              className="px-3 py-1 bg-orange-500 text-white rounded-lg text-sm hover:bg-orange-600 transition-colors"
                            >
                              Emprestar
                            </button>
                            <button
                              onClick={() => openModal(pool, 'borrow')}
                              className="px-3 py-1 bg-navy-700 text-white rounded-lg text-sm hover:bg-navy-600 transition-colors"
                            >
                              Tomar
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

        {/* Action Modal */}
        {showModal && selectedPool && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-navy-800 rounded-xl border border-navy-700 max-w-md w-full p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">
                  {actionType === 'supply'
                    ? 'Emprestar'
                    : actionType === 'borrow'
                    ? 'Tomar Emprestado'
                    : actionType === 'withdraw'
                    ? 'Retirar'
                    : 'Pagar'}{' '}
                  {selectedPool.symbol}
                </h3>
                <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-white">
                  ✕
                </button>
              </div>

              <div className="space-y-4">
                {/* Pool Info */}
                <div className="bg-navy-900/50 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="text-3xl">{selectedPool.icon}</div>
                    <div>
                      <p className="text-white font-semibold">{selectedPool.token}</p>
                      <p className="text-gray-400 text-sm">${selectedPool.priceUSD.toFixed(2)}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-400">
                        APY {actionType === 'supply' || actionType === 'withdraw' ? 'Empréstimo' : 'Tomado'}
                      </p>
                      <p
                        className={`font-semibold ${
                          actionType === 'supply' || actionType === 'withdraw' ? 'text-green-400' : 'text-orange-400'
                        }`}
                      >
                        {actionType === 'supply' || actionType === 'withdraw'
                          ? selectedPool.supplyAPY
                          : selectedPool.borrowAPY}
                        %
                      </p>
                    </div>
                    {(actionType === 'borrow' || actionType === 'repay') && (
                      <div>
                        <p className="text-gray-400">Fator Colateral</p>
                        <p className="text-white font-semibold">{selectedPool.collateralFactor}%</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Amount Input */}
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Quantidade</label>
                  <div className="relative">
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="0.0"
                      className="w-full bg-navy-900 border border-navy-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500"
                    />
                    <button className="absolute right-3 top-1/2 -translate-y-1/2 text-orange-400 text-sm font-semibold hover:text-orange-300">
                      MAX
                    </button>
                  </div>
                  <p className="text-gray-400 text-xs mt-1">
                    Disponível: {(Math.random() * 100).toFixed(4)} {selectedPool.symbol}
                  </p>
                </div>

                {/* Transaction Details */}
                <div className="bg-navy-900/50 rounded-lg p-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Valor em USD</span>
                    <span className="text-white font-semibold">
                      ${amount ? (parseFloat(amount) * selectedPool.priceUSD).toFixed(2) : '0.00'}
                    </span>
                  </div>
                  {(actionType === 'borrow' || actionType === 'repay') && (
                    <>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Novo Fator de Saúde</span>
                        <span className={getHealthFactorColor(healthFactor - 0.2)}>
                          {(healthFactor - 0.2).toFixed(2)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Taxa de Liquidação</span>
                        <span className="text-white">{selectedPool.liquidationThreshold}%</span>
                      </div>
                    </>
                  )}
                  <div className="flex items-center gap-2 text-gray-400">
                    <Clock className="w-4 h-4" />
                    <span>Tempo estimado: ~15 segundos</span>
                  </div>
                </div>

                {/* Action Button */}
                <button
                  onClick={handleAction}
                  disabled={!amount || parseFloat(amount) <= 0}
                  className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {actionType === 'supply'
                    ? 'Confirmar Empréstimo'
                    : actionType === 'borrow'
                    ? 'Confirmar Tomada'
                    : actionType === 'withdraw'
                    ? 'Confirmar Retirada'
                    : 'Confirmar Pagamento'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
