'use client'

import React, { Component, ErrorInfo, ReactNode } from 'react'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo)
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900">
          <div className="text-center p-8 rounded-lg bg-gray-800">
            <h2 className="text-2xl font-bold text-red-500 mb-4">Oops, something went wrong!</h2>
            <p className="text-gray-300 mb-4">We apologize for the inconvenience.</p>
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
              onClick={() => window.location.reload()}
            >
              Refresh Page
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
