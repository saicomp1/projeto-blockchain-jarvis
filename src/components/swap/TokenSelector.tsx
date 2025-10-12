import { useState } from 'react';
import { ChevronDown, Search, X } from 'lucide-react';

/**
 * TokenSelector - Seletor de tokens para swap
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

interface TokenSelectorProps {
  selectedToken: Token;
  onSelectToken: (token: Token) => void;
  tokens: Token[];
  excludeToken?: Token;
}

export function TokenSelector({ selectedToken, onSelectToken, tokens, excludeToken }: TokenSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTokens = tokens.filter(
    (token) =>
      token.address !== excludeToken?.address &&
      (token.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
        token.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleSelectToken = (token: Token) => {
    onSelectToken(token);
    setIsOpen(false);
    setSearchQuery('');
  };

  return (
    <div className="relative">
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors border border-gray-200 dark:border-gray-600"
      >
        <div className="w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center text-sm font-bold">
          {selectedToken.symbol.charAt(0)}
        </div>
        <span className="font-semibold">{selectedToken.symbol}</span>
        <ChevronDown className="h-4 w-4" />
      </button>

      {/* Dropdown Modal */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Modal */}
          <div className="fixed inset-x-4 top-1/2 -translate-y-1/2 md:absolute md:inset-x-auto md:top-full md:translate-y-2 md:right-0 md:w-96 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 z-50 max-h-[500px] flex flex-col">
            {/* Header */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold">Selecione um Token</h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar por nome ou símbolo"
                  className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                  autoFocus
                />
              </div>
            </div>

            {/* Token List */}
            <div className="flex-1 overflow-y-auto p-2">
              {filteredTokens.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  Nenhum token encontrado
                </div>
              ) : (
                <div className="space-y-1">
                  {filteredTokens.map((token) => (
                    <button
                      key={token.address}
                      onClick={() => handleSelectToken(token)}
                      className={`w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                        token.address === selectedToken.address
                          ? 'bg-orange-50 dark:bg-orange-900/20'
                          : ''
                      }`}
                    >
                      <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center text-lg font-bold">
                        {token.symbol.charAt(0)}
                      </div>
                      <div className="flex-1 text-left">
                        <p className="font-semibold">{token.symbol}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{token.name}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{token.balance?.toFixed(4) || '0.0000'}</p>
                        {token.price && (
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            ${token.price.toLocaleString('pt-BR')}
                          </p>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
