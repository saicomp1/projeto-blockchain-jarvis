import { TrendingUp, TrendingDown } from 'lucide-react';

/**
 * AssetList - Lista detalhada de todos os ativos do portfólio
 */

interface Asset {
  symbol: string;
  name: string;
  balance: number;
  price: number;
  change24h: number;
  value: number;
}

interface AssetListProps {
  assets: Asset[];
}

export function AssetList({ assets }: AssetListProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200 dark:border-gray-700">
            <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600 dark:text-gray-400">
              Ativo
            </th>
            <th className="text-right py-3 px-4 text-sm font-semibold text-gray-600 dark:text-gray-400">
              Saldo
            </th>
            <th className="text-right py-3 px-4 text-sm font-semibold text-gray-600 dark:text-gray-400">
              Preço
            </th>
            <th className="text-right py-3 px-4 text-sm font-semibold text-gray-600 dark:text-gray-400">
              24h
            </th>
            <th className="text-right py-3 px-4 text-sm font-semibold text-gray-600 dark:text-gray-400">
              Valor
            </th>
          </tr>
        </thead>
        <tbody>
          {assets.map((asset) => (
            <tr
              key={asset.symbol}
              className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
            >
              {/* Asset Info */}
              <td className="py-4 px-4">
                <div>
                  <p className="font-semibold">{asset.symbol}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{asset.name}</p>
                </div>
              </td>

              {/* Balance */}
              <td className="py-4 px-4 text-right">
                <p className="font-medium">
                  {asset.balance.toLocaleString('pt-BR', { 
                    minimumFractionDigits: asset.balance < 1 ? 4 : 2,
                    maximumFractionDigits: asset.balance < 1 ? 4 : 2,
                  })}
                </p>
              </td>

              {/* Price */}
              <td className="py-4 px-4 text-right">
                <p className="font-medium">
                  ${asset.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </p>
              </td>

              {/* 24h Change */}
              <td className="py-4 px-4 text-right">
                <div className="flex items-center justify-end gap-1">
                  {asset.change24h >= 0 ? (
                    <>
                      <TrendingUp className="h-4 w-4 text-green-500" />
                      <span className="text-green-500 font-medium">
                        +{asset.change24h.toFixed(2)}%
                      </span>
                    </>
                  ) : (
                    <>
                      <TrendingDown className="h-4 w-4 text-red-500" />
                      <span className="text-red-500 font-medium">
                        {asset.change24h.toFixed(2)}%
                      </span>
                    </>
                  )}
                </div>
              </td>

              {/* Value */}
              <td className="py-4 px-4 text-right">
                <p className="font-bold text-orange-500">
                  ${asset.value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
