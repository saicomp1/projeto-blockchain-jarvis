import { TrendingUp, TrendingDown, DollarSign } from 'lucide-react';

/**
 * ProfitLoss - Componente de Lucros e Perdas (P&L)
 * Mostra ganhos/perdas realizados e não realizados
 */

export function ProfitLoss() {
  // Mock data - substituir por dados reais
  const plData = {
    totalInvested: 20000,
    currentValue: 24750,
    unrealizedPL: 4750,
    unrealizedPLPercent: 23.75,
    realizedPL: 1250,
    realizedPLPercent: 6.25,
    totalPL: 6000,
    totalPLPercent: 30,
  };

  const StatCard = ({ 
    title, 
    value, 
    percent, 
    icon: Icon, 
    positive 
  }: { 
    title: string; 
    value: number; 
    percent: number; 
    icon: any; 
    positive: boolean;
  }) => (
    <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-gray-600 dark:text-gray-400">{title}</span>
        <Icon className={`h-5 w-5 ${positive ? 'text-green-500' : 'text-red-500'}`} />
      </div>
      <p className={`text-2xl font-bold mb-1 ${positive ? 'text-green-500' : 'text-red-500'}`}>
        {positive ? '+' : ''}${value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
      </p>
      <p className={`text-sm ${positive ? 'text-green-500' : 'text-red-500'}`}>
        {positive ? '+' : ''}{percent.toFixed(2)}%
      </p>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Total Invested */}
        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">Total Investido</span>
            <DollarSign className="h-5 w-5 text-blue-500" />
          </div>
          <p className="text-2xl font-bold text-blue-500">
            ${plData.totalInvested.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </p>
        </div>

        {/* Current Value */}
        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">Valor Atual</span>
            <DollarSign className="h-5 w-5 text-orange-500" />
          </div>
          <p className="text-2xl font-bold text-orange-500">
            ${plData.currentValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </p>
        </div>

        {/* Total P&L */}
        <StatCard
          title="Lucro/Perda Total"
          value={plData.totalPL}
          percent={plData.totalPLPercent}
          icon={plData.totalPL >= 0 ? TrendingUp : TrendingDown}
          positive={plData.totalPL >= 0}
        />
      </div>

      {/* Detailed P&L */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Unrealized P&L */}
        <StatCard
          title="Lucro/Perda Não Realizado"
          value={plData.unrealizedPL}
          percent={plData.unrealizedPLPercent}
          icon={plData.unrealizedPL >= 0 ? TrendingUp : TrendingDown}
          positive={plData.unrealizedPL >= 0}
        />

        {/* Realized P&L */}
        <StatCard
          title="Lucro/Perda Realizado"
          value={plData.realizedPL}
          percent={plData.realizedPLPercent}
          icon={plData.realizedPL >= 0 ? TrendingUp : TrendingDown}
          positive={plData.realizedPL >= 0}
        />
      </div>

      {/* Info */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <p className="text-sm text-blue-900 dark:text-blue-200">
          <strong>💡 Dica:</strong> Lucro/Perda Não Realizado reflete ganhos potenciais baseados no valor atual de mercado. 
          Lucro/Perda Realizado mostra ganhos confirmados de vendas já efetuadas.
        </p>
      </div>
    </div>
  );
}
