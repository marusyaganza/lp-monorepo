import React, { useEffect, useContext } from 'react';
import { useLazyQuery } from '@apollo/client';

import { Spinner } from '@lp/ui';
import { WordCard } from '@lp/ui';

import { PageLayout } from '../../../components/PageLayout/PageLayout';
import { WORD_BY_ID_QUERY } from '../../../gql/queries';
import { AppContext } from '../../../app-context/appContext';

import { useParams } from 'react-router-dom';

const WordPage = () => {
  const { wordId } = useParams();
  const { setNotification } = useContext(AppContext);
  const [fetchWord, { loading, error, data }] = useLazyQuery(WORD_BY_ID_QUERY);

  useEffect(() => {
    fetchWord({
      variables: { wordId }
    });
  }, []);

  useEffect(() => {
    if (error) {
      setNotification({
        variant: 'error',
        text: 'Error',
        subText: error?.message
      });
    }
  }, [error, setNotification]);
  return (
    <PageLayout>
      {loading && <Spinner />}
      {/* temporary heading */}
      <h1>Word page: {wordId}</h1>
      {data?.word && <WordCard word={data.word} />}
    </PageLayout>
  );
};

export default WordPage;
