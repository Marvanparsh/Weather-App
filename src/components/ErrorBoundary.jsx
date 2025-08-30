import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Weather app error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen p-8">
          <div className="backdrop-blur-sm rounded-2xl p-8 shadow-lg border bg-white bg-opacity-15 border-white border-opacity-20 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Something went wrong</h2>
            <p className="text-white opacity-80 mb-6">
              We're having trouble loading the weather data. Please refresh the page and try again.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-white bg-opacity-30 text-white rounded-xl hover:bg-opacity-50 transition-all duration-300"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;