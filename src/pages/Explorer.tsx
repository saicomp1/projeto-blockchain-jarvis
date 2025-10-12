import { useState } from 'react';
import { Search } from 'lucide-react';
import { Button, Card, Input } from '@components/ui';

/**
 * Explorer - Blockchain explorer page
 * Search for transactions, blocks, addresses
 */

export default function Explorer() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState<'tx' | 'block' | 'address'>('tx');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement blockchain search
    console.log('Procurando por:', searchType, searchQuery);
  };

  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Explorador Blockchain</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Pesquise transações, blocos e endereços na blockchain Ethereum.
          </p>
        </div>

        {/* Search */}
        <Card className="p-8 mb-12">
          <form onSubmit={handleSearch} className="space-y-6">
            <div className="flex gap-4 mb-4">
              <button
                type="button"
                onClick={() => setSearchType('tx')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  searchType === 'tx'
                    ? 'bg-bitcoin text-white'
                    : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                Transação
              </button>
              <button
                type="button"
                onClick={() => setSearchType('block')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  searchType === 'block'
                    ? 'bg-bitcoin text-white'
                    : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                Bloco
              </button>
              <button
                type="button"
                onClick={() => setSearchType('address')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  searchType === 'address'
                    ? 'bg-bitcoin text-white'
                    : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                Endereço
              </button>
            </div>

            <div className="flex gap-4">
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={
                  searchType === 'tx'
                    ? 'Hash da transação (0x...)'
                    : searchType === 'block'
                    ? 'Número ou hash do bloco'
                    : 'Endereço (0x...)'
                }
                className="flex-1"
              />
              <Button type="submit">
                <Search className="h-4 w-4 mr-2" />
                Pesquisar
              </Button>
            </div>
          </form>
        </Card>

        {/* Latest Blocks */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="p-8">
            <h2 className="text-2xl font-bold mb-6">Blocos Recentes</h2>
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center p-4 rounded-lg bg-gray-50 dark:bg-gray-800"
                >
                  <div>
                    <p className="font-mono text-sm text-bitcoin">Bloco #{18500000 - i}</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                      {i === 0 ? 'Agora mesmo' : `Há ${i} min`}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{100 + i} transações</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      Taxa: 0.05 ETH
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-6 text-sm text-center text-gray-600 dark:text-gray-400">
              Dados fictícios. Integração com Ethereum JSON-RPC em breve.
            </p>
          </Card>

          <Card className="p-8">
            <h2 className="text-2xl font-bold mb-6">Transações Recentes</h2>
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center p-4 rounded-lg bg-gray-50 dark:bg-gray-800"
                >
                  <div className="flex-1 overflow-hidden">
                    <p className="font-mono text-sm text-ethereum truncate">
                      0x{Math.random().toString(16).substring(2, 18)}...
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                      De 0x{Math.random().toString(16).substring(2, 8)}... para 0x{Math.random().toString(16).substring(2, 8)}...
                    </p>
                  </div>
                  <div className="text-right ml-4">
                    <p className="text-sm font-medium">{(Math.random() * 10).toFixed(4)} ETH</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      {i === 0 ? 'Agora mesmo' : `Há ${i} min`}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-6 text-sm text-center text-gray-600 dark:text-gray-400">
              Dados fictícios. Integração com Ethereum JSON-RPC em breve.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
