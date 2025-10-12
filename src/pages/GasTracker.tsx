import { useState, useEffect } from 'react';
import { Zap, TrendingUp, TrendingDown, Clock, AlertCircle } from 'lucide-react';
import { Card } from '@components/ui';
import { SUPPORTED_CHAINS } from '@/config/chains';
import { Line } from 'react-chartjs-2';

/**
 * GasTracker - Monitor de gas fees em tempo real
 * Funcionalidades:
 * - Monitorar gas de múltiplas redes
 * - Velocidades: Lento, Normal, Rápido
 * - Gráfico histórico
 * - Alertas de gas baixo
 * - Estimativa de custos
 */

interface GasPrice {
  chainId: number;
  chainName: string;
  color: string;
  slow: { gwei: number; usd: number; time: string };
  standard: { gwei: number; usd: number; time: string };
  fast: { gwei: number; usd: number; time: string };
  timestamp: number;
}

export default function GasTracker() {
  const [gasPrices, setGasPrices] = useState<GasPrice[]>([]);
  const [selectedChain, setSelectedChain] = useState('ethereum');
  const [_isLoading, setIsLoading] = useState(true);
  const [autoRefresh, setAutoRefresh] = useState(true);

  const _chains = Object.entries(SUPPORTED_CHAINS);

  // Simular fetch de preços de gas
  const fetchGasPrices = () => {
    const mockData: GasPrice[] = [
      {
        chainId: 1,
        chainName: 'Ethereum',
        color: '#627EEA',
        slow: { gwei: 25, usd: 1.75, time: '~5 min' },
        standard: { gwei: 35, usd: 2.45, time: '~2 min' },
        fast: { gwei: 50, usd: 3.50, time: '~30 seg' },
        timestamp: Date.now(),
      },
      {
        chainId: 137,
        chainName: 'Polygon',
        color: '#8247E5',
        slow: { gwei: 30, usd: 0.01, time: '~3 min' },
        standard: { gwei: 50, usd: 0.02, time: '~1 min' },
        fast: { gwei: 80, usd: 0.03, time: '~15 seg' },
        timestamp: Date.now(),
      },
      {
        chainId: 56,
        chainName: 'BSC',
        color: '#F3BA2F',
        slow: { gwei: 3, usd: 0.10, time: '~3 min' },
        standard: { gwei: 5, usd: 0.15, time: '~1 min' },
        fast: { gwei: 7, usd: 0.20, time: '~15 seg' },
        timestamp: Date.now(),
      },
      {
        chainId: 42161,
        chainName: 'Arbitrum',
        color: '#28A0F0',
        slow: { gwei: 0.05, usd: 0.02, time: '~2 min' },
        standard: { gwei: 0.1, usd: 0.05, time: '~1 min' },
        fast: { gwei: 0.15, usd: 0.08, time: '~10 seg' },
        timestamp: Date.now(),
      },
      {
        chainId: 10,
        chainName: 'Optimism',
        color: '#FF0420',
        slow: { gwei: 0.03, usd: 0.01, time: '~2 min' },
        standard: { gwei: 0.05, usd: 0.03, time: '~1 min' },
        fast: { gwei: 0.08, usd: 0.04, time: '~10 seg' },
        timestamp: Date.now(),
      },
      {
        chainId: 8453,
        chainName: 'Base',
        color: '#0052FF',
        slow: { gwei: 0.04, usd: 0.02, time: '~2 min' },
        standard: { gwei: 0.08, usd: 0.04, time: '~1 min' },
        fast: { gwei: 0.12, usd: 0.06, time: '~10 seg' },
        timestamp: Date.now(),
      },
    ];

    setGasPrices(mockData);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchGasPrices();

    if (autoRefresh) {
      const interval = setInterval(fetchGasPrices, 15000); // Atualizar a cada 15s
      return () => clearInterval(interval);
    }
    return undefined;
  }, [autoRefresh]);

  const selectedGas = gasPrices.find((g) => g.chainName.toLowerCase() === selectedChain);
  const cheapestChain = [...gasPrices].sort((a, b) => a.standard.usd - b.standard.usd)[0];

  // Gráfico de histórico de gas
  const chartData = {
    labels: ['15min', '30min', '45min', '1h', '1.5h', '2h', 'Agora'],
    datasets: [
      {
        label: 'Gas (Gwei)',
        data: [45, 42, 38, 35, 33, 36, selectedGas?.standard.gwei || 35],
        borderColor: '#FF6B35',
        backgroundColor: 'rgba(255, 107, 53, 0.1)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#1F2937',
        callbacks: {
          label: (context: { parsed: { y: number } }) => `${context.parsed.y} Gwei`,
        },
      },
    },
    scales: {
      y: {
        ticks: { color: '#9CA3AF' },
        grid: { color: 'rgba(156, 163, 175, 0.1)' },
      },
      x: {
        ticks: { color: '#9CA3AF' },
        grid: { display: false },
      },
    },
  };

  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Zap className="h-10 w-10 text-orange-500" />
                <h1 className="text-4xl font-bold">Gas Tracker</h1>
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                Monitore taxas de gas em tempo real de múltiplas redes
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setAutoRefresh(!autoRefresh)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  autoRefresh
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}
              >
                {autoRefresh ? '🟢 Auto' : '⏸️ Manual'}
              </button>
              <button
                onClick={fetchGasPrices}
                className="px-4 py-2 rounded-lg bg-orange-500 text-white hover:bg-orange-600 transition-colors"
              >
                🔄 Atualizar
              </button>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">Rede Mais Barata</span>
              <TrendingDown className="h-5 w-5 text-green-500" />
            </div>
            <p className="text-2xl font-bold text-green-500">{cheapestChain?.chainName}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              ${cheapestChain?.standard.usd.toFixed(2)} por transação
            </p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">Ethereum Gas</span>
              <Zap className="h-5 w-5 text-purple-500" />
            </div>
            <p className="text-2xl font-bold text-purple-500">
              {gasPrices.find((g) => g.chainName === 'Ethereum')?.standard.gwei || 0} Gwei
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Padrão (~2 min)
            </p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">Última Atualização</span>
              <Clock className="h-5 w-5 text-blue-500" />
            </div>
            <p className="text-2xl font-bold text-blue-500">
              {new Date(gasPrices[0]?.timestamp || Date.now()).toLocaleTimeString('pt-BR', {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Atualização automática: 15s
            </p>
          </Card>
        </div>

        {/* Chain Selector */}
        <Card className="p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">Selecione a Rede</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {gasPrices.map((gas) => (
              <button
                key={gas.chainId}
                onClick={() => setSelectedChain(gas.chainName.toLowerCase())}
                className={`p-4 rounded-lg border-2 transition-all ${
                  selectedChain === gas.chainName.toLowerCase()
                    ? 'border-orange-500 bg-orange-500/10'
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                }`}
              >
                <div
                  className="w-12 h-12 mx-auto rounded-full flex items-center justify-center text-xl font-bold mb-2"
                  style={{ backgroundColor: `${gas.color}20`, color: gas.color }}
                >
                  {gas.chainName.charAt(0)}
                </div>
                <p className="font-semibold text-sm">{gas.chainName}</p>
                <p className="text-xs text-orange-500 font-bold mt-1">
                  ${gas.standard.usd.toFixed(2)}
                </p>
              </button>
            ))}
          </div>
        </Card>

        {/* Selected Chain Details */}
        {selectedGas && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Gas Prices */}
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4">Preços de Gas - {selectedGas.chainName}</h2>
              <div className="space-y-4">
                {/* Slow */}
                <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <TrendingDown className="h-5 w-5 text-blue-600" />
                      <span className="font-semibold">Lento</span>
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {selectedGas.slow.time}
                    </span>
                  </div>
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-2xl font-bold text-blue-600">
                        {selectedGas.slow.gwei} Gwei
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        ≈ ${selectedGas.slow.usd.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Standard */}
                <div className="p-4 rounded-lg bg-orange-50 dark:bg-orange-900/20 border-2 border-orange-500">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Zap className="h-5 w-5 text-orange-600" />
                      <span className="font-semibold">Padrão</span>
                      <span className="text-xs bg-orange-500 text-white px-2 py-0.5 rounded-full">
                        Recomendado
                      </span>
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {selectedGas.standard.time}
                    </span>
                  </div>
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-2xl font-bold text-orange-600">
                        {selectedGas.standard.gwei} Gwei
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        ≈ ${selectedGas.standard.usd.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Fast */}
                <div className="p-4 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-red-600" />
                      <span className="font-semibold">Rápido</span>
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {selectedGas.fast.time}
                    </span>
                  </div>
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-2xl font-bold text-red-600">
                        {selectedGas.fast.gwei} Gwei
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        ≈ ${selectedGas.fast.usd.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Gas History Chart */}
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4">Histórico de Gas (2 horas)</h2>
              <div className="h-64">
                <Line data={chartData} options={chartOptions} />
              </div>
              <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                <div className="flex items-start gap-2">
                  <AlertCircle className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-blue-900 dark:text-blue-200">
                    💡 <strong>Dica:</strong> O melhor momento para fazer transações é quando o gas está abaixo de 30 Gwei.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Gas Calculator */}
        <Card className="p-6">
          <h2 className="text-xl font-bold mb-4">Calculadora de Gas</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Transferência Simples</p>
              <p className="text-xl font-bold text-orange-500">
                ${(selectedGas?.standard.usd || 0).toFixed(2)}
              </p>
              <p className="text-xs text-gray-500 mt-1">~21,000 gas</p>
            </div>

            <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Swap de Tokens</p>
              <p className="text-xl font-bold text-orange-500">
                ${((selectedGas?.standard.usd || 0) * 6).toFixed(2)}
              </p>
              <p className="text-xs text-gray-500 mt-1">~120,000 gas</p>
            </div>

            <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Mint NFT</p>
              <p className="text-xl font-bold text-orange-500">
                ${((selectedGas?.standard.usd || 0) * 4).toFixed(2)}
              </p>
              <p className="text-xs text-gray-500 mt-1">~80,000 gas</p>
            </div>

            <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Deploy Contrato</p>
              <p className="text-xl font-bold text-orange-500">
                ${((selectedGas?.standard.usd || 0) * 50).toFixed(2)}
              </p>
              <p className="text-xs text-gray-500 mt-1">~1,000,000 gas</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
