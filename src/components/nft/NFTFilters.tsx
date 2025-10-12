/**
 * NFTFilters - Filtros para a galeria de NFTs
 */

interface NFTFiltersProps {
  selectedChain: string;
  onSelectChain: (chain: string) => void;
}

const chains = [
  { id: 'all', name: 'Todas as Redes' },
  { id: 'Ethereum', name: 'Ethereum' },
  { id: 'Polygon', name: 'Polygon' },
  { id: 'BSC', name: 'BSC' },
  { id: 'Arbitrum', name: 'Arbitrum' },
  { id: 'Optimism', name: 'Optimism' },
  { id: 'Base', name: 'Base' },
];

export function NFTFilters({ selectedChain, onSelectChain }: NFTFiltersProps) {
  return (
    <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
      <div>
        <label className="block text-sm font-medium mb-2">Filtrar por Rede</label>
        <div className="flex flex-wrap gap-2">
          {chains.map((chain) => (
            <button
              key={chain.id}
              onClick={() => onSelectChain(chain.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedChain === chain.id
                  ? 'bg-orange-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {chain.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
