import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  useWordsLazyQuery,
  Word,
  useDeleteWordMutation
} from '../../generated/graphql';
import { WordCard } from '@lp/ui';
import { CardWrapper } from '@lp/ui';

import { PageLayout } from '../../components/PageLayout/PageLayout';
import { AppContext } from '../../app-context/appContext';
import { WORDS_QUERY } from '../../gql/queries';

import styles from './WordsPage.module.css';

const WordsPage = () => {
  const [fetchWords, { loading, error, data }] = useWordsLazyQuery();
  const { setNotification, language } = useContext(AppContext);
  const [deleteWordFunc, deleteWordData] = useDeleteWordMutation();

  // TODO ask 'are you sure' before deleting the word
  useEffect(() => {
    fetchWords({ variables: { language } });
  }, [language]);

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

  useEffect(() => {
    if (error) {
      setNotification({
        variant: 'error',
        text: 'Error',
        subText: error?.message || 'something went wrong'
      });
    }
  }, [error]);

  useEffect(() => {
    if (deleteWordData.error) {
      setNotification({
        variant: 'error',
        text: 'Error',
        subText: deleteWordData?.error?.message || 'something went wrong'
      });
    }
  }, [deleteWordData.error]);

  useEffect(() => {
    if (deleteWordData.data) {
      setNotification({
        variant: 'success',
        text: 'Word deleted',
        subText: `${deleteWordData?.data?.deleteWord}`
      });
    }
  }, [deleteWordData.data]);

  const getDeleteWordHandler = (id: string) => {
    return function () {
      deleteWordFunc({
        variables: { deleteWordId: id },
        refetchQueries: () => [
          {
            query: WORDS_QUERY,
            variables: {
              language
            }
          }
        ]
      });
    };
  };

  return (
    <PageLayout isLoading={loading}>
      <h1>Words</h1>
      {data && (
        <ul className={styles.wordList}>
          {/* TODO: refactor this part */}
          {/* @ts-ignore */}
          {data?.words?.map((word: Word) => {
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
                      onDelete={getDeleteWordHandler(word.id)}
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
