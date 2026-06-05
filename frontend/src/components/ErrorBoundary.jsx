import React, { Component } from "react";
import { AlertTriangle, RefreshCw, Home, ChevronDown, ChevronUp } from "lucide-react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      showDetails: false,
    };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // You can log the error to an error reporting service here if needed.
    console.error("ErrorBoundary caught an error:", error, errorInfo);
    this.setState({ errorInfo });
  }

  handleReset = () => {
    const variant = this.props.variant || "fullscreen";
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
      showDetails: false,
    });
    if (variant !== "section") {
      window.location.reload();
    }
  };

  handleGoHome = () => {
    const variant = this.props.variant || "fullscreen";
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
      showDetails: false,
    });
    window.location.href = variant === "section" ? "/dashboard" : "/";
  };

  toggleDetails = () => {
    this.setState((prevState) => ({ showDetails: !prevState.showDetails }));
  };

  render() {
    if (this.state.hasError) {
      const variant = this.props.variant || "fullscreen";

      if (variant === "section") {
        return (
          <div className="w-full min-h-[400px] flex items-center justify-center bg-transparent text-[var(--color-text-dark)] p-4 transition-colors duration-300">
            <div className="max-w-xl w-full text-center space-y-6 glass-panel p-6 md:p-8 rounded-2xl shadow-xl border border-[var(--color-border)] dot-grid-bg relative overflow-hidden bg-white/40 dark:bg-black/20 backdrop-blur-sm">
              {/* Ambient background glow elements for premium look */}
              <div className="absolute top-[-40%] left-[-40%] w-64 h-64 bg-red-500/10 rounded-full blur-[80px] pointer-events-none"></div>
              <div className="absolute bottom-[-40%] right-[-40%] w-64 h-64 bg-[var(--color-primary)]/10 rounded-full blur-[80px] pointer-events-none"></div>

              {/* Error Icon Illustration */}
              <div className="flex justify-center relative">
                <div className="bg-red-500/10 dark:bg-red-500/20 p-4 rounded-full border border-red-500/20 text-red-500 animate-pulse shadow-md shadow-red-500/5">
                  <AlertTriangle size={40} className="stroke-[1.5]" />
                </div>
              </div>

              {/* Error Message Header */}
              <div className="space-y-2 relative">
                <h2 className="text-xl font-bold tracking-tight bg-gradient-to-r from-red-500 via-[var(--color-primary)] to-indigo-500 bg-clip-text text-transparent animate-text-shine">
                  Component Rendering Failed
                </h2>
                <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 max-w-sm mx-auto leading-relaxed">
                  An error occurred in this section. You can retry rendering or use the sidebar navigation to switch pages.
                </p>
              </div>

              {/* Tech Details Accordion */}
              {this.state.error && (
                <div className="border border-[var(--color-border)] rounded-xl overflow-hidden bg-white/40 dark:bg-black/20 backdrop-blur-sm shadow-sm transition-all duration-300 text-left">
                  <button
                    onClick={this.toggleDetails}
                    className="w-full flex items-center justify-between p-3.5 font-semibold text-xs text-red-600 dark:text-red-400 hover:bg-gray-100/50 dark:hover:bg-white/5 transition-colors cursor-pointer"
                  >
                    <span className="truncate pr-4">
                      Error: {this.state.error.message || String(this.state.error)}
                    </span>
                    <span className="flex items-center gap-1.5 text-[10px] text-gray-500 font-normal shrink-0">
                      {this.state.showDetails ? "Hide details" : "Show details"}
                      {this.state.showDetails ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                    </span>
                  </button>

                  {this.state.showDetails && (
                    <div className="p-3 border-t border-[var(--color-border)] font-mono text-[10px] overflow-x-auto bg-gray-50 dark:bg-gray-900/40 text-gray-600 dark:text-gray-400 max-h-40 custom-scrollbar whitespace-pre-wrap select-text">
                      {this.state.errorInfo ? (
                        this.state.errorInfo.componentStack
                      ) : (
                        <span className="italic text-gray-400">Stacktrace not available.</span>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row justify-center items-center gap-3 pt-2 relative">
                <button
                  onClick={this.handleReset}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[var(--color-primary)] hover:bg-[var(--color-primary)]/90 text-white text-sm font-semibold shadow-md shadow-[var(--color-primary)]/20 transition-all duration-300 cursor-pointer"
                >
                  <RefreshCw size={16} />
                  Try Again
                </button>
                <button
                  onClick={this.handleGoHome}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 text-sm font-semibold transition-all duration-300 cursor-pointer border border-[var(--color-border)]"
                >
                  <Home size={16} />
                  Go to Dashboard
                </button>
              </div>
            </div>
          </div>
        );
      }

      // Default: fullscreen
      return (
        <div className="min-h-screen w-full flex items-center justify-center bg-[var(--color-background)] text-[var(--color-text-dark)] px-4 py-12 transition-colors duration-300">
          <div className="max-w-2xl w-full text-center space-y-8 glass-panel p-8 md:p-12 rounded-2xl shadow-2xl border border-[var(--color-border)] dot-grid-bg relative overflow-hidden">
            {/* Ambient background glow elements for premium look */}
            <div className="absolute top-[-30%] left-[-30%] w-80 h-80 bg-red-500/10 rounded-full blur-[100px] pointer-events-none"></div>
            <div className="absolute bottom-[-30%] right-[-30%] w-80 h-80 bg-[var(--color-primary)]/10 rounded-full blur-[100px] pointer-events-none"></div>

            {/* Error Icon Illustration */}
            <div className="flex justify-center relative">
              <div className="bg-red-500/10 dark:bg-red-500/20 p-5 rounded-full border border-red-500/20 text-red-500 animate-pulse shadow-lg shadow-red-500/5">
                <AlertTriangle size={52} className="stroke-[1.5]" />
              </div>
            </div>

            {/* Error Message Header */}
            <div className="space-y-3 relative">
              <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl bg-gradient-to-r from-red-500 via-[var(--color-primary)] to-indigo-500 bg-clip-text text-transparent animate-text-shine">
                Oops! Something Went Wrong
              </h1>
              <p className="text-base text-gray-500 dark:text-gray-400 max-w-md mx-auto leading-relaxed">
                An unexpected crash occurred. We've captured the diagnostics and secured the application state.
              </p>
            </div>

            {/* Tech Details Accordion */}
            {this.state.error && (
              <div className="border border-[var(--color-border)] rounded-xl overflow-hidden bg-white/40 dark:bg-black/20 backdrop-blur-sm shadow-sm transition-all duration-300 text-left">
                <button
                  onClick={this.toggleDetails}
                  className="w-full flex items-center justify-between p-4 font-semibold text-sm text-red-600 dark:text-red-400 hover:bg-gray-100/50 dark:hover:bg-white/5 transition-colors cursor-pointer"
                >
                  <span className="truncate pr-4">
                    Error: {this.state.error.message || String(this.state.error)}
                  </span>
                  <span className="flex items-center gap-1.5 text-xs text-gray-500 font-normal shrink-0">
                    {this.state.showDetails ? "Hide stack" : "Show stack"}
                    {this.state.showDetails ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </span>
                </button>

                {this.state.showDetails && (
                  <div className="p-4 border-t border-[var(--color-border)] font-mono text-xs overflow-x-auto bg-gray-50 dark:bg-gray-900/40 text-gray-600 dark:text-gray-400 max-h-60 custom-scrollbar whitespace-pre-wrap select-text">
                    {this.state.errorInfo ? (
                      this.state.errorInfo.componentStack
                    ) : (
                      <span className="italic text-gray-400">Stacktrace not available.</span>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4 relative">
              <button
                onClick={this.handleReset}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[var(--color-primary)] hover:bg-[var(--color-primary)]/90 text-white font-semibold shadow-lg shadow-[var(--color-primary)]/20 transition-all duration-300 cursor-pointer bento-card"
              >
                <RefreshCw size={18} />
                Try Again
              </button>
              <button
                onClick={this.handleGoHome}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 font-semibold transition-all duration-300 cursor-pointer border border-[var(--color-border)]"
              >
                <Home size={18} />
                Go Home
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
