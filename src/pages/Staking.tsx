import { useState } from 'react';
import { TrendingUp, Coins, Percent, Lock, Unlock, Plus, Minus } from 'lucide-react';
import { Card } from '@components/ui';
import { Button } from '@components/ui';

/**
 * Staking - Staking e Yield Farming
 * Funcionalidades:
 * - Fazer stake de tokens
 * - Ver recompensas acumuladas
 * - Yield Farming (prover liquidez)
 * - APY em tempo real
 * - Pools disponíveis
 */

interface StakingPool {
  id: string;
  name: string;
  token: string;
  apy: number;
  tvl: number; // Total Value Locked
  rewards: string;
  lockPeriod: string;
  minStake: number;
  userStaked?: number;
  userRewards?: number;
}

const stakingPools: StakingPool[] = [
  {
    id: '1',
    name: 'ETH Staking',
    token: 'ETH',
    apy: 4.5,
    tvl: 25000000,
    rewards: 'ETH',
    lockPeriod: 'Flexível',
    minStake: 0.01,
    userStaked: 2.5,
    userRewards: 0.0125,
  },
  {
    id: '2',
    name: 'USDT Staking',
    token: 'USDT',
    apy: 8.2,
    tvl: 15000000,
    rewards: 'USDT',
    lockPeriod: '30 dias',
    minStake: 100,
    userStaked: 5000,
    userRewards: 125.5,
  },
  {
    id: '3',
    name: 'UNI Staking',
    token: 'UNI',
    apy: 15.5,
    tvl: 8000000,
    rewards: 'UNI',
    lockPeriod: '90 dias',
    minStake: 10,
    userStaked: 150,
    userRewards: 5.25,
  },
  {
    id: '4',
    name: 'MATIC Yield Farm',
    token: 'MATIC',
    apy: 22.8,
    tvl: 5000000,
    rewards: 'MATIC + JARVIS',
    lockPeriod: 'Flexível',
    minStake: 100,
  },
  {
    id: '5',
    name: 'BTC Staking',
    token: 'WBTC',
    apy: 3.2,
    tvl: 35000000,
    rewards: 'WBTC',
    lockPeriod: '180 dias',
    minStake: 0.001,
  },
  {
    id: '6',
    name: 'DAI Yield Farm',
    token: 'DAI',
    apy: 12.5,
    tvl: 10000000,
    rewards: 'DAI + JARVIS',
    lockPeriod: '60 dias',
    minStake: 500,
  },
];

