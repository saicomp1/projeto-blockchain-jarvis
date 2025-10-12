import { ArrowRight } from 'lucide-react';

/**
 * SwapRoute - Mostra a rota do swap (pode incluir pools intermediários)
 */

interface Token {
  symbol: string;
  name: string;
}

interface SwapRouteProps {
  fromToken: Token;
  toToken: Token;
}

export function SwapRoute({ fromToken, toToken }: SwapRouteProps) {
  // Mock: rota direta ou via intermediário
  const isDirect = Math.random() > 0.3;
  const intermediateToken = 'USDC';

  return (
    <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-3">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium">Rota do Swap</span>
        <span className="text-xs text-gray-600 dark:text-gray-400">Via Uniswap V3</span>
      </div>
      
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-gray-700 rounded-lg">
          <span className="font-medium text-sm">{fromToken.symbol}</span>
        </div>
        
        <ArrowRight className="h-4 w-4 text-gray-400" />
        
        {!isDirect && (
          <>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-gray-700 rounded-lg">
              <span className="font-medium text-sm">{intermediateToken}</span>
            </div>
            <ArrowRight className="h-4 w-4 text-gray-400" />
          </>
        )}
        
        <div className="flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-gray-700 rounded-lg">
          <span className="font-medium text-sm">{toToken.symbol}</span>
        </div>
      </div>

      <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">
        {isDirect 
          ? '✓ Rota direta encontrada (menor gas)'
          : `✓ Rota otimizada via ${intermediateToken} (melhor preço)`
        }
      </p>
    </div>
  );
}
