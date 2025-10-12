import { useState } from 'react';
import { Send, AlertCircle } from 'lucide-react';
import { Button, Input } from '@components/ui';
import { useWallet, useToast } from '@contexts';
import { ethers } from 'ethers';

/**
 * TransactionForm - Form for sending ETH transactions
 * Security: Validates addresses, amounts, gas estimation
 * UX: Real-time validation, gas price display
 */

interface TransactionFormProps {
  onSuccess?: () => void;
}

export function TransactionForm({ onSuccess }: TransactionFormProps) {
  const { account, sendTransaction } = useWallet();
  const { success, error: showError } = useToast();

  const [formData, setFormData] = useState({
    to: '',
    amount: '',
    gasLimit: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [estimatedGas, setEstimatedGas] = useState<string | null>(null);

  // Validate address
  const validateAddress = (address: string): boolean => {
    if (!address) {
      setErrors((prev) => ({ ...prev, to: 'Endereço do destinatário é obrigatório' }));
      return false;
    }
    if (!ethers.isAddress(address)) {
      setErrors((prev) => ({ ...prev, to: 'Endereço Ethereum inválido' }));
      return false;
    }
    setErrors((prev) => ({ ...prev, to: '' }));
    return true;
  };

  // Validate amount
  const validateAmount = (amount: string): boolean => {
    if (!amount) {
      setErrors((prev) => ({ ...prev, amount: 'Valor é obrigatório' }));
      return false;
    }
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      setErrors((prev) => ({ ...prev, amount: 'Valor deve ser maior que 0' }));
      return false;
    }
    
    // Check if user has enough balance
    if (account?.balance) {
      const balanceInEth = parseFloat(ethers.formatEther(account.balance));
      if (numAmount > balanceInEth) {
        setErrors((prev) => ({ ...prev, amount: 'Saldo insuficiente' }));
        return false;
      }
    }
    
    setErrors((prev) => ({ ...prev, amount: '' }));
    return true;
  };

  // Estimate gas on address/amount change
  const handleEstimateGas = async () => {
    if (!formData.to || !formData.amount || !window.ethereum) return;
    
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const gasEstimate = await provider.estimateGas({
        to: formData.to,
        value: ethers.parseEther(formData.amount),
      });
      setEstimatedGas(ethers.formatEther(gasEstimate));
    } catch (error) {
      console.error('Gas estimation failed:', error);
      setEstimatedGas(null);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }

    // Estimate gas when to/amount changes
    if (field === 'to' || field === 'amount') {
      setTimeout(handleEstimateGas, 500);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields
    const isAddressValid = validateAddress(formData.to);
    const isAmountValid = validateAmount(formData.amount);

    if (!isAddressValid || !isAmountValid) {
      return;
    }

    setIsSubmitting(true);

    try {
      const txHash = await sendTransaction({
        to: formData.to,
        value: formData.amount,
        gasLimit: formData.gasLimit || undefined,
      });

      success(`Transação enviada! Hash: ${txHash.slice(0, 10)}...`);
      
      // Reset form
      setFormData({ to: '', amount: '', gasLimit: '' });
      setEstimatedGas(null);
      
      onSuccess?.();
    } catch (error) {
      console.error('Transaction failed:', error);
      showError(error instanceof Error ? error.message : 'Transação falhou');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Recipient Address */}
      <div>
        <label htmlFor="tx-to" className="block text-sm font-medium mb-2">
          Endereço do Destinatário
        </label>
        <Input
          id="tx-to"
          type="text"
          value={formData.to}
          onChange={(e) => handleChange('to', e.target.value)}
          onBlur={() => validateAddress(formData.to)}
          placeholder="0x..."
          className={errors.to ? 'border-red-500 focus:ring-red-500' : ''}
        />
        {errors.to && (
          <p className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
            <AlertCircle className="h-4 w-4" />
            {errors.to}
          </p>
        )}
      </div>

      {/* Amount */}
      <div>
        <label htmlFor="tx-amount" className="block text-sm font-medium mb-2">
          Valor (ETH)
        </label>
        <Input
          id="tx-amount"
          type="number"
          step="0.000001"
          value={formData.amount}
          onChange={(e) => handleChange('amount', e.target.value)}
          onBlur={() => validateAmount(formData.amount)}
          placeholder="0.0"
          className={errors.amount ? 'border-red-500 focus:ring-red-500' : ''}
        />
        {errors.amount && (
          <p className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
            <AlertCircle className="h-4 w-4" />
            {errors.amount}
          </p>
        )}
        {account?.balance && !errors.amount && (
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Disponível: {parseFloat(ethers.formatEther(account.balance)).toFixed(6)} ETH
          </p>
        )}
      </div>

      {/* Gas Limit (Optional) */}
      <div>
        <label htmlFor="tx-gas" className="block text-sm font-medium mb-2">
          Limite de Gas (Opcional)
        </label>
        <Input
          id="tx-gas"
          type="number"
          value={formData.gasLimit}
          onChange={(e) => handleChange('gasLimit', e.target.value)}
          placeholder="Calculado automaticamente"
        />
        {estimatedGas && (
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Gas estimado: ~{parseFloat(estimatedGas).toFixed(6)} ETH
          </p>
        )}
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        isLoading={isSubmitting}
        disabled={!!errors.to || !!errors.amount}
        className="w-full"
      >
        <Send className="mr-2 h-4 w-4" />
        {isSubmitting ? 'Enviando...' : 'Enviar Transação'}
      </Button>

      {/* Security Note */}
      <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
        <p className="text-sm text-blue-600 dark:text-blue-400">
          <strong>Dica de Segurança:</strong> Sempre verifique duas vezes o endereço do destinatário antes de enviar.
          Transações na blockchain não podem ser revertidas.
        </p>
      </div>
    </form>
  );
}
