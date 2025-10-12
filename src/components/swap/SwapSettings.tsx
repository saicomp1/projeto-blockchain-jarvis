/**
 * SwapSettings - Configurações de slippage e timeout
 */

interface SwapSettingsProps {
  slippage: number;
  setSlippage: (value: number) => void;
}

const presetSlippages = [0.1, 0.5, 1.0, 3.0];

export function SwapSettings({ slippage, setSlippage }: SwapSettingsProps) {
  return (
    <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">
          Tolerância de Slippage
        </label>
        <div className="flex gap-2 mb-2">
          {presetSlippages.map((preset) => (
            <button
              key={preset}
              onClick={() => setSlippage(preset)}
              className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                slippage === preset
                  ? 'bg-orange-500 text-white'
                  : 'bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600'
              }`}
            >
              {preset}%
            </button>
          ))}
        </div>
        <div className="relative">
          <input
            type="number"
            value={slippage}
            onChange={(e) => setSlippage(parseFloat(e.target.value) || 0)}
            className="w-full px-3 py-2 rounded-lg bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
            placeholder="Customizado"
            step="0.1"
            min="0"
            max="50"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">%</span>
        </div>
        <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
          Sua transação será revertida se o preço mudar desfavoravelmente mais que esta porcentagem
        </p>
      </div>

      {slippage > 5 && (
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-3">
          <p className="text-sm text-yellow-900 dark:text-yellow-200">
            ⚠️ <strong>Atenção:</strong> Slippage alto pode resultar em perdas significativas
          </p>
        </div>
      )}
    </div>
  );
}
