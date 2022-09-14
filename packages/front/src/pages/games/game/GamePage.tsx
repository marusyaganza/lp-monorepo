import React from 'react';
import { useParams } from 'react-router-dom';

import { PageLayout } from '../../../components/PageLayout/PageLayout';

const GamePage = () => {
  const params = useParams();
  return (
    <PageLayout>
      <h1>Game page: {params.gameId}</h1>
    </PageLayout>
  );
};

export default GamePage;
