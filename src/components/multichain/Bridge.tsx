import { useState } from 'react';
import { ArrowLeftRight, AlertCircle } from 'lucide-react';
import { Button } from '@components/ui';
import { SUPPORTED_CHAINS } from '@/config/chains';

/**
 * Bridge - Componente para transferir ativos entre redes
 */

export function Bridge() {
  const [fromChain, setFromChain] = useState('ethereum');
  const [toChain, setToChain] = useState('polygon');
  const [amount, setAmount] = useState('');
  const [selectedToken, setSelectedToken] = useState('ETH');

  const chains = Object.entries(SUPPORTED_CHAINS);

  const handleSwapChains = () => {
    const temp = fromChain;
    setFromChain(toChain);
    setToChain(temp);
  };

  const handleBridge = () => {
    // Implementar lógica de bridge aqui
    console.log('Bridging', amount, selectedToken, 'from', fromChain, 'to', toChain);
  };

  const estimatedFee = parseFloat(amount) * 0.001; // 0.1% fee
  const estimatedTime = '5-10 min';

  return (
    <div className="space-y-6 mt-4">
      {/* Warning */}
      <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
        <div className="flex gap-2">
          <AlertCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0" />
          <p className="text-sm text-yellow-900 dark:text-yellow-200">
            <strong>Atenção:</strong> Verifique cuidadosamente as redes de origem e destino antes de transferir. 
            Transferências para endereços incorretos não podem ser revertidas.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative">
        {/* From Chain */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            De (Origem)
          </label>
          <select
            value={fromChain}
            onChange={(e) => setFromChain(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          >
            {chains.map(([key, chain]) => (
              <option key={chain.id} value={key} disabled={key === toChain}>
                {chain.name} ({chain.symbol})
              </option>
            ))}
          </select>
        </div>

        {/* Swap Button */}
        <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
          <button
            onClick={handleSwapChains}
            className="p-2 rounded-full bg-orange-500 text-white hover:bg-orange-600 transition-colors shadow-lg"
            aria-label="Trocar redes"
          >
            <ArrowLeftRight className="h-5 w-5" />
          </button>
        </div>

        {/* To Chain */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Para (Destino)
          </label>
          <select
            value={toChain}
            onChange={(e) => setToChain(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          >
            {chains.map(([key, chain]) => (
              <option key={chain.id} value={key} disabled={key === fromChain}>
                {chain.name} ({chain.symbol})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Token Selection */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Token
        </label>
        <select
          value={selectedToken}
          onChange={(e) => setSelectedToken(e.target.value)}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
        >
          <option value="ETH">ETH - Ethereum</option>
          <option value="USDT">USDT - Tether</option>
          <option value="USDC">USDC - USD Coin</option>
          <option value="DAI">DAI - Dai Stablecoin</option>
        </select>
      </div>

      {/* Amount Input */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Quantidade
        </label>
        <div className="relative">
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.0"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            step="0.000001"
            min="0"
          />
          <button
            onClick={() => setAmount('1.0')}
            className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1 text-sm font-medium text-orange-500 hover:bg-orange-50 dark:hover:bg-orange-900/20 rounded"
          >
            MAX
          </button>
        </div>
      </div>

      {/* Summary */}
      {amount && parseFloat(amount) > 0 && (
        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">Você envia</span>
            <span className="font-medium">{amount} {selectedToken}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">Taxa estimada</span>
            <span className="font-medium">{estimatedFee.toFixed(6)} {selectedToken}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">Você recebe</span>
            <span className="font-medium text-orange-500">
              {(parseFloat(amount) - estimatedFee).toFixed(6)} {selectedToken}
            </span>
          </div>
          <div className="flex justify-between text-sm border-t border-gray-200 dark:border-gray-700 pt-2">
            <span className="text-gray-600 dark:text-gray-400">Tempo estimado</span>
            <span className="font-medium">{estimatedTime}</span>
          </div>
        </div>
      )}

      {/* Bridge Button */}
      <Button
        onClick={handleBridge}
        disabled={!amount || parseFloat(amount) <= 0}
        className="w-full"
      >
        Transferir Ativos
      </Button>
    </div>
  );
}
