import { useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

/**
 * PortfolioChart - Gráfico de performance do portfólio ao longo do tempo
 */

type TimeRange = '24h' | '7d' | '30d' | '1y' | 'all';

export function PortfolioChart() {
  const [timeRange, setTimeRange] = useState<TimeRange>('7d');

  // Mock data - substituir por dados reais
  const generateMockData = (range: TimeRange) => {
    const points = range === '24h' ? 24 : range === '7d' ? 7 : range === '30d' ? 30 : 365;
    const labels = [];
    const data = [];
    const baseValue = 24750;

    for (let i = 0; i < points; i++) {
      if (range === '24h') {
        labels.push(`${i}:00`);
      } else if (range === '7d') {
        const days = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
        labels.push(days[i % 7]);
      } else {
        labels.push(`Dia ${i + 1}`);
      }
      
      // Gerar valores com tendência de crescimento + volatilidade
      const trend = (i / points) * 2000;
      const volatility = Math.random() * 1000 - 500;
      data.push(baseValue + trend + volatility);
    }

    return { labels, data };
  };

  const mockData = generateMockData(timeRange);

  const chartData = {
    labels: mockData.labels,
    datasets: [
      {
        label: 'Valor do Portfólio',
        data: mockData.data,
        borderColor: '#FF6B35',
        backgroundColor: 'rgba(255, 107, 53, 0.1)',
        fill: true,
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 6,
        pointHoverBackgroundColor: '#FF6B35',
        pointHoverBorderColor: '#fff',
        pointHoverBorderWidth: 2,
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
        displayColors: false,
        callbacks: {
          label: (context: any) => {
            return `$${context.parsed.y.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#9CA3AF',
          maxRotation: 0,
        },
      },
      y: {
        grid: {
          color: 'rgba(156, 163, 175, 0.1)',
        },
        ticks: {
          color: '#9CA3AF',
          callback: (value: any) => {
            return `$${(value / 1000).toFixed(0)}k`;
          },
        },
      },
    },
    interaction: {
      intersect: false,
      mode: 'index' as const,
    },
  };

  const timeRanges: { value: TimeRange; label: string }[] = [
    { value: '24h', label: '24h' },
    { value: '7d', label: '7d' },
    { value: '30d', label: '30d' },
    { value: '1y', label: '1a' },
    { value: 'all', label: 'Tudo' },
  ];

  return (
    <div>
      {/* Time Range Selector */}
      <div className="flex gap-2 mb-4">
        {timeRanges.map((range) => (
          <button
            key={range.value}
            onClick={() => setTimeRange(range.value)}
            className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
              timeRange === range.value
                ? 'bg-orange-500 text-white'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            {range.label}
          </button>
        ))}
      </div>

      {/* Chart */}
      <div className="h-64">
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
}
