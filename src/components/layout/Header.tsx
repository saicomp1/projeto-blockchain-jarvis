import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Wallet, Moon, Sun } from 'lucide-react';
import { Button } from '@components/ui';
import { useWallet, useTheme } from '@contexts';
import { formatAddress } from '@utils';

/**
 * Header - Navigation with wallet connect
 * Security: Shows truncated address, never full private keys
 * Accessibility: Keyboard navigation, ARIA labels
 */

  const navigation = [
    { name: 'Início', href: '/' },
    { name: 'Portfólio', href: '/portfolio' },
    { name: 'Swap', href: '/swap' },
    { name: 'NFTs', href: '/nft' },
    { name: 'Staking', href: '/staking' },
    { name: 'Lending', href: '/lending' },
    { name: 'Social', href: '/social' },
    { name: 'Segurança', href: '/security' },
    { name: 'Educação', href: '/education' },
  ];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const wallet = useWallet();
  const theme = useTheme();
  
  const connected = wallet?.connected ?? false;
  const account = wallet?.account ?? null;
  const connect = wallet?.connect ?? (() => Promise.resolve());
  const disconnect = wallet?.disconnect ?? (() => {});
  const isConnecting = wallet?.isConnecting ?? false;
  
  const effectiveTheme = theme?.effectiveTheme ?? 'light';
  const setTheme = theme?.setTheme ?? (() => {});

  const handleWalletClick = () => {
    if (connected) {
      disconnect();
    } else {
      connect('metamask').catch((error) => {
        console.error('Failed to connect wallet:', error);
      });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Main navigation">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-bitcoin">
              <Wallet className="h-8 w-8" />
              <span>Jarvis</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:gap-x-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-bitcoin dark:hover:text-bitcoin transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Theme Toggle & Wallet Button */}
          <div className="flex items-center gap-4">
            {/* Theme Toggle Button */}
            <button
              onClick={() => setTheme(effectiveTheme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors neon-glow"
              aria-label="Alternar tema"
            >
              {effectiveTheme === 'dark' ? (
                <Sun className="h-5 w-5 text-primary" />
              ) : (
                <Moon className="h-5 w-5 text-gray-700" />
              )}
            </button>

            <Button
              onClick={handleWalletClick}
              isLoading={isConnecting}
              variant={connected ? 'secondary' : 'default'}
              size="sm"
              className="hidden md:flex"
            >
              {connected ? (
                <>
                  <Wallet className="h-4 w-4 mr-2" />
                  {formatAddress(account?.address || '')}
                </>
              ) : (
                <>
                  <Wallet className="h-4 w-4 mr-2" />
                  Conectar Carteira
                </>
              )}
            </Button>

            {/* Mobile menu button */}
            <button
              type="button"
              className="md:hidden rounded-md p-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle mobile menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-2" role="menu">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-bitcoin transition-colors"
                onClick={() => setMobileMenuOpen(false)}
                role="menuitem"
              >
                {item.name}
              </Link>
            ))}
            
            {/* Mobile Wallet Button */}
            <div className="pt-2 border-t border-gray-200 dark:border-gray-800">
              <Button
                onClick={handleWalletClick}
                isLoading={isConnecting}
                variant={connected ? 'secondary' : 'default'}
                size="sm"
                className="w-full"
              >
                {connected ? (
                  <>
                    <Wallet className="h-4 w-4 mr-2" />
                    {formatAddress(account?.address || '')}
                  </>
                ) : (
                  <>
                    <Wallet className="h-4 w-4 mr-2" />
                    Conectar Carteira
                  </>
                )}
              </Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
