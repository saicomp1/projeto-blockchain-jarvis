import { useState } from 'react';
import { Send, Copy, ExternalLink } from 'lucide-react';

/**
 * Wallet - Wallet management page
 * Security: Shows balance, allows transactions, never exposes private keys
 */

export default function Wallet() {
  const [sendTo, setSendTo] = useState('');
  const [sendAmount, setSendAmount] = useState('');
  const [isSending, setIsSending] = useState(false);

  // Demo account
  const demoAccount = {
    address: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb4',
    balance: '2.456789',
    chainId: 1
  };

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(demoAccount.address).catch(console.error);
    alert('Endereço copiado para a área de transferência');
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      alert('Transação enviada com sucesso!');
      setSendTo('');
      setSendAmount('');
    }, 2000);
  };

  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">Sua Carteira</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Gerencie seus ativos cripto com segurança
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Wallet Info */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6">Saldo</h2>
            
            <div className="mb-6">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Endereço</p>
              <div className="flex items-center gap-2">
                <code className="text-sm font-mono bg-gray-100 dark:bg-gray-900 px-3 py-2 rounded flex-1">
                  {formatAddress(demoAccount.address)}
                </code>
                <button
                  onClick={handleCopyAddress}
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  aria-label="Copiar endereço"
                >
                  <Copy className="h-4 w-4" />
                </button>
                <a
                  href={`https://etherscan.io/address/${demoAccount.address}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Ver no Etherscan"
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </div>

            <div className="mb-6">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Saldo ETH</p>
              <p className="text-4xl font-bold" style={{ color: '#627EEA' }}>
                {demoAccount.balance} ETH
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                ≈ $4,321.09 USD
              </p>
            </div>

            <div className="mb-6">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Rede</p>
              <p className="text-lg font-medium">
                Ethereum Mainnet
              </p>
            </div>
          </div>

          {/* Send Transaction */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6">Enviar ETH</h2>
            
            <form onSubmit={handleSend} className="space-y-6">
              <div>
                <label htmlFor="sendTo" className="block text-sm font-medium mb-2">
                  Endereço do Destinatário
                </label>
                <input
                  id="sendTo"
                  type="text"
                  value={sendTo}
                  onChange={(e) => setSendTo(e.target.value)}
                  placeholder="0x..."
                  style={{ color: '#ffffff', backgroundColor: '#0f172a' }}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label htmlFor="sendAmount" className="block text-sm font-medium mb-2">
                  Valor (ETH)
                </label>
                <input
                  id="sendAmount"
                  type="number"
                  step="0.000001"
                  value={sendAmount}
                  onChange={(e) => setSendAmount(e.target.value)}
                  placeholder="0.0"
                  style={{ color: '#ffffff', backgroundColor: '#0f172a' }}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isSending}
                className="w-full px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSending ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                    Enviando...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                  Enviar Transação
                </>
              )}
              </button>
            </form>
          </div>
        </div>

        {/* Transaction History */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mt-8">
          <h2 className="text-2xl font-bold mb-6">Transações Recentes</h2>
          
          <div className="space-y-4">
            {[
              { hash: '0x1a2b3c...7d8e9f', type: 'Recebido', amount: '+0.5 ETH', date: '2025-10-12 14:30', status: 'Confirmado' },
              { hash: '0x9f8e7d...3c2b1a', type: 'Enviado', amount: '-0.15 ETH', date: '2025-10-11 09:15', status: 'Confirmado' },
              { hash: '0x5a6b7c...2d3e4f', type: 'Recebido', amount: '+1.2 ETH', date: '2025-10-10 18:45', status: 'Confirmado' },
              { hash: '0x4f3e2d...7c6b5a', type: 'Enviado', amount: '-0.08 ETH', date: '2025-10-09 12:20', status: 'Confirmado' },
            ].map((tx, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-full ${tx.type === 'Recebido' ? 'bg-green-100 dark:bg-green-900' : 'bg-red-100 dark:bg-red-900'}`}>
                    {tx.type === 'Recebido' ? (
                      <span className="text-green-600 dark:text-green-400">↓</span>
                    ) : (
                      <span className="text-red-600 dark:text-red-400">↑</span>
                    )}
                  </div>
                  <div>
                    <p className="font-medium">{tx.type}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{tx.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-bold ${tx.type === 'Recebido' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                    {tx.amount}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {tx.hash}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
