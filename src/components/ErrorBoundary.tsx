import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Terminal, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error in Studio component tree:', error, errorInfo);
  }

  public handleReload = () => {
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen bg-paper flex flex-col items-center justify-center p-6 text-ink select-none">
          <div className="max-w-md w-full bg-white border-4 border-ink shadow-comic-lg rounded-3xl p-6 text-center space-y-4">
            <div className="w-12 h-12 mx-auto rounded-2xl bg-hoodie text-white flex items-center justify-center border-2 border-ink shadow-comic-sm">
              <Terminal className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-black text-ink">Studio Restored</h2>
            <p className="text-xs font-mono text-ink-soft leading-relaxed">
              An unexpected render glitch occurred. Click below to reload or resume exploring the studio.
            </p>
            {this.state.error && (
              <div className="bg-ink text-sky-300 font-mono text-[11px] p-3 rounded-xl border-2 border-ink text-left overflow-x-auto max-h-24">
                {this.state.error.message}
              </div>
            )}
            <button
              onClick={this.handleReload}
              className="w-full py-3 rounded-2xl border-2 border-ink bg-cheese hover:bg-cheese-dark text-ink font-mono font-bold text-xs shadow-comic-sm flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95"
            >
              <RefreshCw className="w-4 h-4" />
              <span>RELOAD STUDIO</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
