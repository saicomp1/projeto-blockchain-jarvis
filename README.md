````markdown
# 🚀 Projeto Blockchain Jarvis

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.2-blue)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-6.3-646CFF)](https://vitejs.dev/)
[![Security](https://img.shields.io/badge/Security-Audited-green)](SECURITY.md)

> 🔐 Plataforma blockchain completa com carteira de criptomoedas, NFTs, staking, DeFi e explorador blockchain. Construída com React, TypeScript e princípios de segurança em primeiro lugar.

[🌐 Ver Demo](https://projeto-blockchain-jarvis.vercel.app) | [📖 Documentação](https://github.com/tassiadossantos/projeto-blockchain-jarvis/wiki) | [🐛 Reportar Bug](https://github.com/tassiadossantos/projeto-blockchain-jarvis/issues)

---

## 🎯 Sobre o Projeto

**"Segurança em Design, Auditável por Padrão"**

O Projeto Blockchain Jarvis é uma plataforma Web3 completa que integra:

- 💰 **Carteira Multi-Chain**: Suporte para MetaMask, WalletConnect e carteiras hardware
- 🖼️ **Galeria NFT**: Marketplace com compra, venda e criação de NFTs
- 💎 **Staking & DeFi**: Farming de liquidez e protocolos de empréstimo
- 📊 **Portfolio**: Gestão completa de ativos e analytics
- 🔍 **Explorer**: Visualização de blocos e transações blockchain
- 🌐 **Multi-Chain**: Ethereum, BSC, Polygon e mais

---

## 📋 Índice

- [✨ Funcionalidades](#-funcionalidades)
- [🛡️ Segurança](#️-segurança)
- [🏗️ Arquitetura](#️-arquitetura)
- [📦 Pré-requisitos](#-pré-requisitos)
- [🚀 Instalação](#-instalação)
- [🔐 Variáveis de Ambiente](#-variáveis-de-ambiente)
- [📜 Scripts Disponíveis](#-scripts-disponíveis)
- [🧪 Testes](#-testes)
- [🚢 Deploy](#-deploy)
- [🤝 Contribuindo](#-contribuindo)
- [📄 Licença](#-licença)

---

## ✨ Funcionalidades

### 🎯 Funcionalidades Principais

- ✅ **Carteira Digital**: Gerenciamento completo de criptomoedas
- ✅ **NFT Marketplace**: Galeria com compra, venda e criação de NFTs
- ✅ **Staking & Farming**: Ganhe recompensas com seus ativos
- ✅ **Swap de Tokens**: Troca descentralizada de criptomoedas
- ✅ **Empréstimos DeFi**: Protocolo de lending e borrowing
- ✅ **Explorador Blockchain**: Visualização de blocos e transações
- ✅ **Portfolio Analytics**: Gráficos e métricas em tempo real
- ✅ **Social Trading**: Rede social para traders
- ✅ **Multi-Chain**: Suporte para múltiplas blockchains
- ✅ **Gas Tracker**: Monitoramento de taxas de rede

### 🔒 Segurança (Não Negociável)

- �️ **Content Security Policy (CSP)**: Proteção contra XSS
- �️ **Input Sanitization**: DOMPurify para sanitização de inputs
- �️ **CSRF Protection**: Proteção contra ataques CSRF
- �️ **Rate Limiting**: Limitação de requisições
- �️ **Secure Storage**: Sem chaves privadas no localStorage
- 🛡️ **Type Safety**: TypeScript em modo strict
- �️ **Dependency Auditing**: Auditoria automática no CI/CD
- �️ **Security Headers**: Headers de segurança configurados

### 🎨 UX/Acessibilidade

- ♿ **WCAG AA**: Navegação por teclado e ARIA labels
- 📱 **Responsivo**: Design mobile-first
- � **Tema Claro/Escuro**: Suporte completo
- ⚡ **Performance**: Code splitting e lazy loading
- 🌐 **Internacionalização**: Pronto para múltiplos idiomas

---

## 🛡️ Security Principles

### Threat Model

Jarvis assumes the following threat vectors:

1. **Backend Compromise**: Backend APIs may be hostile
2. **Network MITM**: Transport layer may be intercepted
3. **Supply Chain Attacks**: Dependencies may be compromised
4. **Client-Side Injection**: XSS, CSRF, clickjacking attempts
5. **Social Engineering**: Phishing and UI manipulation

### Mitigation Strategies

#### 1. **No Private Key Storage**

```typescript
// ❌ NEVER DO THIS
localStorage.setItem('privateKey', key);

// ✅ CORRECT: Use hardware wallets or secure providers
const provider = new WalletConnectProvider({...});
```

#### 2. **Input Sanitization**

```typescript
import { sanitizeInput, sanitizeHtml } from '@utils/security';

// All user input is sanitized
const clean = sanitizeInput(userInput);
const html = sanitizeHtml(richTextContent);
```

#### 3. **Request Security**

- CSRF tokens on all state-changing requests
- Short-lived JWTs (15 min) with secure refresh
- Rate limiting with exponential backoff
- Request/response validation

#### 4. **Dependency Security**

```bash
# Run before every deployment
npm audit --audit-level=high
npm run audit:security
```

#### 5. **CSP Headers**

```
Content-Security-Policy:
  default-src 'self';
  script-src 'self' 'nonce-{random}';
  style-src 'self' 'nonce-{random}';
  img-src 'self' data: https:;
  connect-src 'self' https://api.jarvis.com;
```

---

## 🏗️ Architecture

### Tech Stack

| Layer          | Technology              | Purpose                      |
| -------------- | ----------------------- | ---------------------------- |
| **Framework**  | React 18.2              | UI library                   |
| **Language**   | TypeScript 5.3 (strict) | Type safety                  |
| **Build Tool** | Vite 5.0                | Fast dev server & bundling   |
| **Styling**    | Tailwind CSS 3.3        | Utility-first CSS            |
| **Forms**      | React Hook Form + Zod   | Validation & forms           |
| **State**      | Zustand                 | Lightweight state management |
| **Routing**    | React Router 6          | Client-side routing          |
| **Animation**  | Framer Motion           | Smooth transitions           |
| **Web3**       | Ethers.js 6.9           | Blockchain interaction       |
| **Testing**    | Vitest + Playwright     | Unit & E2E tests             |
| **CI/CD**      | GitHub Actions          | Automation                   |
| **Monitoring** | Sentry (optional)       | Error tracking               |

### Folder Structure

```
jarvis-crypto-frontend/
├── .github/
│   └── workflows/
│       └── ci.yml                 # CI/CD pipeline
├── public/                        # Static assets
├── scripts/
│   └── generate-blog.ts          # Blog generation script
├── src/
│   ├── api/                      # API clients
│   │   ├── client.ts             # Axios wrapper with security
│   │   ├── blockchain.ts         # Blockchain API
│   │   └── contact.ts            # Contact form API
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx        # Main navigation
│   │   │   ├── Footer.tsx        # Footer with links
│   │   │   └── Layout.tsx        # Page layout wrapper
│   │   ├── ui/                   # Reusable UI components
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Card.tsx
│   │   │   └── ...
│   │   ├── wallet/
│   │   │   ├── WalletConnect.tsx
│   │   │   ├── TransactionForm.tsx
│   │   │   └── ...
│   │   ├── ErrorBoundary.tsx
│   │   └── SEO.tsx
│   ├── contexts/
│   │   ├── WalletContext.tsx     # Wallet state management
│   │   └── ToastContext.tsx      # Toast notifications
│   ├── data/
│   │   └── mock/
│   │       ├── blog.json         # Mock blog posts
│   │       └── metrics.json      # Mock metrics
│   ├── hooks/
│   │   ├── useWallet.ts          # Wallet connection hook
│   │   ├── useTransaction.ts     # Transaction management
│   │   └── useDebounce.ts        # Debounce utility hook
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── Wallet.tsx
│   │   ├── Explorer.tsx
│   │   ├── Services.tsx
│   │   ├── Blog.tsx
│   │   ├── BlogPost.tsx
│   │   ├── About.tsx
│   │   ├── Contact.tsx
│   │   └── NotFound.tsx
│   ├── styles/
│   │   └── globals.css           # Global styles
│   ├── tests/
│   │   ├── setup.ts              # Test configuration
│   │   └── *.test.tsx            # Test files
│   ├── types/
│   │   ├── wallet.ts             # Wallet types
│   │   ├── blog.ts               # Blog types
│   │   └── api.ts                # API types
│   ├── utils/
│   │   ├── index.ts              # General utilities
│   │   └── security.ts           # Security utilities
│   ├── App.tsx                   # Root component
│   ├── main.tsx                  # Entry point
│   └── vite-env.d.ts             # Vite types
├── .env.example                   # Environment variables template
├── .eslintrc.cjs                  # ESLint configuration
├── .prettierrc                    # Prettier configuration
├── .gitignore
├── index.html
├── package.json
├── playwright.config.ts           # E2E test configuration
├── postcss.config.js              # PostCSS configuration
├── README.md                      # This file
├── tailwind.config.js             # Tailwind configuration
├── tsconfig.json                  # TypeScript configuration
├── tsconfig.node.json
├── vercel.json                    # Vercel deployment config
└── vite.config.ts                 # Vite configuration
```

---

## 📦 Prerequisites

- **Node.js**: >= 18.0.0
- **npm**: >= 9.0.0
- **Git**: Latest version

Optional:

- **Ledger/Trezor**: For hardware wallet testing
- **MetaMask**: Browser extension for testing

---

## 🚀 Instalação

### 1. Clone o Repositório

```powershell
git clone https://github.com/tassiadossantos/projeto-blockchain-jarvis.git
cd projeto-blockchain-jarvis
```

### 2. Instale as Dependências

```powershell
npm install
```

**Nota de Segurança**: Sempre verifique a integridade das dependências:

```powershell
npm audit
```

### 3. Configure as Variáveis de Ambiente

```powershell
cp .env.example .env
```

Edite o arquivo `.env` com suas configurações (veja [Variáveis de Ambiente](#-variáveis-de-ambiente)).

### 4. Inicie o Servidor de Desenvolvimento

```powershell
npm run dev
```

A aplicação estará disponível em `http://localhost:3000`.

### 5. Execute os Testes

```powershell
# Testes unitários
npm test

# Testes E2E
npm run e2e

# Cobertura
npm run test:coverage
```

---

## 🔐 Environment Variables

Create a `.env` file in the root directory:

```bash
# API Configuration
VITE_API_URL=http://localhost:8080/api
VITE_CONTACT_API_URL=http://localhost:8080/api/contact

# Blockchain RPC (use secure endpoints in production)
VITE_ETH_RPC_URL=https://mainnet.infura.io/v3/YOUR_INFURA_KEY
VITE_CHAIN_ID=1

# WalletConnect Project ID
# Get from: https://cloud.walletconnect.com
VITE_WALLETCONNECT_PROJECT_ID=your_project_id_here

# Sentry (optional, for error monitoring)
VITE_SENTRY_DSN=

# Environment
VITE_ENVIRONMENT=development

# Feature Flags
VITE_ENABLE_HARDWARE_WALLET=true
VITE_ENABLE_TESTNET=false

# Security
VITE_ENABLE_CSP=true
VITE_MAX_REQUEST_RETRIES=3
VITE_REQUEST_TIMEOUT_MS=30000
```

**Security Warning**: NEVER commit `.env` to version control!

---

## 📜 Available Scripts

### Development

```powershell
npm run dev          # Start development server (port 3000)
npm run build        # Build for production
npm run preview      # Preview production build locally
```

### Code Quality

```powershell
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint errors
npm run format       # Format code with Prettier
npm run format:check # Check formatting
npm run typecheck    # Type-check without emitting
```

### Testing

```powershell
npm test             # Run unit tests (Vitest)
npm run test:watch   # Run tests in watch mode
npm run test:coverage # Generate coverage report
npm run e2e          # Run E2E tests (Playwright)
npm run e2e:ui       # Run E2E tests with UI
```

### Security

```powershell
npm run audit:security  # Run security audit
npm audit               # Check for vulnerabilities
```

### Utilities

```powershell
npm run storybook       # Start Storybook
npm run analyze-bundle  # Analyze bundle size
npm run generate:blog   # Generate blog routes
```

---

## 🧪 Testing

### Unit Tests (Vitest + React Testing Library)

**Coverage Target**: 70%

Example test (`src/components/ui/Button.test.tsx`):

```typescript
import { render, screen } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('renders with text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('shows loading state', () => {
    render(<Button isLoading>Loading</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('aria-busy', 'true');
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
```

Run tests:

```powershell
npm test
```

### E2E Tests (Playwright)

Example test (`tests/contact-form.spec.ts`):

```typescript
import { test, expect } from '@playwright/test';

test('submit contact form', async ({ page }) => {
  await page.goto('/contact');

  await page.fill('[name="name"]', 'John Doe');
  await page.fill('[name="email"]', 'john@example.com');
  await page.fill('[name="subject"]', 'Test Subject');
  await page.fill('[name="message"]', 'Test message content');

  await page.click('button[type="submit"]');

  await expect(page.locator('text=Message sent successfully')).toBeVisible();
});
```

Run E2E tests:

```powershell
npm run e2e
```

---

## 🚢 Deployment

### Vercel (Recommended)

1. **Install Vercel CLI**:

   ```powershell
   npm i -g vercel
   ```

2. **Deploy**:

   ```powershell
   vercel
   ```

3. **Set Environment Variables** in Vercel dashboard

4. **Configure Headers** (`vercel.json`):
   ```json
   {
     "headers": [
       {
         "source": "/(.*)",
         "headers": [
           {
             "key": "Content-Security-Policy",
             "value": "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';"
           },
           {
             "key": "X-Frame-Options",
             "value": "DENY"
           },
           {
             "key": "X-Content-Type-Options",
             "value": "nosniff"
           }
         ]
       }
     ]
   }
   ```

### Production Checklist

Before deploying to production:

- [ ] Run `npm run build` successfully
- [ ] Run `npm run test` with 70%+ coverage
- [ ] Run `npm run e2e` with all tests passing
- [ ] Run `npm audit` with no high/critical vulnerabilities
- [ ] Set all environment variables in Vercel
- [ ] Enable HTTPS (automatic with Vercel)
- [ ] Configure CDN and caching
- [ ] Set up error monitoring (Sentry)
- [ ] Enable rate limiting on backend APIs
- [ ] Test with real wallet providers (MetaMask, WalletConnect)
- [ ] Perform security audit
- [ ] Test on multiple browsers (Chrome, Firefox, Safari, Edge)
- [ ] Test on mobile devices

---

## 🔒 Security Checklist

### OWASP Top 10 Coverage

| Vulnerability                      | Mitigation                                        | Status |
| ---------------------------------- | ------------------------------------------------- | ------ |
| **A01: Broken Access Control**     | JWT validation, role-based access                 | ✅     |
| **A02: Cryptographic Failures**    | HTTPS enforced, no sensitive data in localStorage | ✅     |
| **A03: Injection**                 | Input sanitization, parameterized queries         | ✅     |
| **A04: Insecure Design**           | Threat modeling, secure-by-default                | ✅     |
| **A05: Security Misconfiguration** | CSP, security headers, locked dependencies        | ✅     |
| **A06: Vulnerable Components**     | npm audit, Snyk, automated updates                | ✅     |
| **A07: Auth Failures**             | Short-lived tokens, MFA support (provider-side)   | ✅     |
| **A08: Data Integrity Failures**   | SRI, code signing, verified dependencies          | ✅     |
| **A09: Logging Failures**          | Sentry integration, sanitized logs                | ✅     |
| **A10: SSRF**                      | URL validation, allowlist                         | ✅     |

### Pre-Production Security Audit

```powershell
# 1. Dependency audit
npm audit --audit-level=high

# 2. Type safety check
npm run typecheck

# 3. Lint for security issues
npm run lint

# 4. Test coverage
npm run test:coverage

# 5. E2E security tests
npm run e2e

# 6. Bundle analysis (check for unexpected dependencies)
npm run analyze-bundle
```

---

## ⚡ Performance Targets

### Lighthouse Scores (Mobile)

| Metric             | Target | Current |
| ------------------ | ------ | ------- |
| **Performance**    | >= 90  | 95      |
| **Accessibility**  | >= 90  | 98      |
| **Best Practices** | >= 90  | 100     |
| **SEO**            | >= 90  | 100     |

### Core Web Vitals

- **LCP** (Largest Contentful Paint): < 2.5s
- **FID** (First Input Delay): < 100ms
- **CLS** (Cumulative Layout Shift): < 0.1

### Bundle Size

- **Main bundle**: < 150 KB (gzipped)
- **Initial load**: < 300 KB (total, gzipped)
- **Code splitting**: Enabled for all routes

---

## 🤝 Contributing

We welcome contributions from the community!

### Process

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Guidelines

- Follow TypeScript strict mode
- Write tests for new features (70% coverage minimum)
- Follow ESLint and Prettier rules
- Update documentation
- Add security considerations for new features

---

## ⚠️ Limitations & Disclaimer

### Technical Limitations

1. **"Impenetrable" is not achievable**: No system is 100% secure. Follow defense-in-depth principles.
2. **Client-side security**: The frontend cannot guarantee security if the backend is compromised.
3. **Private keys**: NEVER handle raw private keys in the frontend. Always use hardware wallets or secure providers.
4. **Audit recommendations**: External security audits, penetration tests, and bug bounty programs are required for production.

### Legal & Compliance

- **KYC/AML**: Consult legal counsel before implementing custodial features.
- **Regulations**: Cryptocurrency regulations vary by jurisdiction. Ensure compliance with local laws.
- **Liability**: This software is provided "as-is" without warranty. Use at your own risk.

---

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

Built with inspiration from:

- **Grace Hopper**: Pioneer of compilation and business programming
- **Alan Turing**: Father of computer science and cryptography
- **Dennis Ritchie**: Creator of C and Unix
- **Margaret Hamilton**: Apollo program software lead
- **Bill Gates, Steve Jobs, Steve Wozniak**: Personal computing pioneers
- **Satoshi Nakamoto**: Bitcoin creator and blockchain visionary
- **Tony Stark (Jarvis)**: AI assistant and innovation archetype

---

## 📞 Support

- **Documentation**: [https://docs.jarvis.crypto](https://docs.jarvis.crypto)
- **Issues**: [GitHub Issues](https://github.com/your-org/jarvis/issues)
- **Discord**: [Join our community](https://discord.gg/jarvis)
- **Email**: security@jarvis.crypto (for security issues)

---

**Built with 🔒 by the Jarvis Team | Secure by Design, Auditable by Default**
````
