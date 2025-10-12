import { useState } from 'react';
import { ExternalLink, Heart, ShoppingCart } from 'lucide-react';
import { Card } from '@components/ui';
import { Button } from '@components/ui';
import type { NFT } from '@/pages/NFTGallery';

/**
 * NFTCard - Card de NFT com preview e ações
 */

interface NFTCardProps {
  nft: NFT;
}

export function NFTCard({ nft }: NFTCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const chainColors: Record<string, string> = {
    Ethereum: 'bg-purple-500',
    Polygon: 'bg-purple-600',
    BSC: 'bg-yellow-500',
    Arbitrum: 'bg-blue-500',
    Optimism: 'bg-red-500',
    Base: 'bg-blue-600',
  };

  return (
    <Card className="overflow-hidden group hover:shadow-xl transition-shadow">
      {/* Image */}
      <div className="relative aspect-square bg-gray-100 dark:bg-gray-800 overflow-hidden">
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
          </div>
        )}
        <img
          src={nft.image}
          alt={nft.name}
          className={`w-full h-full object-cover group-hover:scale-110 transition-transform duration-300 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImageLoaded(true)}
        />
        
        {/* Chain Badge */}
        <div className="absolute top-2 left-2">
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium text-white ${
              chainColors[nft.chain] || 'bg-gray-500'
            }`}
          >
            {nft.chain}
          </span>
        </div>

        {/* Like Button */}
        <button
          onClick={() => setIsLiked(!isLiked)}
          className="absolute top-2 right-2 p-2 rounded-full bg-white/90 dark:bg-gray-800/90 hover:bg-white dark:hover:bg-gray-800 transition-colors"
          aria-label="Favoritar"
        >
          <Heart
            className={`h-5 w-5 ${
              isLiked ? 'fill-red-500 text-red-500' : 'text-gray-600 dark:text-gray-400'
            }`}
          />
        </button>

        {/* Quick Actions Overlay */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
          <Button size="sm" variant="secondary" className="gap-2">
            <ExternalLink className="h-4 w-4" />
            Ver Detalhes
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Collection */}
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{nft.collection}</p>
        
        {/* Name */}
        <h3 className="font-bold text-lg mb-2 truncate">{nft.name}</h3>

        {/* Price */}
        <div className="flex items-center justify-between mb-3">
          {nft.price ? (
            <div>
              <p className="text-xs text-gray-600 dark:text-gray-400">Preço</p>
              <p className="font-bold text-orange-500">{nft.price} ETH</p>
            </div>
          ) : nft.lastSale ? (
            <div>
              <p className="text-xs text-gray-600 dark:text-gray-400">Última venda</p>
              <p className="font-bold text-gray-900 dark:text-gray-100">{nft.lastSale} ETH</p>
            </div>
          ) : (
            <div>
              <p className="text-xs text-gray-600 dark:text-gray-400">Sem preço</p>
              <p className="font-bold text-gray-900 dark:text-gray-100">-</p>
            </div>
          )}

          {nft.price && (
            <Button size="sm" className="gap-2">
              <ShoppingCart className="h-4 w-4" />
              Comprar
            </Button>
          )}
        </div>

        {/* Attributes */}
        {nft.attributes && nft.attributes.length > 0 && (
          <div className="flex gap-2 flex-wrap">
            {nft.attributes.slice(0, 2).map((attr, index) => (
              <span
                key={index}
                className="px-2 py-1 rounded-lg bg-gray-100 dark:bg-gray-800 text-xs"
              >
                {attr.value}
              </span>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
}
