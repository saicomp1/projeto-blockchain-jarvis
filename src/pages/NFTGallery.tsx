import { useState } from 'react';
import { Image, Grid, List, Filter, Search, Plus } from 'lucide-react';
import { Card } from '@components/ui';
import { Button } from '@components/ui';
import { NFTCard } from '@/components/nft/NFTCard';
import { NFTList } from '@/components/nft/NFTList';
import { NFTFilters } from '@/components/nft/NFTFilters';
import { CreateNFTModal } from '@/components/nft/CreateNFTModal';

/**
 * NFTGallery - Galeria de NFTs do usuário
 * Funcionalidades:
 * - Exibir NFTs da carteira
 * - Criar/Mintar novos NFTs
 * - Filtrar e buscar NFTs
 * - Ver detalhes e histórico
 * - Marketplace (comprar/vender)
 */

export interface NFT {
  id: string;
  name: string;
  description: string;
  image: string;
  collection: string;
  tokenId: string;
  owner: string;
  creator: string;
  price?: number;
  lastSale?: number;
  chain: string;
  attributes?: { trait_type: string; value: string }[];
}

const mockNFTs: NFT[] = [
  {
    id: '1',
    name: 'Jarvis Genesis #0001',
    description: 'O primeiro NFT da coleção Jarvis AI - Assistente fundador da era blockchain',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=400&fit=crop',
    collection: 'Jarvis AI Collection',
    tokenId: '0001',
    owner: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
    creator: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
    price: 5.0,
    lastSale: 3.5,
    chain: 'Ethereum',
    attributes: [
      { trait_type: 'Edition', value: 'Genesis' },
      { trait_type: 'Rarity', value: 'Mythic' },
      { trait_type: 'AI Level', value: 'Supreme' },
    ],
  },
  {
    id: '2',
    name: 'Jarvis Neural Core #0042',
    description: 'Núcleo neural que processa milhões de transações blockchain',
    image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=400&fit=crop',
    collection: 'Jarvis AI Collection',
    tokenId: '0042',
    owner: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
    creator: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
    price: 3.2,
    chain: 'Polygon',
    attributes: [
      { trait_type: 'Type', value: 'Neural Core' },
      { trait_type: 'Rarity', value: 'Legendary' },
      { trait_type: 'Processing Power', value: 'Ultra' },
    ],
  },
  {
    id: '3',
    name: 'Jarvis Crypto Oracle #0088',
    description: 'Oráculo que prevê tendências do mercado cripto com IA avançada',
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=400&fit=crop',
    collection: 'Jarvis AI Collection',
    tokenId: '0088',
    owner: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
    creator: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
    price: 4.2,
    lastSale: 4.8,
    chain: 'Ethereum',
    attributes: [
      { trait_type: 'Type', value: 'Oracle' },
      { trait_type: 'Rarity', value: 'Epic' },
      { trait_type: 'Accuracy', value: '99.7%' },
    ],
  },
  {
    id: '4',
    name: 'Jarvis DeFi Guardian #0156',
    description: 'Guardião inteligente que protege seus ativos DeFi 24/7',
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=400&h=400&fit=crop',
    collection: 'Jarvis AI Collection',
    tokenId: '0156',
    owner: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
    creator: '0x888d35Cc6634C0532925a3b844Bc9e7595f0bEb',
    price: 2.7,
    chain: 'Base',
    attributes: [
      { trait_type: 'Type', value: 'Guardian' },
      { trait_type: 'Rarity', value: 'Rare' },
      { trait_type: 'Protection Level', value: 'Maximum' },
    ],
  },
  {
    id: '5',
    name: 'Jarvis Quantum Trader #0299',
    description: 'Trader quântico que executa milhares de operações por segundo',
    image: 'https://images.unsplash.com/photo-1639322537228-f710d846310a?w=400&h=400&fit=crop',
    collection: 'Jarvis AI Collection',
    tokenId: '0299',
    owner: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
    creator: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
    price: 1.9,
    chain: 'Optimism',
    attributes: [
      { trait_type: 'Type', value: 'Quantum Trader' },
      { trait_type: 'Rarity', value: 'Epic' },
      { trait_type: 'Speed', value: 'Quantum' },
    ],
  },
  {
    id: '6',
    name: 'Jarvis Metaverse Avatar #0777',
    description: 'Avatar exclusivo do Jarvis para interações no metaverso blockchain',
    image: 'https://images.unsplash.com/photo-1677756119517-756a188d2d94?w=400&h=400&fit=crop',
    collection: 'Jarvis AI Collection',
    tokenId: '0777',
    owner: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
    creator: '0x777d35Cc6634C0532925a3b844Bc9e7595f0bEb',
    lastSale: 3.1,
    price: 4.5,
    chain: 'Arbitrum',
    attributes: [
      { trait_type: 'Type', value: 'Metaverse Avatar' },
      { trait_type: 'Rarity', value: 'Legendary' },
      { trait_type: 'Dimension', value: '3D+' },
    ],
  },
];

