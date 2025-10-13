# 🔐 Guia de Configuração do GitHub

## 📋 Passo a Passo Completo

### 1️⃣ Adicionar Descrição e Topics no Repositório

1. Acesse: https://github.com/tassiadossantos/projeto-blockchain-jarvis
2. Clique no ícone de **⚙️ Settings** (configurações)
3. Na seção **About**, clique em **Edit repository details**
4. Adicione:

**Descrição:**

```
🚀 Plataforma Web3 completa com carteira de criptomoedas, NFT marketplace, staking, DeFi e explorador blockchain
```

**Website:**

```
https://projeto-blockchain-jarvis.vercel.app
```

**Topics (tags):**

```
blockchain
cryptocurrency
web3
react
typescript
vite
nft
defi
staking
ethereum
wallet
dapp
tailwindcss
frontend
```

5. Clique em **Save changes**

---

### 2️⃣ Configurar GitHub Secrets para CI/CD

Os secrets são necessários para o pipeline de CI/CD funcionar corretamente.

#### Como adicionar Secrets:

1. Vá para: https://github.com/tassiadossantos/projeto-blockchain-jarvis/settings/secrets/actions
2. Clique em **New repository secret**
3. Adicione cada secret abaixo:

#### Secrets Necessários:

##### 🌐 VITE_API_URL

- **Nome:** `VITE_API_URL`
- **Valor:** `https://api.seu-dominio.com/api` (ou use um mock)
- **Descrição:** URL da API backend

##### 🔗 VITE_WALLETCONNECT_PROJECT_ID

- **Nome:** `VITE_WALLETCONNECT_PROJECT_ID`
- **Valor:** Obtenha em https://cloud.walletconnect.com
- **Como obter:**
  1. Acesse https://cloud.walletconnect.com
  2. Crie uma conta (gratuito)
  3. Crie um novo projeto
  4. Copie o Project ID
- **Descrição:** ID do projeto WalletConnect

##### 🚀 Secrets do Vercel (opcional, para deploy automático)

###### VERCEL_TOKEN

- **Nome:** `VERCEL_TOKEN`
- **Como obter:**
  1. Acesse https://vercel.com/account/tokens
  2. Crie um novo token
  3. Copie o token gerado
- **Descrição:** Token de autenticação do Vercel

###### VERCEL_ORG_ID

- **Nome:** `VERCEL_ORG_ID`
- **Como obter:**
  1. Execute no terminal: `npx vercel link`
  2. O arquivo `.vercel/project.json` será criado
  3. Copie o valor de `orgId`
- **Descrição:** ID da organização Vercel

###### VERCEL_PROJECT_ID

- **Nome:** `VERCEL_PROJECT_ID`
- **Como obter:**
  1. Do mesmo arquivo `.vercel/project.json`
  2. Copie o valor de `projectId`
- **Descrição:** ID do projeto Vercel

---

### 3️⃣ Configurar GitHub Pages (Opcional)

Para hospedar documentação ou demo estática:

1. Vá para: https://github.com/tassiadossantos/projeto-blockchain-jarvis/settings/pages
2. Em **Source**, selecione:
   - Branch: `main`
   - Folder: `/docs` (ou `/` se quiser a raiz)
3. Clique em **Save**
4. GitHub gerará uma URL: `https://tassiadossantos.github.io/projeto-blockchain-jarvis/`

---

### 4️⃣ Configurar Branch Protection Rules

Para proteger a branch principal:

1. Vá para: https://github.com/tassiadossantos/projeto-blockchain-jarvis/settings/branches
2. Clique em **Add rule**
3. Em **Branch name pattern**, digite: `main`
4. Selecione:
   - ✅ **Require a pull request before merging**
   - ✅ **Require status checks to pass before merging**
   - ✅ **Require branches to be up to date before merging**
5. Clique em **Create**

---

### 5️⃣ Habilitar GitHub Actions

1. Vá para: https://github.com/tassiadossantos/projeto-blockchain-jarvis/actions
2. Se necessário, clique em **I understand my workflows, go ahead and enable them**
3. As GitHub Actions já estão configuradas no arquivo `.github/workflows/ci.yml`

---

### 6️⃣ Adicionar Badge de Status no README

Adicione ao topo do README.md:

```markdown
[![CI/CD](https://github.com/tassiadossantos/projeto-blockchain-jarvis/actions/workflows/ci.yml/badge.svg)](https://github.com/tassiadossantos/projeto-blockchain-jarvis/actions/workflows/ci.yml)
[![Deploy](https://img.shields.io/badge/deploy-vercel-black)](https://projeto-blockchain-jarvis.vercel.app)
```

---

### 7️⃣ Criar Issues e Projects (Opcional)

#### Criar Issues:

