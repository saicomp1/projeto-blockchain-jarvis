import { ExternalLink, Heart } from 'lucide-react';
import { Card } from '@components/ui';
import type { NFT } from '@/pages/NFTGallery';

/**
 * NFTList - Lista compacta de NFTs
 */

interface NFTListProps {
  nfts: NFT[];
}

export function NFTList({ nfts }: NFTListProps) {
  const chainColors: Record<string, string> = {
    Ethereum: 'bg-purple-500',
    Polygon: 'bg-purple-600',
    BSC: 'bg-yellow-500',
    Arbitrum: 'bg-blue-500',
    Optimism: 'bg-red-500',
    Base: 'bg-blue-600',
  };

  return (
    <Card className="overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600 dark:text-gray-400">
                NFT
              </th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600 dark:text-gray-400">
                Coleção
              </th>
              <th className="text-center py-3 px-4 text-sm font-semibold text-gray-600 dark:text-gray-400">
                Rede
              </th>
              <th className="text-right py-3 px-4 text-sm font-semibold text-gray-600 dark:text-gray-400">
                Preço
              </th>
              <th className="text-center py-3 px-4 text-sm font-semibold text-gray-600 dark:text-gray-400">
                Ações
              </th>
            </tr>
          </thead>
          <tbody>
            {nfts.map((nft) => (
              <tr
                key={nft.id}
                className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
              >
                {/* NFT Info */}
                <td className="py-4 px-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={nft.image}
                      alt={nft.name}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div>
                      <p className="font-semibold">{nft.name}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">#{nft.tokenId}</p>
                    </div>
                  </div>
                </td>

                {/* Collection */}
                <td className="py-4 px-4">
                  <p className="font-medium">{nft.collection}</p>
                </td>

                {/* Chain */}
                <td className="py-4 px-4">
                  <div className="flex justify-center">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium text-white ${
                        chainColors[nft.chain] || 'bg-gray-500'
                      }`}
                    >
                      {nft.chain}
                    </span>
                  </div>
                </td>

                {/* Price */}
                <td className="py-4 px-4 text-right">
                  {nft.price ? (
                    <p className="font-bold text-orange-500">{nft.price} ETH</p>
                  ) : nft.lastSale ? (
                    <p className="font-medium text-gray-600 dark:text-gray-400">
                      {nft.lastSale} ETH
                    </p>
                  ) : (
                    <p className="text-gray-400">-</p>
                  )}
                </td>

                {/* Actions */}
                <td className="py-4 px-4">
                  <div className="flex items-center justify-center gap-2">
                    <button
                      className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      aria-label="Favoritar"
                    >
                      <Heart className="h-4 w-4" />
                    </button>
                    <button
                      className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      aria-label="Ver detalhes"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
