import React, { ErrorInfo, PropsWithChildren } from 'react';
import { ErrorDisplay } from '../error-display/errorDisplay';

const clickHandler = () => {
  window.location.reload();
};

interface State {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<PropsWithChildren<unknown>, State> {
  constructor(props: PropsWithChildren<unknown>) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // TODO configure dev and production, maybe add logging here
    // if (process.env.mode === 'development') {
    console.error('err', JSON.stringify({ error, errorInfo }));
    // }
  }

  render() {
    if (this.state.hasError) {
      return (
        <ErrorDisplay
          subHeading="Sometning went wrong"
          heading="Error"
          headingIcon="error"
          buttonText="Reload"
          buttonHandler={clickHandler}
          theme="red"
        />
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
