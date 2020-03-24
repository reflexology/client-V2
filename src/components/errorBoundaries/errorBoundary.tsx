import { Button, Result } from 'antd';
import Dictionary from 'dictionary/dictionary';
import React, { ErrorInfo } from 'react';

export interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<{}, ErrorBoundaryState> {
  state = { hasError: false };

  static getDerivedStateFromError(error: any): Partial<ErrorBoundaryState> {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error(error, errorInfo);

    // TODO: log the error to the server
    // logErrorToMyService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Result
          status='error'
          title={Dictionary.errorBoundary.title}
          subTitle={Dictionary.errorBoundary.subTitle}
          extra={[
            <Button onClick={() => window.location.reload()} type='primary' key='reload'>
              {Dictionary.errorBoundary.refreshThePage}
            </Button>
          ]}
        ></Result>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
