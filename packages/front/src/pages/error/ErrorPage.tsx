import React, { useCallback } from 'react';
import { useRouteError, useNavigate } from 'react-router-dom';
import { ErrorDisplay } from '@lp/ui';
import { PageLayout } from '../../components/PageLayout/PageLayout';

const ErrorPage = () => {
  const error = useRouteError();

  console.error('my error', error);

  const navigate = useNavigate();

  const clickHandler = useCallback(() => {
    navigate(0);
  }, []);

  return (
    <PageLayout noRedirect>
      <ErrorDisplay
        buttonHandler={clickHandler}
        buttonText="Reload"
        heading="Something went wrong"
      />
    </PageLayout>
  );
};

export default ErrorPage;
