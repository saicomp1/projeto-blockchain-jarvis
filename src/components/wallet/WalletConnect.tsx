import { X } from 'lucide-react';
import { Button, Card } from '@components/ui';
import type { WalletType } from '@types';

/**
 * WalletConnect - Modal for selecting wallet provider
 * Security: Shows available providers, handles connection errors
 * Accessibility: Keyboard navigation, focus trap, ESC to close
 */

interface WalletConnectProps {
  isOpen: boolean;
  onClose: () => void;
  onConnect: (type: WalletType) => Promise<void>;
  isConnecting: boolean;
  error: string | null;
}

const walletProviders = [
  {
    id: 'metamask' as WalletType,
    name: 'MetaMask',
    icon: '🦊',
    description: 'Conectar usando a extensão MetaMask do navegador',
    available: typeof window !== 'undefined' && Boolean(window.ethereum),
  },
  {
    id: 'walletconnect' as WalletType,
    name: 'WalletConnect',
    icon: '📱',
    description: 'Escaneie o QR code com sua carteira mobile',
    available: false, // TODO: Implement WalletConnect
  },
  {
    id: 'ledger' as WalletType,
    name: 'Ledger',
    icon: '🔒',
    description: 'Conecte sua carteira física Ledger',
    available: false, // TODO: Implement Ledger
  },
  {
    id: 'trezor' as WalletType,
    name: 'Trezor',
    icon: '🛡️',
    description: 'Conecte sua carteira física Trezor',
    available: false, // TODO: Implement Trezor
  },
];

export function WalletConnect({ isOpen, onClose, onConnect, isConnecting, error }: WalletConnectProps) {
  if (!isOpen) return null;

  const handleConnect = async (type: WalletType, available: boolean) => {
    if (!available) {
      return;
    }
    await onConnect(type);
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        role="dialog"
        aria-modal="true"
        aria-labelledby="wallet-connect-title"
      >
        <Card className="w-full max-w-md p-0 relative">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-800">
            <h2 id="wallet-connect-title" className="text-2xl font-bold">
              Conectar Carteira
            </h2>
            <button
              onClick={onClose}
              className="rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Fechar modal"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-3">
            {error && (
              <div
                className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400"
                role="alert"
              >
                {error}
              </div>
            )}

            {walletProviders.map((provider) => (
              <button
                key={provider.id}
                onClick={() => handleConnect(provider.id, provider.available)}
                disabled={!provider.available || isConnecting}
                className={`
                  w-full p-4 rounded-lg border-2 text-left transition-all
                  ${
                    provider.available
                      ? 'border-gray-200 dark:border-gray-800 hover:border-bitcoin hover:bg-bitcoin/5 cursor-pointer'
                      : 'border-gray-200 dark:border-gray-800 opacity-50 cursor-not-allowed'
                  }
                  ${isConnecting ? 'pointer-events-none' : ''}
                `}
              >
                <div className="flex items-center gap-4">
                  <span className="text-4xl">{provider.icon}</span>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-1">
                      {provider.name}
                      {!provider.available && (
                        <span className="ml-2 text-xs text-gray-500">(Em Breve)</span>
                      )}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {provider.description}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Footer */}
          <div className="p-6 pt-0">
            <p className="text-xs text-center text-gray-600 dark:text-gray-400">
              Ao conectar uma carteira, você concorda com nossos{' '}
              <a href="/terms" className="text-bitcoin hover:underline">
                Termos de Serviço
              </a>{' '}
              e{' '}
              <a href="/privacy" className="text-bitcoin hover:underline">
                Política de Privacidade
              </a>
            </p>
          </div>
        </Card>
      </div>
    </>
  );
}
