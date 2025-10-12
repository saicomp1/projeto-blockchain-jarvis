import { ChainConfig } from '@/config/chains';
import { Check } from 'lucide-react';

/**
 * ChainSelector - Seletor de redes blockchain
 */

interface ChainSelectorProps {
  chains: ChainConfig[];
  selectedChain: string;
  onSelectChain: (chain: string) => void;
}

export function ChainSelector({ chains, selectedChain, onSelectChain }: ChainSelectorProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {chains.map((chain) => {
        const isSelected = selectedChain === chain.name.toLowerCase();
        
        return (
          <button
            key={chain.id}
            onClick={() => onSelectChain(chain.name.toLowerCase())}
            className={`relative p-4 rounded-lg border-2 transition-all hover:scale-105 ${
              isSelected
                ? 'border-orange-500 bg-orange-500/10'
                : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
            }`}
          >
            {isSelected && (
              <div className="absolute top-2 right-2">
                <Check className="h-5 w-5 text-orange-500" />
              </div>
            )}
            
            <div className="flex flex-col items-center gap-2">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold"
                style={{ backgroundColor: `${chain.color}20`, color: chain.color }}
              >
                {chain.symbol.charAt(0)}
              </div>
              <div className="text-center">
                <p className="font-semibold text-sm">{chain.name}</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">{chain.symbol}</p>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}
