import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

/**
 * AssetDistribution - Gráfico de pizza mostrando distribuição de ativos
 */

interface Asset {
  symbol: string;
  name: string;
  allocation: number;
}

interface AssetDistributionProps {
  assets: Asset[];
}

export function AssetDistribution({ assets }: AssetDistributionProps) {
  const colors = [
    '#FF6B35', // Orange (ETH)
    '#001F3F', // Navy (BTC)
    '#FFA07A', // Light Orange (USDT)
    '#2C5282', // Blue (MATIC)
    '#FF7F50', // Coral
    '#1E3A5F', // Dark Blue
  ];

  const chartData = {
    labels: assets.map(asset => asset.symbol),
    datasets: [
      {
        data: assets.map(asset => asset.allocation),
        backgroundColor: colors.slice(0, assets.length),
        borderColor: '#fff',
        borderWidth: 2,
        hoverOffset: 10,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: '#1F2937',
        titleColor: '#F3F4F6',
        bodyColor: '#F3F4F6',
        borderColor: '#FF6B35',
        borderWidth: 1,
        padding: 12,
        callbacks: {
          label: (context: any) => {
            return `${context.label}: ${context.parsed}%`;
          },
        },
      },
    },
  };

  return (
    <div>
      {/* Doughnut Chart */}
      <div className="h-48 mb-4">
        <Doughnut data={chartData} options={options} />
      </div>

      {/* Legend */}
      <div className="space-y-2">
        {assets.map((asset, index) => (
          <div key={asset.symbol} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: colors[index] }}
              />
              <span className="text-sm font-medium">{asset.symbol}</span>
            </div>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {asset.allocation}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
