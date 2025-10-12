import { useState, useEffect } from 'react';
import { Wallet, TrendingUp, TrendingDown, DollarSign, PieChart, Activity } from 'lucide-react';
import { PortfolioChart } from '@/components/portfolio/PortfolioChart';
import { AssetDistribution } from '@/components/portfolio/AssetDistribution';
import { AssetList } from '@/components/portfolio/AssetList';
import { ProfitLoss } from '@/components/portfolio/ProfitLoss';

/**
 * Portfolio - Dashboard completo de ativos blockchain
 * Funcionalidades:
 * - Valor total do portfólio
 * - Gráficos de performance
 * - Distribuição de ativos
 * - Histórico de preços
 * - P&L (Profit & Loss)
 */

export default function Portfolio() {
  const [portfolioValue, setPortfolioValue] = useState(0);
  const [priceChange24h, setPriceChange24h] = useState(0);

  // Mock data - substituir por dados reais de APIs
  const mockAssets = [
    { symbol: 'ETH', name: 'Ethereum', balance: 2.5, price: 2800, change24h: 5.2, value: 7000, allocation: 45 },
    { symbol: 'BTC', name: 'Bitcoin', balance: 0.15, price: 68000, change24h: -2.1, value: 10200, allocation: 30 },
    { symbol: 'USDT', name: 'Tether', balance: 5000, price: 1, change24h: 0.01, value: 5000, allocation: 15 },
    { symbol: 'MATIC', name: 'Polygon', balance: 3000, price: 0.85, change24h: 8.5, value: 2550, allocation: 10 },
  ];

  useEffect(() => {
    // Calcular valor total do portfólio
    const total = mockAssets.reduce((sum, asset) => sum + asset.value, 0);
    setPortfolioValue(total);

    // Calcular mudança 24h ponderada
    const weightedChange = mockAssets.reduce((sum, asset) => {
      const weight = asset.value / total;
      return sum + (asset.change24h * weight);
    }, 0);
    setPriceChange24h(weightedChange);
  }, []);

  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2 text-white">Meu Portfólio</h1>
              <p className="text-gray-400">
                Visualize e gerencie seus investimentos em criptomoedas
              </p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Valor Total */}
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">Valor Total</span>
              <DollarSign className="h-5 w-5 text-orange-500" />
            </div>
            <p className="text-3xl font-bold text-orange-500">
              ${portfolioValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </p>
          </div>

          {/* Mudança 24h */}
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">Mudança 24h</span>
              {priceChange24h >= 0 ? (
                <TrendingUp className="h-5 w-5 text-green-500" />
              ) : (
                <TrendingDown className="h-5 w-5 text-red-500" />
              )}
            </div>
            <p className={`text-3xl font-bold ${priceChange24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {priceChange24h >= 0 ? '+' : ''}{priceChange24h.toFixed(2)}%
            </p>
          </div>

          {/* Total de Ativos */}
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">Total de Ativos</span>
              <PieChart className="h-5 w-5 text-blue-500" />
            </div>
            <p className="text-3xl font-bold text-blue-500">{mockAssets.length}</p>
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Performance Chart */}
          <div className="lg:col-span-2">
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
              <div className="flex items-center gap-2 mb-4">
                <Activity className="h-5 w-5 text-orange-500" />
                <h2 className="text-xl font-bold">Performance</h2>
              </div>
              <PortfolioChart />
            </div>
          </div>

          {/* Asset Distribution */}
          <div className="lg:col-span-1">
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
              <div className="flex items-center gap-2 mb-4">
                <PieChart className="h-5 w-5 text-orange-500" />
                <h2 className="text-xl font-bold">Distribuição</h2>
              </div>
              <AssetDistribution assets={mockAssets} />
            </div>
          </div>
        </div>

        {/* Profit & Loss */}
        <div className="mb-8">
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
            <h2 className="text-xl font-bold mb-4">Lucros & Perdas (P&L)</h2>
            <ProfitLoss />
          </div>
        </div>

        {/* Asset List */}
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
          <h2 className="text-xl font-bold mb-4">Meus Ativos</h2>
          <AssetList assets={mockAssets} />
        </div>
      </div>
    </div>
  );
}
