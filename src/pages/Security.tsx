import { useState } from 'react';
import { Shield, CheckCircle, AlertTriangle, Eye, FileCheck, Lock, Key, AlertCircle, ExternalLink } from 'lucide-react';

interface ContractCheck {
  category: string;
  passed: boolean;
  description: string;
}

interface WhitelistAddress {
  id: string;
  address: string;
  label: string;
  addedDate: string;
  chain: string;
}

interface SimulatedTx {
  from: string;
  to: string;
  value: string;
  data: string;
  gasEstimate: string;
  riskLevel: 'low' | 'medium' | 'high';
  warnings: string[];
}

export default function Security() {
  const [activeTab, setActiveTab] = useState<'contract' | 'whitelist' | 'simulator' | '2fa'>('contract');
  const [contractAddress, setContractAddress] = useState('0x1234567890123456789012345678901234567890');
  const [isVerifying, setIsVerifying] = useState(false);
  
  // Resultado da verificação já carregado
  const [verificationResult, setVerificationResult] = useState<ContractCheck[] | null>([
    { category: 'Código Verificado', passed: true, description: 'Código fonte verificado no Etherscan em 15/03/2024 | Compilador: Solidity 0.8.19' },
    { category: 'Sem Funções Maliciosas', passed: true, description: 'Análise estática aprovada - Nenhuma função de mint ilimitado, honeypot ou rugpull detectada' },
    { category: 'Ownership Renunciado', passed: false, description: 'Owner: 0x1234...5678 ainda possui privilégios de pausar contrato e modificar taxas (Risco Médio)' },
    { category: 'Sem Backdoors', passed: true, description: 'Nenhuma função de acesso privilegiado oculta ou delegatecall não autorizado encontrado' },
    { category: 'Taxas Razoáveis', passed: true, description: 'Taxa de compra: 2% | Taxa de venda: 3% | Dentro dos padrões de mercado aceitáveis' },
    { category: 'Liquidez Bloqueada', passed: true, description: 'Liquidez de $2.5M bloqueada na Unicrypt até 15/09/2024 (6 meses restantes)' },
    { category: 'Auditoria Profissional', passed: false, description: 'Nenhuma auditoria de CertiK, PeckShield ou Hacken encontrada | Recomendado antes de investir' },
    { category: 'Timelock Implementado', passed: true, description: 'Timelock de 24h para mudanças críticas | Owner não pode executar ações imediatamente' },
    { category: 'Teste de Honeypot', passed: true, description: 'Simulação de compra/venda bem-sucedida | Contrato permite vendas normalmente' },
    { category: 'Anti-Whale Proteção', passed: true, description: 'Limite máximo de transação: 2% do supply total | Protege contra dumping' },
  ]);
  
  const [newAddress, setNewAddress] = useState('');
  const [newLabel, setNewLabel] = useState('');
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [showQRCode, setShowQRCode] = useState(false);

  // Mock whitelist com endereços fictícios verificados
  const [whitelist, setWhitelist] = useState<WhitelistAddress[]>([
    {
      id: '1',
      address: '0x742d35Cc6634C0532925a3b844Bc9e7595f0Bc8',
      label: 'Ledger Hardware Wallet Principal',
      addedDate: '2024-01-15',
      chain: 'Ethereum',
    },
    {
      id: '2',
      address: '0xA1b2C3d4E5F6789012345678901234567890DeF',
      label: 'Binance Exchange - Hot Wallet',
      addedDate: '2024-02-20',
      chain: 'BSC',
    },
    {
      id: '3',
      address: '0x5E3c7F8a9B1C2D3e4F5A6B7C8D9E0F1A2B3C7Aa1',
      label: 'Wallet Multisig Família (3/5)',
      addedDate: '2024-03-10',
      chain: 'Polygon',
    },
    {
      id: '4',
      address: '0x9F2c8D7e6B5A4C3B2A1098765432109876DeAd',
      label: 'Coinbase Custody - Cold Storage',
      addedDate: '2024-04-05',
      chain: 'Ethereum',
    },
    {
      id: '5',
      address: '0xE8f7D6C5B4A3210987654321FeDcBa0987654321',
      label: 'MetaMask Mobile - Backup',
      addedDate: '2024-05-12',
      chain: 'Arbitrum',
    },
  ]);

  // Mock simulation result já carregado
  const [simulationResult, setSimulationResult] = useState<SimulatedTx | null>({
    from: '0x742d35Cc6634C0532925a3b844Bc9e7595f0Bc8',
    to: '0x1234567890123456789012345678901234567890',
    value: '1.5 ETH ($4,125.00)',
    data: '0xa9059cbb000000000000000000000000742d35Cc6634C0532925a3b844Bc9e7595f0Bc8',
    gasEstimate: '~47,852 gas (~$13.42 a 35 Gwei)',
    riskLevel: 'medium',
    warnings: [
      '⚠️ Contrato não verificado no Etherscan - Código fonte não disponível para auditoria',
      '⚠️ Valor alto sendo transferido - $4,125.00 em uma única transação (considere dividir)',
      '⚠️ Contrato criado há 18 dias (12/09/2024) - Risco de projeto novo sem histórico',
      '⚠️ Endereço destino teve apenas 12 transações - Volume baixo pode indicar teste ou scam',
      '⚠️ Função "approve" ilimitada detectada - Contrato pode gastar todos seus tokens',
    ],
  });

  const handleVerifyContract = async () => {
    setIsVerifying(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const mockResults: ContractCheck[] = [
      { category: 'Código Verificado', passed: true, description: 'Código fonte verificado no Etherscan em 15/03/2024 | Compilador: Solidity 0.8.19' },
      { category: 'Sem Funções Maliciosas', passed: true, description: 'Análise estática aprovada - Nenhuma função de mint ilimitado, honeypot ou rugpull detectada' },
      { category: 'Ownership Renunciado', passed: false, description: 'Owner: 0x1234...5678 ainda possui privilégios de pausar contrato e modificar taxas (Risco Médio)' },
      { category: 'Sem Backdoors', passed: true, description: 'Nenhuma função de acesso privilegiado oculta ou delegatecall não autorizado encontrado' },
      { category: 'Taxas Razoáveis', passed: true, description: 'Taxa de compra: 2% | Taxa de venda: 3% | Dentro dos padrões de mercado aceitáveis' },
      { category: 'Liquidez Bloqueada', passed: true, description: 'Liquidez de $2.5M bloqueada na Unicrypt até 15/09/2024 (6 meses restantes)' },
      { category: 'Auditoria Profissional', passed: false, description: 'Nenhuma auditoria de CertiK, PeckShield ou Hacken encontrada | Recomendado antes de investir' },
      { category: 'Timelock Implementado', passed: true, description: 'Timelock de 24h para mudanças críticas | Owner não pode executar ações imediatamente' },
      { category: 'Teste de Honeypot', passed: true, description: 'Simulação de compra/venda bem-sucedida | Contrato permite vendas normalmente' },
      { category: 'Anti-Whale Proteção', passed: true, description: 'Limite máximo de transação: 2% do supply total | Protege contra dumping' },
    ];

    setVerificationResult(mockResults);
    setIsVerifying(false);
  };

  const handleAddToWhitelist = () => {
    if (!newAddress || !newLabel) return;

    const newEntry: WhitelistAddress = {
      id: Date.now().toString(),
      address: newAddress,
      label: newLabel,
      addedDate: new Date().toISOString().split('T')[0],
      chain: 'Ethereum',
    };

    setWhitelist([...whitelist, newEntry]);
    setNewAddress('');
    setNewLabel('');
  };

  const handleRemoveFromWhitelist = (id: string) => {
    setWhitelist(whitelist.filter((item) => item.id !== id));
  };

  const handleSimulateTransaction = () => {
    const mockSimulation: SimulatedTx = {
      from: '0x742d35Cc6634C0532925a3b844Bc9e7595f0Bc8',
      to: '0x1234567890123456789012345678901234567890',
      value: '1.5 ETH ($4,125.00)',
      data: '0xa9059cbb000000000000000000000000742d35Cc6634C0532925a3b844Bc9e7595f0Bc8',
      gasEstimate: '~47,852 gas (~$13.42 a 35 Gwei)',
      riskLevel: 'medium',
      warnings: [
        '⚠️ Contrato não verificado no Etherscan - Código fonte não disponível para auditoria',
        '⚠️ Valor alto sendo transferido - $4,125.00 em uma única transação (considere dividir)',
        '⚠️ Contrato criado há 18 dias (12/09/2024) - Risco de projeto novo sem histórico',
        '⚠️ Endereço destino teve apenas 12 transações - Volume baixo pode indicar teste ou scam',
        '⚠️ Função "approve" ilimitada detectada - Contrato pode gastar todos seus tokens',
      ],
    };

    setSimulationResult(mockSimulation);
  };

  const enable2FA = () => {
    setShowQRCode(true);
  };

  const confirm2FA = () => {
    setTwoFactorEnabled(true);
    setShowQRCode(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900 pt-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Ferramentas de Segurança</h1>
          <p className="text-gray-400">
            Proteja seus ativos com verificação de contratos, whitelist e autenticação de dois fatores
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto">
          <button
            onClick={() => setActiveTab('contract')}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-colors whitespace-nowrap ${
              activeTab === 'contract'
                ? 'bg-orange-500 text-white'
                : 'bg-navy-800/50 text-gray-400 hover:bg-navy-700/50'
            }`}
          >
            <FileCheck className="w-5 h-5" />
            Verificador de Contratos
          </button>
          <button
            onClick={() => setActiveTab('whitelist')}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-colors whitespace-nowrap ${
              activeTab === 'whitelist'
                ? 'bg-orange-500 text-white'
                : 'bg-navy-800/50 text-gray-400 hover:bg-navy-700/50'
            }`}
          >
            <Shield className="w-5 h-5" />
            Whitelist
          </button>
          <button
            onClick={() => setActiveTab('simulator')}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-colors whitespace-nowrap ${
              activeTab === 'simulator'
                ? 'bg-orange-500 text-white'
                : 'bg-navy-800/50 text-gray-400 hover:bg-navy-700/50'
            }`}
          >
            <Eye className="w-5 h-5" />
            Simulador de Transações
          </button>
          <button
            onClick={() => setActiveTab('2fa')}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-colors whitespace-nowrap ${
              activeTab === '2fa'
                ? 'bg-orange-500 text-white'
                : 'bg-navy-800/50 text-gray-400 hover:bg-navy-700/50'
            }`}
          >
            <Lock className="w-5 h-5" />
            Autenticação 2FA
          </button>
        </div>

        {/* Verificador de Contratos */}
        {activeTab === 'contract' && (
          <div className="space-y-6">
            <div className="bg-navy-800/50 backdrop-blur-sm rounded-xl border border-navy-700 p-6">
              <h2 className="text-xl font-bold text-white mb-4">Verificar Smart Contract</h2>
              <p className="text-gray-400 mb-6">
                Analise a segurança de um contrato inteligente antes de interagir com ele
              </p>

              <div className="space-y-4">
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Endereço do Contrato</label>
                  <input
                    type="text"
                    value={contractAddress}
                    onChange={(e) => setContractAddress(e.target.value)}
                    placeholder="0x..."
                    className="w-full bg-navy-900 border border-navy-700 rounded-lg px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-orange-500 font-mono"
                    style={{ color: '#ffffff', backgroundColor: '#0f172a' }}
                  />
                </div>

                <button
                  onClick={() => { handleVerifyContract().catch(console.error); }}
                  disabled={!contractAddress || isVerifying}
                  className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isVerifying ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                      Verificando...
                    </>
                  ) : (
                    <>
                      <FileCheck className="w-5 h-5" />
                      Verificar Contrato
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Verification Results */}
            {verificationResult && (
              <div className="bg-navy-800/50 backdrop-blur-sm rounded-xl border border-navy-700 p-6">
                <div className="flex items-center gap-3 mb-6">
                  <Shield className="w-8 h-8 text-orange-400" />
                  <div>
                    <h3 className="text-xl font-bold text-white">Resultado da Análise</h3>
                    <p className="text-gray-400 text-sm">
                      {verificationResult.filter((r) => r.passed).length} de {verificationResult.length} verificações
                      aprovadas
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  {verificationResult.map((check, index) => (
                    <div
                      key={index}
                      className={`flex items-start gap-3 p-4 rounded-lg ${
                        check.passed ? 'bg-green-500/10 border border-green-500/30' : 'bg-red-500/10 border border-red-500/30'
                      }`}
                    >
                      {check.passed ? (
                        <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                      ) : (
                        <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                      )}
                      <div>
                        <p className={`font-semibold ${check.passed ? 'text-green-400' : 'text-red-400'}`}>
                          {check.category}
                        </p>
                        <p className={`text-sm ${check.passed ? 'text-green-300' : 'text-red-300'}`}>
                          {check.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t border-navy-700">
                  <div className="flex items-start gap-3 text-sm text-gray-400">
                    <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <p>
                      Esta análise é automatizada e serve como orientação inicial. Sempre faça sua própria pesquisa (DYOR)
                      e consulte auditorias profissionais quando disponíveis.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Whitelist */}
        {activeTab === 'whitelist' && (
          <div className="space-y-6">
            {/* Add Address */}
            <div className="bg-navy-800/50 backdrop-blur-sm rounded-xl border border-navy-700 p-6">
              <h2 className="text-xl font-bold text-white mb-4">Adicionar Endereço Confiável</h2>
              <p className="text-gray-400 mb-6">
                Mantenha uma lista de endereços confiáveis para transações mais seguras
              </p>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Endereço</label>
                  <input
                    type="text"
                    value={newAddress}
                    onChange={(e) => setNewAddress(e.target.value)}
                    placeholder="0x..."
                    className="w-full bg-navy-900 border border-navy-700 rounded-lg px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-orange-500 font-mono"
                    style={{ color: '#ffffff', backgroundColor: '#0f172a' }}
                  />
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Etiqueta</label>
                  <input
                    type="text"
                    value={newLabel}
                    onChange={(e) => setNewLabel(e.target.value)}
                    placeholder="Ex: Minha carteira secundária"
                    className="w-full bg-navy-900 border border-navy-700 rounded-lg px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-orange-500"
                    style={{ color: '#ffffff', backgroundColor: '#0f172a' }}
                  />
                </div>
              </div>

              <button
                onClick={handleAddToWhitelist}
                disabled={!newAddress || !newLabel}
                className="mt-4 w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Adicionar à Whitelist
              </button>
            </div>

            {/* Whitelist Table */}
            <div className="bg-navy-800/50 backdrop-blur-sm rounded-xl border border-navy-700 overflow-hidden">
              <div className="p-6 border-b border-navy-700">
                <h2 className="text-xl font-bold text-white">Endereços Confiáveis ({whitelist.length})</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-navy-800/80">
                    <tr className="text-gray-400 text-sm">
                      <th className="text-left p-4">Etiqueta</th>
                      <th className="text-left p-4">Endereço</th>
                      <th className="text-left p-4">Rede</th>
                      <th className="text-left p-4">Data Adicionado</th>
                      <th className="text-right p-4">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-navy-700">
                    {whitelist.map((item) => (
                      <tr key={item.id} className="hover:bg-navy-700/30 transition-colors">
                        <td className="p-4">
                          <p className="text-white font-semibold">{item.label}</p>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <p className="text-gray-400 font-mono text-sm">{item.address}</p>
                            <button className="text-orange-400 hover:text-orange-300">
                              <ExternalLink className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                        <td className="p-4">
                          <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-sm">{item.chain}</span>
                        </td>
                        <td className="p-4">
                          <p className="text-gray-400 text-sm">{item.addedDate}</p>
                        </td>
                        <td className="text-right p-4">
                          <button
                            onClick={() => handleRemoveFromWhitelist(item.id)}
                            className="px-3 py-1 bg-red-500/20 text-red-400 rounded-lg text-sm hover:bg-red-500/30 transition-colors"
                          >
                            Remover
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Simulador de Transações */}
        {activeTab === 'simulator' && (
          <div className="space-y-6">
            <div className="bg-navy-800/50 backdrop-blur-sm rounded-xl border border-navy-700 p-6">
              <h2 className="text-xl font-bold text-white mb-4">Simular Transação</h2>
              <p className="text-gray-400 mb-6">
                Visualize o resultado de uma transação antes de executá-la na blockchain
              </p>

              <div className="space-y-4">
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Endereço Destino</label>
                  <input
                    type="text"
                    placeholder="0x..."
                    className="w-full bg-navy-900 border border-navy-700 rounded-lg px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-orange-500 font-mono"
                    style={{ color: '#ffffff', backgroundColor: '#0f172a' }}
                  />
                </div>

                <div>
                  <label className="block text-gray-400 text-sm mb-2">Valor (ETH)</label>
                  <input
                    type="number"
                    placeholder="0.0"
                    className="w-full bg-navy-900 border border-navy-700 rounded-lg px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-orange-500"
                    style={{ color: '#ffffff', backgroundColor: '#0f172a' }}
                  />
                </div>

                <div>
                  <label className="block text-gray-400 text-sm mb-2">Dados (Opcional)</label>
                  <textarea
                    placeholder="0x..."
                    rows={3}
                    className="w-full bg-navy-900 border border-navy-700 rounded-lg px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-orange-500 font-mono"
                    style={{ color: '#ffffff', backgroundColor: '#0f172a' }}
                  />
                </div>

                <button
                  onClick={handleSimulateTransaction}
                  className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors flex items-center justify-center gap-2"
                >
                  <Eye className="w-5 h-5" />
                  Simular Transação
                </button>
              </div>
            </div>

            {/* Simulation Result */}
            {simulationResult && (
              <div className="bg-navy-800/50 backdrop-blur-sm rounded-xl border border-navy-700 p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      simulationResult.riskLevel === 'low'
                        ? 'bg-green-500/20'
                        : simulationResult.riskLevel === 'medium'
                        ? 'bg-yellow-500/20'
                        : 'bg-red-500/20'
                    }`}
                  >
                    <AlertCircle
                      className={`w-6 h-6 ${
                        simulationResult.riskLevel === 'low'
                          ? 'text-green-400'
                          : simulationResult.riskLevel === 'medium'
                          ? 'text-yellow-400'
                          : 'text-red-400'
                      }`}
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Resultado da Simulação</h3>
                    <p
                      className={`text-sm ${
                        simulationResult.riskLevel === 'low'
                          ? 'text-green-400'
                          : simulationResult.riskLevel === 'medium'
                          ? 'text-yellow-400'
                          : 'text-red-400'
                      }`}
                    >
                      Nível de Risco:{' '}
                      {simulationResult.riskLevel === 'low'
                        ? 'Baixo'
                        : simulationResult.riskLevel === 'medium'
                        ? 'Médio'
                        : 'Alto'}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-navy-900/50 rounded-lg p-4">
                      <p className="text-gray-400 text-sm mb-1">De</p>
                      <p className="text-white font-mono text-sm">{simulationResult.from}</p>
                    </div>
                    <div className="bg-navy-900/50 rounded-lg p-4">
                      <p className="text-gray-400 text-sm mb-1">Para</p>
                      <p className="text-white font-mono text-sm">{simulationResult.to}</p>
                    </div>
                    <div className="bg-navy-900/50 rounded-lg p-4">
                      <p className="text-gray-400 text-sm mb-1">Valor</p>
                      <p className="text-white font-semibold">{simulationResult.value}</p>
                    </div>
                    <div className="bg-navy-900/50 rounded-lg p-4">
                      <p className="text-gray-400 text-sm mb-1">Estimativa de Gas</p>
                      <p className="text-white font-semibold">{simulationResult.gasEstimate}</p>
                    </div>
                  </div>

                  {simulationResult.warnings.length > 0 && (
                    <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
                      <h4 className="text-yellow-400 font-semibold mb-3 flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5" />
                        Avisos de Segurança
                      </h4>
                      <ul className="space-y-2">
                        {simulationResult.warnings.map((warning, index) => (
                          <li key={index} className="text-yellow-300 text-sm flex items-start gap-2">
                            <span className="text-yellow-400 mt-1">•</span>
                            {warning}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* 2FA */}
        {activeTab === '2fa' && (
          <div className="space-y-6">
            <div className="bg-navy-800/50 backdrop-blur-sm rounded-xl border border-navy-700 p-6">
              <div className="flex items-center gap-3 mb-6">
                <Lock className="w-8 h-8 text-orange-400" />
                <div>
                  <h2 className="text-xl font-bold text-white">Autenticação de Dois Fatores (2FA)</h2>
                  <p className="text-gray-400 text-sm">Adicione uma camada extra de segurança à sua conta</p>
                </div>
              </div>

              {!twoFactorEnabled ? (
                <div className="space-y-6">
                  <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                    <h4 className="text-blue-400 font-semibold mb-2">Por que ativar 2FA?</h4>
                    <ul className="space-y-1 text-blue-300 text-sm">
                      <li>• Protege contra acesso não autorizado</li>
                      <li>• Requer código temporal além da senha</li>
                      <li>• Compatível com Google Authenticator e Authy</li>
                      <li>• Aumenta significativamente a segurança da conta</li>
                    </ul>
                  </div>

                  {!showQRCode ? (
                    <button
                      onClick={enable2FA}
                      className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors flex items-center justify-center gap-2"
                    >
                      <Key className="w-5 h-5" />
                      Ativar 2FA
                    </button>
                  ) : (
                    <div className="space-y-4">
                      <div className="bg-white rounded-lg p-8 flex items-center justify-center">
                        <div className="text-center">
                          <div className="w-48 h-48 bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
                            <p className="text-gray-600 font-mono text-xs">QR CODE</p>
                          </div>
                          <p className="text-gray-800 font-mono text-sm">JBSWY3DPEHPK3PXP</p>
                        </div>
                      </div>

                      <div>
                        <label className="block text-gray-400 text-sm mb-2">Código de Verificação</label>
                        <input
                          type="text"
                          placeholder="000000"
                          maxLength={6}
                          className="w-full bg-navy-900 border border-navy-700 rounded-lg px-4 py-3 text-white placeholder:text-gray-500 text-center text-2xl tracking-widest focus:outline-none focus:border-orange-500"
                          style={{ color: '#ffffff', backgroundColor: '#0f172a' }}
                        />
                      </div>

                      <button
                        onClick={confirm2FA}
                        className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors"
                      >
                        Confirmar e Ativar
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-6 text-center">
                    <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-white mb-2">2FA Ativado com Sucesso!</h3>
                    <p className="text-green-300 text-sm">
                      Sua conta agora está protegida com autenticação de dois fatores
                    </p>
                  </div>

                  <div className="bg-navy-900/50 rounded-lg p-4">
                    <h4 className="text-white font-semibold mb-3">Códigos de Backup</h4>
                    <p className="text-gray-400 text-sm mb-4">
                      Guarde estes códigos em local seguro. Use-os se perder acesso ao autenticador.
                    </p>
                    <div className="grid grid-cols-2 gap-2 font-mono text-sm">
                      <div className="bg-navy-800 rounded p-2 text-center text-gray-300">1A2B-3C4D</div>
                      <div className="bg-navy-800 rounded p-2 text-center text-gray-300">5E6F-7G8H</div>
                      <div className="bg-navy-800 rounded p-2 text-center text-gray-300">9I0J-1K2L</div>
                      <div className="bg-navy-800 rounded p-2 text-center text-gray-300">3M4N-5O6P</div>
                    </div>
                  </div>

                  <button
                    onClick={() => setTwoFactorEnabled(false)}
                    className="w-full bg-red-500/20 text-red-400 py-3 rounded-lg font-semibold hover:bg-red-500/30 transition-colors"
                  >
                    Desativar 2FA
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
