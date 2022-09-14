import React from 'react';
import { useParams } from 'react-router-dom';
import { PageLayout } from '../../../components/PageLayout/PageLayout';

const WordPage = () => {
  const params = useParams();
  return (
    <PageLayout>
      <h1>Word page: {params.wordId}</h1>
    </PageLayout>
  );
};

export default WordPage;
