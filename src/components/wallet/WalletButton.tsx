import { useState } from 'react';
import { Wallet } from 'lucide-react';
import { Button } from '@components/ui';
import { useWallet } from '@contexts';
import { formatAddress } from '@utils';
import { WalletConnect } from './WalletConnect';

/**
 * WalletButton - Connect/disconnect wallet button
 * Shows modal when clicked if not connected
 * Shows truncated address when connected
 */

interface WalletButtonProps {
  variant?: 'default' | 'outline' | 'secondary';
  size?: 'default' | 'sm' | 'lg';
  className?: string;
}

export function WalletButton({ variant = 'default', size = 'default', className }: WalletButtonProps) {
  const { connected, account, connect, disconnect, isConnecting, error: walletError } = useWallet();
  const [showModal, setShowModal] = useState(false);

  const handleClick = () => {
    if (connected) {
      disconnect();
    } else {
      setShowModal(true);
    }
  };

  const handleConnect = async (type: 'metamask' | 'walletconnect' | 'ledger' | 'trezor' | 'coinbase') => {
    try {
      await connect(type as 'metamask' | 'walletconnect' | 'ledger' | 'trezor');
      setShowModal(false);
    } catch (error) {
      // Error is handled by WalletContext and shown in modal
      console.error('Connection error:', error);
    }
  };

  return (
    <>
      <Button
        onClick={handleClick}
        variant={connected ? 'secondary' : variant}
        size={size}
        isLoading={isConnecting}
        className={className}
      >
        <Wallet className="h-4 w-4 mr-2" />
        {connected && account ? formatAddress(account.address) : 'Conectar Carteira'}
      </Button>

      <WalletConnect
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConnect={handleConnect}
        isConnecting={isConnecting}
        error={walletError}
      />
    </>
  );
}
