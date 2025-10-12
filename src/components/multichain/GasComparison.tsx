import { useEffect, useState } from 'react';
import { ChainConfig } from '@/config/chains';
import { TrendingUp, TrendingDown, Zap } from 'lucide-react';

/**
 * GasComparison - Comparação de taxas de gas entre redes
 */

interface GasData {
  chainId: number;
  chainName: string;
  gasPrice: number; // em Gwei
  gasPriceUSD: number;
  speed: 'low' | 'medium' | 'high';
  color: string;
}

interface GasComparisonProps {
  chains: ChainConfig[];
}

export function GasComparison({ chains }: GasComparisonProps) {
  const [gasData, setGasData] = useState<GasData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Mock data - substituir por API real (ex: Etherscan, Polygonscan, etc)
    const mockGasData: GasData[] = [
      { chainId: 1, chainName: 'Ethereum', gasPrice: 35, gasPriceUSD: 2.5, speed: 'high', color: '#627EEA' },
      { chainId: 137, chainName: 'Polygon', gasPrice: 50, gasPriceUSD: 0.02, speed: 'low', color: '#8247E5' },
      { chainId: 56, chainName: 'BSC', gasPrice: 3, gasPriceUSD: 0.15, speed: 'low', color: '#F3BA2F' },
      { chainId: 42161, chainName: 'Arbitrum', gasPrice: 0.1, gasPriceUSD: 0.05, speed: 'low', color: '#28A0F0' },
      { chainId: 10, chainName: 'Optimism', gasPrice: 0.05, gasPriceUSD: 0.03, speed: 'low', color: '#FF0420' },
      { chainId: 8453, chainName: 'Base', gasPrice: 0.08, gasPriceUSD: 0.04, speed: 'low', color: '#0052FF' },
    ];

    setTimeout(() => {
      setGasData(mockGasData);
      setIsLoading(false);
    }, 1000);
  }, [chains]);

  const getSpeedIcon = (speed: string) => {
    switch (speed) {
      case 'high':
        return <TrendingUp className="h-4 w-4 text-red-500" />;
      case 'medium':
        return <Zap className="h-4 w-4 text-yellow-500" />;
      case 'low':
        return <TrendingDown className="h-4 w-4 text-green-500" />;
      default:
        return null;
    }
  };

  const getSpeedText = (speed: string) => {
    switch (speed) {
      case 'high':
        return { text: 'Alto', color: 'text-red-500' };
      case 'medium':
        return { text: 'Médio', color: 'text-yellow-500' };
      case 'low':
        return { text: 'Baixo', color: 'text-green-500' };
      default:
        return { text: '-', color: '' };
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  // Ordenar por preço USD (mais barato primeiro)
  const sortedGasData = [...gasData].sort((a, b) => a.gasPriceUSD - b.gasPriceUSD);
  const cheapestChain = sortedGasData[0];

  return (
    <div>
      {/* Info Box */}
      <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 mb-4">
        <p className="text-sm text-green-900 dark:text-green-200">
          💡 <strong>Rede mais econômica:</strong> {cheapestChain.chainName} com taxa de apenas ${cheapestChain.gasPriceUSD.toFixed(2)} por transação
        </p>
      </div>

      {/* Gas Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600 dark:text-gray-400">
                Rede
              </th>
              <th className="text-right py-3 px-4 text-sm font-semibold text-gray-600 dark:text-gray-400">
                Gas (Gwei)
              </th>
              <th className="text-right py-3 px-4 text-sm font-semibold text-gray-600 dark:text-gray-400">
                Custo (USD)
              </th>
              <th className="text-center py-3 px-4 text-sm font-semibold text-gray-600 dark:text-gray-400">
                Velocidade
              </th>
              <th className="text-center py-3 px-4 text-sm font-semibold text-gray-600 dark:text-gray-400">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedGasData.map((data) => {
              const speedInfo = getSpeedText(data.speed);
              
              return (
                <tr
                  key={data.chainId}
                  className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                >
                  {/* Chain Name */}
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
                        style={{ backgroundColor: `${data.color}20`, color: data.color }}
                      >
                        {data.chainName.charAt(0)}
                      </div>
                      <span className="font-semibold">{data.chainName}</span>
                    </div>
                  </td>

                  {/* Gas Price */}
                  <td className="py-4 px-4 text-right">
                    <span className="font-medium">{data.gasPrice.toFixed(2)}</span>
                  </td>

                  {/* USD Price */}
                  <td className="py-4 px-4 text-right">
                    <span className="font-bold text-orange-500">
                      ${data.gasPriceUSD.toFixed(2)}
                    </span>
                  </td>

                  {/* Speed */}
                  <td className="py-4 px-4">
                    <div className="flex items-center justify-center gap-1">
                      {getSpeedIcon(data.speed)}
                      <span className={`text-sm font-medium ${speedInfo.color}`}>
                        {speedInfo.text}
                      </span>
                    </div>
                  </td>

                  {/* Status */}
                  <td className="py-4 px-4 text-center">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                      Ativo
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Refresh Info */}
      <p className="text-xs text-gray-500 dark:text-gray-400 mt-4 text-center">
        Atualizado em tempo real • Baseado em transações padrão (21.000 gas)
      </p>
    </div>
  );
}
