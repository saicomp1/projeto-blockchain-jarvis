import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

/**
 * ErrorBoundary component to catch React errors
 * Security: Prevents error details from leaking to users in production
 */
export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Security: Log to error tracking service (Sentry) with sanitized data
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    // TODO: Send to Sentry or other error tracking service
    // Make sure to scrub sensitive data before sending
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="flex min-h-screen items-center justify-center bg-background p-4">
          <div className="w-full max-w-md rounded-lg border border-destructive bg-card p-6 text-center">
            <div className="mb-4 text-4xl">⚠️</div>
            <h1 className="mb-2 text-2xl font-bold text-destructive">Algo deu errado</h1>
            <p className="mb-4 text-muted-foreground">
              Pedimos desculpas pelo inconveniente. Por favor, tente atualizar a página.
            </p>
            {import.meta.env.DEV && this.state.error && (
              <details className="mt-4 rounded bg-muted p-4 text-left text-sm">
                <summary className="cursor-pointer font-mono font-semibold">
                  Detalhes do Erro (Apenas Dev)
                </summary>
                <pre className="mt-2 overflow-auto text-xs">{this.state.error.stack}</pre>
              </details>
            )}
            <button
              onClick={() => window.location.reload()}
              className="mt-4 rounded-md bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90"
            >
              Atualizar Página
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
