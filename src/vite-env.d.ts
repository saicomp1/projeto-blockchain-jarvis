/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_CONTACT_API_URL: string;
  readonly VITE_ETH_RPC_URL: string;
  readonly VITE_CHAIN_ID: string;
  readonly VITE_WALLETCONNECT_PROJECT_ID: string;
  readonly VITE_SENTRY_DSN?: string;
  readonly VITE_ENVIRONMENT: 'development' | 'staging' | 'production';
  readonly VITE_ENABLE_HARDWARE_WALLET: string;
  readonly VITE_ENABLE_TESTNET: string;
  readonly VITE_ENABLE_CSP: string;
  readonly VITE_MAX_REQUEST_RETRIES: string;
  readonly VITE_REQUEST_TIMEOUT_MS: string;
  readonly VITE_GA_TRACKING_ID?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
