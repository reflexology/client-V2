import React from 'react';
import { ErrorInfo } from 'react';

import { Result, Button } from 'antd';

export interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<{}, ErrorBoundaryState> {
  state = { hasError: false };

  static getDerivedStateFromError(error: any) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.log(error, errorInfo);

    // Log the error to an error reporting service
    // logErrorToMyService(error, errorInfo); //TODO:
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <Result
          status='error'
          title='משהו נכשל'
          subTitle='נסה לרענן את הדף'
          extra={[
            <Button onClick={() => window.location.reload()} type='primary' key='reload'>
              רענן את הדף
            </Button>
          ]}
        ></Result>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
