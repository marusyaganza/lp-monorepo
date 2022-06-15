import React, { useContext } from 'react';
import { useQuery } from '@apollo/client';
import { Spinner } from '../../../../ui/src/components/Spinner/Spinner';

import { PageLayout } from '../../components/PageLayout/PageLayout';
import { WORDS_QUERY } from '../../gql/queries';
import { AppContext } from '../../app-context/appContext';

const WordsPage = () => {
  const { loading, error, data } = useQuery(WORDS_QUERY);
  //TODO: use a component to display words
  console.log('data', data);
  return (
    <PageLayout>
      <h1>Words</h1>
      {loading && <Spinner />}
      {error && <p>{error.message}</p>}
    </PageLayout>
  );
};

export default WordsPage;
