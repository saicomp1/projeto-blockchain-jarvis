import { useState } from 'react';
import { ArrowDownUp, Settings, Info, AlertCircle } from 'lucide-react';
import { Card } from '@components/ui';
import { Button } from '@components/ui';
import { TokenSelector } from '@/components/swap/TokenSelector';
import { SwapSettings } from '@/components/swap/SwapSettings';
import { SwapRoute } from '@/components/swap/SwapRoute';

/**
 * Swap - Exchange de tokens descentralizado (DEX)
 * Funcionalidades:
 * - Trocar tokens diretamente
 * - Melhor rota automática
 * - Configurações de slippage
 * - Preview de transação
 * - Histórico de swaps
 */

interface Token {
  symbol: string;
  name: string;
  address: string;
  decimals: number;
  logoUrl: string;
  balance?: number;
  price?: number;
}

const popularTokens: Token[] = [
  { symbol: 'ETH', name: 'Ethereum', address: '0x0000000000000000000000000000000000000000', decimals: 18, logoUrl: '/tokens/eth.svg', balance: 2.5, price: 2800 },
  { symbol: 'USDT', name: 'Tether USD', address: '0xdac17f958d2ee523a2206206994597c13d831ec7', decimals: 6, logoUrl: '/tokens/usdt.svg', balance: 5000, price: 1 },
  { symbol: 'USDC', name: 'USD Coin', address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48', decimals: 6, logoUrl: '/tokens/usdc.svg', balance: 3000, price: 1 },
  { symbol: 'DAI', name: 'Dai Stablecoin', address: '0x6b175474e89094c44da98b954eedeac495271d0f', decimals: 18, logoUrl: '/tokens/dai.svg', balance: 1000, price: 1 },
  { symbol: 'WBTC', name: 'Wrapped Bitcoin', address: '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599', decimals: 8, logoUrl: '/tokens/wbtc.svg', balance: 0.1, price: 68000 },
  { symbol: 'UNI', name: 'Uniswap', address: '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984', decimals: 18, logoUrl: '/tokens/uni.svg', balance: 150, price: 8.5 },
];

export default function Swap() {
  const [fromToken, setFromToken] = useState<Token>(popularTokens[0]);
  const [toToken, setToToken] = useState<Token>(popularTokens[1]);
  const [fromAmount, setFromAmount] = useState('');
  const [toAmount, setToAmount] = useState('');
  const [slippage, setSlippage] = useState(0.5);
  const [showSettings, setShowSettings] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Simular cálculo de taxa de conversão
  const calculateSwap = (amount: string, isFromInput: boolean) => {
    if (!amount || parseFloat(amount) <= 0) {
      setFromAmount('');
      setToAmount('');
      return;
    }

    const amountNum = parseFloat(amount);
    const fromPrice = fromToken.price || 0;
    const toPrice = toToken.price || 0;

    if (isFromInput) {
      const converted = (amountNum * fromPrice) / toPrice;
      setFromAmount(amount);
      setToAmount(converted.toFixed(6));
    } else {
      const converted = (amountNum * toPrice) / fromPrice;
      setToAmount(amount);
      setFromAmount(converted.toFixed(6));
    }
  };

  const handleSwapTokens = () => {
    const tempToken = fromToken;
    const tempAmount = fromAmount;
    
    setFromToken(toToken);
    setToToken(tempToken);
    setFromAmount(toAmount);
    setToAmount(tempAmount);
  };

  const handleSwap = () => {
    setIsLoading(true);
    // Simular transação
    setTimeout(() => {
      setIsLoading(false);
      alert(`Swap de ${fromAmount} ${fromToken.symbol} por ${toAmount} ${toToken.symbol} concluído com sucesso!`);
      setFromAmount('');
      setToAmount('');
    }, 2000);
  };

  const estimatedGas = 0.003; // ETH
  const priceImpact = 0.05; // %
  const minimumReceived = parseFloat(toAmount) * (1 - slippage / 100);

  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-2 text-white">Swap de Tokens</h1>
          <p className="text-gray-400">
            Troque seus tokens com as melhores taxas do mercado
          </p>
        </div>

        {/* Main Swap Card */}
        <Card className="p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Trocar</h2>
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Configurações"
            >
              <Settings className="h-5 w-5" />
            </button>
          </div>

          {/* Settings */}
          {showSettings && (
            <SwapSettings slippage={slippage} setSlippage={setSlippage} />
          )}

          <div className="space-y-2">
            {/* From Token */}
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">Você paga</span>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Saldo: {fromToken.balance?.toFixed(4) || '0.0000'}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  value={fromAmount}
                  onChange={(e) => calculateSwap(e.target.value, true)}
                  placeholder="0.0"
                  className="flex-1 bg-transparent text-3xl font-bold outline-none"
                  step="0.000001"
                />
                <TokenSelector
                  selectedToken={fromToken}
                  onSelectToken={setFromToken}
                  tokens={popularTokens}
                  excludeToken={toToken}
                />
              </div>
              {fromAmount && (
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  ≈ ${(parseFloat(fromAmount) * (fromToken.price || 0)).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </p>
              )}
            </div>

            {/* Swap Button */}
            <div className="flex justify-center -my-2 relative z-10">
              <button
                onClick={handleSwapTokens}
                className="p-2 rounded-xl bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                aria-label="Inverter tokens"
              >
                <ArrowDownUp className="h-5 w-5" />
              </button>
            </div>

            {/* To Token */}
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">Você recebe</span>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Saldo: {toToken.balance?.toFixed(4) || '0.0000'}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  value={toAmount}
                  onChange={(e) => calculateSwap(e.target.value, false)}
                  placeholder="0.0"
                  className="flex-1 bg-transparent text-3xl font-bold outline-none"
                  step="0.000001"
                />
                <TokenSelector
                  selectedToken={toToken}
                  onSelectToken={setToToken}
                  tokens={popularTokens}
                  excludeToken={fromToken}
                />
              </div>
              {toAmount && (
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  ≈ ${(parseFloat(toAmount) * (toToken.price || 0)).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </p>
              )}
            </div>
          </div>

          {/* Swap Details */}
          {fromAmount && toAmount && parseFloat(fromAmount) > 0 && (
            <div className="mt-4 space-y-3">
              {/* Info Box */}
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
                <div className="flex items-start gap-2">
                  <Info className="h-4 w-4 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-blue-900 dark:text-blue-200 space-y-1">
                    <div className="flex justify-between">
                      <span>Taxa:</span>
                      <span className="font-medium">
                        1 {fromToken.symbol} = {(parseFloat(toAmount) / parseFloat(fromAmount)).toFixed(6)} {toToken.symbol}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Impacto no preço:</span>
                      <span className={`font-medium ${priceImpact > 1 ? 'text-red-600' : ''}`}>
                        {priceImpact.toFixed(2)}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Gas estimado:</span>
                      <span className="font-medium">{estimatedGas} ETH (≈ ${(estimatedGas * 2800).toFixed(2)})</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Mínimo recebido:</span>
                      <span className="font-medium">{minimumReceived.toFixed(6)} {toToken.symbol}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Warning if high slippage */}
              {priceImpact > 1 && (
                <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-3">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="h-4 w-4 text-yellow-600 dark:text-yellow-400 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-yellow-900 dark:text-yellow-200">
                      <strong>Atenção:</strong> Alto impacto no preço. Considere reduzir a quantidade.
                    </p>
                  </div>
                </div>
              )}

              {/* Route */}
              <SwapRoute fromToken={fromToken} toToken={toToken} />
            </div>
          )}

          {/* Swap Button */}
          <Button
            onClick={handleSwap}
            disabled={!fromAmount || !toAmount || parseFloat(fromAmount) <= 0 || isLoading}
            className="w-full mt-6"
            isLoading={isLoading}
          >
            {isLoading ? 'Processando...' : 'Trocar Tokens'}
          </Button>
        </Card>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-4">
            <h3 className="font-semibold mb-1">🔒 Seguro</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Contratos auditados e verificados
            </p>
          </Card>
          <Card className="p-4">
            <h3 className="font-semibold mb-1">⚡ Rápido</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Swaps instantâneos em segundos
            </p>
          </Card>
          <Card className="p-4">
            <h3 className="font-semibold mb-1">💰 Melhores Taxas</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Roteamento automático otimizado
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
