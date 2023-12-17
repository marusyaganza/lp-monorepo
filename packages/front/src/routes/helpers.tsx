import React, { Suspense } from 'react';
import { PageSpinner } from '../components/PageSpinner/PageSpinner';

export const withSuspense = (
  Component: React.LazyExoticComponent<() => JSX.Element>
) => {
  return (
    <Suspense fallback={<PageSpinner />}>
      <Component />
    </Suspense>
  );
};
