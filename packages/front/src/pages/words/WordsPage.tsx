import React from 'react';
import { useQuery } from '@apollo/client';

import { Spinner } from '@lp/ui';
import { WordType } from '@lp/types';
import { WordCard } from '@lp/ui';

import { PageLayout } from '../../components/PageLayout/PageLayout';
import { WORDS_QUERY } from '../../gql/queries';

const WordsPage = () => {
  const { loading, error, data } = useQuery(WORDS_QUERY);
  return (
    <PageLayout>
      <h1>Words</h1>
      {loading && <Spinner />}
      {error && <p>{error.message}</p>}
      {data && (
        <ul>
          {data?.words?.map((word: WordType) => (
            <li key={word.id}>
              <WordCard word={word} />
            </li>
          ))}
        </ul>
      )}
    </PageLayout>
  );
};

export default WordsPage;
