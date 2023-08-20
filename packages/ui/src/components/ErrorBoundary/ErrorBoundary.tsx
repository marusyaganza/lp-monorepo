import React, { ErrorInfo, PropsWithChildren } from 'react';
import { ErrorDisplay } from '../ErrorDisplay/ErrorDisplay';

const clickHandler = () => {
  window.location.reload();
};

/**
 * @internal
 */

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends React.Component<
  PropsWithChildren<unknown>,
  State
> {
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
          heading="Something went wrong"
          buttonText="Reload"
          buttonHandler={clickHandler}
        />
      );
    }
    return this.props.children;
  }
}