export default function Staking() {
  const [selectedPool, setSelectedPool] = useState<StakingPool | null>(null);
  const [stakeAmount, setStakeAmount] = useState('');
  const [action, setAction] = useState<'stake' | 'unstake'>('stake');

  const userPools = stakingPools.filter((p) => p.userStaked && p.userStaked > 0);
  const totalStaked = userPools.reduce((sum, p) => sum + (p.userStaked || 0) * getTokenPrice(p.token), 0);
  const totalRewards = userPools.reduce((sum, p) => sum + (p.userRewards || 0) * getTokenPrice(p.token), 0);

  function getTokenPrice(token: string): number {
    const prices: Record<string, number> = {
      ETH: 2800,
      USDT: 1,
      UNI: 8.5,
      MATIC: 0.85,
      WBTC: 68000,
      DAI: 1,
    };
    return prices[token] || 1;
  }

  const handleStake = () => {
    if (!selectedPool || !stakeAmount) return;
    alert(`${action === 'stake' ? 'Staking' : 'Unstaking'} de ${stakeAmount} ${selectedPool.token} concluído com sucesso!`);
    setSelectedPool(null);
    setStakeAmount('');
  };

  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <Coins className="h-10 w-10 text-orange-500" />
              <h1 className="text-4xl font-bold">Staking & Yield Farming</h1>
            </div>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            Deposite seus tokens e ganhe recompensas passivas
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">Total em Stake</span>
              <Lock className="h-5 w-5 text-orange-500" />
            </div>
            <p className="text-3xl font-bold text-orange-500">
              ${totalStaked.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {userPools.length} pools ativos
            </p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">Recompensas Acumuladas</span>
              <TrendingUp className="h-5 w-5 text-green-500" />
            </div>
            <p className="text-3xl font-bold text-green-500">
              ${totalRewards.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Disponível para resgate
            </p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">APY Médio</span>
              <Percent className="h-5 w-5 text-blue-500" />
            </div>
            <p className="text-3xl font-bold text-blue-500">
              {userPools.length > 0
                ? (userPools.reduce((sum, p) => sum + p.apy, 0) / userPools.length).toFixed(1)
                : '0.0'}
              %
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Retorno anual estimado
            </p>
          </Card>
        </div>

        {/* My Pools */}
        {userPools.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Meus Stakes</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {userPools.map((pool) => (
                <Card key={pool.id} className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold mb-1">{pool.name}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{pool.token}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-green-500">{pool.apy}%</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">APY</p>
                    </div>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Stake Ativo</span>
                      <span className="font-semibold">
                        {pool.userStaked} {pool.token}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Recompensas</span>
                      <span className="font-semibold text-green-500">
                        +{pool.userRewards} {pool.token}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Período</span>
                      <span className="font-semibold">{pool.lockPeriod}</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      onClick={() => {
                        setSelectedPool(pool);
                        setAction('stake');
                      }}
                      className="flex-1 gap-2"
                      size="sm"
                    >
                      <Plus className="h-4 w-4" />
                      Adicionar
                    </Button>
                    <Button
                      onClick={() => {
                        setSelectedPool(pool);
                        setAction('unstake');
                      }}
                      variant="secondary"
                      className="flex-1 gap-2"
                      size="sm"
                    >
                      <Minus className="h-4 w-4" />
                      Retirar
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Available Pools */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Pools Disponíveis</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stakingPools.map((pool) => (
              <Card
                key={pool.id}
                className={`p-6 cursor-pointer transition-all ${
                  pool.userStaked ? 'border-2 border-orange-500' : 'hover:shadow-lg'
                }`}
                onClick={() => {
                  setSelectedPool(pool);
                  setAction('stake');
                }}
              >
                {pool.userStaked && (
                  <div className="mb-2">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400">
                      ✓ Ativo
                    </span>
                  </div>
                )}

                <h3 className="text-xl font-bold mb-2">{pool.name}</h3>

                <div className="mb-4">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-green-500">{pool.apy}%</span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">APY</span>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">TVL</span>
                    <span className="font-medium">
                      ${(pool.tvl / 1000000).toFixed(1)}M
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Recompensas</span>
                    <span className="font-medium">{pool.rewards}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Período</span>
                    <span className="font-medium">{pool.lockPeriod}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Mínimo</span>
                    <span className="font-medium">
                      {pool.minStake} {pool.token}
                    </span>
                  </div>
                </div>

                <Button className="w-full">
                  <Lock className="h-4 w-4 mr-2" />
                  Fazer Stake
                </Button>
              </Card>
            ))}
          </div>
        </div>

        {/* Stake Modal */}
        {selectedPool && (
          <>
            <div className="fixed inset-0 bg-black/50 z-50" onClick={() => setSelectedPool(null)} />
            <div className="fixed inset-x-4 top-1/2 -translate-y-1/2 md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-full md:max-w-lg bg-white dark:bg-gray-800 rounded-xl shadow-xl z-50 p-6">
              <h2 className="text-2xl font-bold mb-4">
                {action === 'stake' ? 'Fazer Stake' : 'Retirar Stake'} - {selectedPool.name}
              </h2>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Quantidade</label>
                  <div className="relative">
                    <input
                      type="number"
                      value={stakeAmount}
                      onChange={(e) => setStakeAmount(e.target.value)}
                      placeholder="0.0"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                      step="0.000001"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 font-medium">
                      {selectedPool.token}
                    </span>
                  </div>
                  {action === 'stake' && (
                    <p className="text-xs text-gray-500 mt-1">
                      Mínimo: {selectedPool.minStake} {selectedPool.token}
                    </p>
                  )}
                  {action === 'unstake' && selectedPool.userStaked && (
                    <p className="text-xs text-gray-500 mt-1">
                      Disponível: {selectedPool.userStaked} {selectedPool.token}
                    </p>
                  )}
                </div>

                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>APY:</span>
                    <span className="font-semibold text-green-500">{selectedPool.apy}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Período de bloqueio:</span>
                    <span className="font-semibold">{selectedPool.lockPeriod}</span>
                  </div>
                  {stakeAmount && parseFloat(stakeAmount) > 0 && (
                    <div className="flex justify-between border-t border-blue-200 dark:border-blue-700 pt-2">
                      <span>Recompensa estimada (anual):</span>
                      <span className="font-semibold text-green-500">
                        {(parseFloat(stakeAmount) * selectedPool.apy / 100).toFixed(4)} {selectedPool.token}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex gap-3">
                <Button onClick={() => setSelectedPool(null)} variant="secondary" className="flex-1">
                  Cancelar
                </Button>
                <Button
                  onClick={handleStake}
                  disabled={!stakeAmount || parseFloat(stakeAmount) <= 0}
                  className="flex-1 gap-2"
                >
                  {action === 'stake' ? <Lock className="h-4 w-4" /> : <Unlock className="h-4 w-4" />}
                  {action === 'stake' ? 'Stake' : 'Unstake'}
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
