import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLazyQuery } from '@apollo/client';

import { Spinner } from '@lp/ui';
import { WordType } from '@lp/types';
import { WordCard } from '@lp/ui';
import { CardWrapper } from '@lp/ui';

import { PageLayout } from '../../components/PageLayout/PageLayout';
import { WORDS_QUERY } from '../../gql/queries';
import { AppContext } from '../../app-context/appContext';

import styles from './WordsPage.module.css';

const WordsPage = () => {
  const [fetchWords, { loading, error, data }] = useLazyQuery(WORDS_QUERY);
  const { setNotification } = useContext(AppContext);

  useEffect(() => {
    fetchWords();
  }, []);

  const navigate = useNavigate();

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
      <h1>Words</h1>
      {loading && <Spinner />}
      {data && (
        <ul className={styles.wordList}>
          {data?.words?.map((word: WordType) => (
            <li className={styles.wordListItem} key={word.id}>
              <CardWrapper
                onClick={() => {
                  navigate(`/words/${word.id}`);
                }}
              >
                <WordCard
                  variant="short"
                  className={styles.wordCard}
                  word={word}
                />
              </CardWrapper>
            </li>
          ))}
        </ul>
      )}
    </PageLayout>
  );
};

export default WordsPage;
