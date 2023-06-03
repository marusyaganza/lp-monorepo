import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWordsLazyQuery } from '../../generated/graphql';
import { Spinner } from '@lp/ui';
import { WordCard } from '@lp/ui';
import { CardWrapper } from '@lp/ui';

import { PageLayout } from '../../components/PageLayout/PageLayout';
import { AppContext } from '../../app-context/appContext';

import styles from './WordsPage.module.css';

const WordsPage = () => {
  const [fetchWords, { loading, error, data }] = useWordsLazyQuery();
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
          {/* TODO: refactor this part */}
          {data?.words?.map((word: any) => {
            if (word) {
              return (
                <li className={styles.wordListItem} key={word?.id}>
                  <CardWrapper
                    onClick={() => {
                      navigate(`/words/${word?.id}`);
                    }}
                  >
                    <WordCard
                      variant="short"
                      className={styles.wordCard}
                      word={word}
                    />
                  </CardWrapper>
                </li>
              );
            }
            return;
          })}
        </ul>
      )}
    </PageLayout>
  );
};

export default WordsPage;
