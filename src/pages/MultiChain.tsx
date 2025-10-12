import { useState } from 'react';
import { Network, ArrowLeftRight, Zap, TrendingDown } from 'lucide-react';
import { Card } from '@components/ui';
import { SUPPORTED_CHAINS } from '@/config/chains';
import { ChainSelector } from '@/components/multichain/ChainSelector';
import { GasComparison } from '@/components/multichain/GasComparison';
import { Bridge } from '@/components/multichain/Bridge';

/**
 * MultiChain - Suporte a múltiplas redes blockchain
 * Funcionalidades:
 * - Seleção de redes
 * - Comparação de taxas de gas
 * - Bridge entre redes
 * - Informações de cada rede
 */

export default function MultiChain() {
  const [selectedChain, setSelectedChain] = useState('ethereum');
  const [showBridge, setShowBridge] = useState(false);

  const chain = SUPPORTED_CHAINS[selectedChain];
  const chains = Object.values(SUPPORTED_CHAINS);

  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Network className="h-10 w-10 text-orange-500" />
            <h1 className="text-4xl font-bold">Multi-Chain</h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            Acesse múltiplas redes blockchain e transfira ativos entre elas
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">Redes Suportadas</span>
              <Network className="h-5 w-5 text-orange-500" />
            </div>
            <p className="text-3xl font-bold text-orange-500">{chains.length}</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">Rede Ativa</span>
              <Zap className="h-5 w-5 text-green-500" />
            </div>
            <p className="text-3xl font-bold text-green-500">{chain.name}</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">Gas Mais Barato</span>
              <TrendingDown className="h-5 w-5 text-blue-500" />
            </div>
            <p className="text-3xl font-bold text-blue-500">Polygon</p>
          </Card>
        </div>

        {/* Chain Selector */}
        <div className="mb-8">
          <Card className="p-6">
            <h2 className="text-xl font-bold mb-4">Selecione a Rede</h2>
            <ChainSelector
              chains={chains}
              selectedChain={selectedChain}
              onSelectChain={setSelectedChain}
            />
          </Card>
        </div>

        {/* Bridge */}
        <div className="mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <ArrowLeftRight className="h-5 w-5 text-orange-500" />
                <h2 className="text-xl font-bold">Bridge</h2>
              </div>
              <button
                onClick={() => setShowBridge(!showBridge)}
                className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
              >
                {showBridge ? 'Ocultar' : 'Transferir Ativos'}
              </button>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Transfira seus ativos entre diferentes redes blockchain com segurança
            </p>
            {showBridge && <Bridge />}
          </Card>
        </div>

        {/* Gas Comparison */}
        <Card className="p-6">
          <h2 className="text-xl font-bold mb-4">Comparação de Taxas (Gas)</h2>
          <GasComparison chains={chains} />
        </Card>
      </div>
    </div>
  );
}