1. Vá para: https://github.com/tassiadossantos/projeto-blockchain-jarvis/issues
2. Clique em **New issue**
3. Crie issues para melhorias futuras:
   - [ ] Adicionar suporte a mais blockchains
   - [ ] Implementar testes E2E completos
   - [ ] Adicionar internacionalização (i18n)
   - [ ] Melhorar performance com React.memo
   - [ ] Adicionar PWA (Progressive Web App)

#### Criar Project Board:

1. Vá para: https://github.com/tassiadossantos/projeto-blockchain-jarvis/projects
2. Clique em **New project**
3. Escolha template **Board**
4. Organize as issues em colunas: To Do, In Progress, Done

---

### 8️⃣ Configurar Dependabot (Segurança)

O Dependabot já deve estar ativo automaticamente. Para verificar:

1. Vá para: https://github.com/tassiadossantos/projeto-blockchain-jarvis/settings/security_analysis
2. Certifique-se de que está habilitado:
   - ✅ **Dependency graph**
   - ✅ **Dependabot alerts**
   - ✅ **Dependabot security updates**

---

### 9️⃣ Criar Releases

Para criar sua primeira release:

1. Vá para: https://github.com/tassiadossantos/projeto-blockchain-jarvis/releases
2. Clique em **Create a new release**
3. Preencha:
   - **Tag version:** `v1.0.0`
   - **Release title:** `🚀 Primeira Release - Plataforma Blockchain Jarvis`
   - **Description:**

     ```markdown
     ## 🎉 Primeira Release Oficial

     ### ✨ Funcionalidades

     - ✅ Carteira de criptomoedas
     - ✅ NFT Marketplace
     - ✅ Staking & Farming
     - ✅ Swap de Tokens
     - ✅ Portfolio Analytics
     - ✅ Explorador Blockchain
     - ✅ Empréstimos DeFi
     - ✅ Multi-Chain Support

     ### 🔒 Segurança

     - Auditoria de dependências
     - TypeScript strict mode
     - CSP headers
     - Input sanitization

     ### 📊 Métricas

     - 112 arquivos
     - 35,774 linhas de código
     - TypeScript + React + Vite
     ```

4. Clique em **Publish release**

---

### 🔟 Verificar Lighthouse Score

Para verificar a performance do site:

1. Abra o Chrome DevTools (F12)
2. Vá para a aba **Lighthouse**
3. Selecione **Desktop** ou **Mobile**
4. Clique em **Analyze page load**
5. Veja os scores de:
   - Performance
   - Accessibility
   - Best Practices
   - SEO

---

## ✅ Checklist Completo

Marque conforme for completando:

### GitHub Repository

- [ ] Descrição adicionada
- [ ] Topics/tags configuradas
- [ ] Website URL adicionada
- [ ] README.md atualizado
- [ ] Licença MIT adicionada

### GitHub Secrets

- [ ] VITE_API_URL configurado
- [ ] VITE_WALLETCONNECT_PROJECT_ID configurado
- [ ] VERCEL_TOKEN configurado (opcional)
- [ ] VERCEL_ORG_ID configurado (opcional)
- [ ] VERCEL_PROJECT_ID configurado (opcional)

### Segurança

- [ ] Dependabot habilitado
- [ ] Branch protection configurado
- [ ] GitHub Actions funcionando
- [ ] npm audit executado

### Deploy

- [ ] Vercel configurado
- [ ] Variáveis de ambiente no Vercel
- [ ] Deploy automático funcionando
- [ ] Custom domain configurado (opcional)

### Documentação

- [ ] README.md completo
- [ ] SCREENSHOTS.md criado
- [ ] CONTRIBUTING.md adicionado
- [ ] CODE_OF_CONDUCT.md adicionado

### Extras

- [ ] Issues criadas
- [ ] Project board criado
- [ ] Release v1.0.0 publicada
- [ ] Badges adicionadas no README
- [ ] Lighthouse score verificado

---

## 🚀 Próximos Passos

Após completar esta configuração:

1. **Compartilhe o projeto:**
   - LinkedIn
   - Twitter/X
   - Dev.to
   - Reddit (r/reactjs, r/cryptocurrency)

2. **Melhore continuamente:**
   - Adicione mais funcionalidades
   - Melhore a cobertura de testes
   - Otimize performance
   - Adicione mais blockchains

3. **Construa comunidade:**
   - Responda issues
   - Aceite pull requests
   - Crie guias e tutoriais
   - Faça live coding

---

## 📞 Suporte

Se tiver dúvidas sobre a configuração:

- **GitHub Issues:** https://github.com/tassiadossantos/projeto-blockchain-jarvis/issues
- **Discussions:** https://github.com/tassiadossantos/projeto-blockchain-jarvis/discussions

---

**Criado por [Tassia dos Santos](https://github.com/tassiadossantos) | 2025**