export default function NFTGallery() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedChain, setSelectedChain] = useState<string>('all');
  const [nfts] = useState<NFT[]>(mockNFTs);

  // Filtrar NFTs
  const filteredNFTs = nfts.filter((nft) => {
    const matchesSearch =
      nft.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      nft.collection.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesChain = selectedChain === 'all' || nft.chain === selectedChain;
    return matchesSearch && matchesChain;
  });

  const totalValue = nfts.reduce((sum, nft) => sum + (nft.price || nft.lastSale || 0), 0);

  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold mb-2 text-white">Galeria NFT</h1>
              <p className="text-gray-400">
                Explore e gerencie sua coleção de NFTs
              </p>
            </div>
            <div className="flex gap-4 items-center">
              <Button onClick={() => setShowCreateModal(true)} className="gap-2">
                <Plus className="h-5 w-5" />
                Criar NFT
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Total de NFTs</p>
                  <p className="text-2xl font-bold text-orange-500">{nfts.length}</p>
                </div>
                <Image className="h-8 w-8 text-orange-500" />
              </div>
            </Card>

            <Card className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Valor Estimado</p>
                  <p className="text-2xl font-bold text-green-500">
                    {totalValue.toFixed(2)} ETH
                  </p>
                </div>
                <div className="text-2xl">💎</div>
              </div>
            </Card>

            <Card className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Coleções</p>
                  <p className="text-2xl font-bold text-blue-500">
                    {new Set(nfts.map((n) => n.collection)).size}
                  </p>
                </div>
                <div className="text-2xl">📚</div>
              </div>
            </Card>
          </div>
        </div>

        {/* Toolbar */}
        <Card className="p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar NFTs por nome ou coleção..."
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
              />
            </div>

            {/* View Mode */}
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-orange-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
                aria-label="Visualização em grade"
              >
                <Grid className="h-5 w-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'list'
                    ? 'bg-orange-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
                aria-label="Visualização em lista"
              >
                <List className="h-5 w-5" />
              </button>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`p-2 rounded-lg transition-colors ${
                  showFilters
                    ? 'bg-orange-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
                aria-label="Filtros"
              >
                <Filter className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Filters */}
          {showFilters && (
            <NFTFilters
              selectedChain={selectedChain}
              onSelectChain={setSelectedChain}
            />
          )}
        </Card>

        {/* NFTs Display */}
        {filteredNFTs.length === 0 ? (
          <div className="text-center py-12">
            <Image className="h-16 w-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Nenhum NFT encontrado</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Tente ajustar os filtros ou busca
            </p>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNFTs.map((nft) => (
              <NFTCard key={nft.id} nft={nft} />
            ))}
          </div>
        ) : (
          <NFTList nfts={filteredNFTs} />
        )}

        {/* Create NFT Modal */}
        {showCreateModal && (
          <CreateNFTModal onClose={() => setShowCreateModal(false)} />
        )}
      </div>
    </div>
  );
}
