import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  useWordsLazyQuery,
  Word,
  useDeleteWordMutation
} from '../../generated/graphql';
import { WordCard, CardWrapper, Link, Spinner } from '@lp/ui';

import { PageLayout } from '../../components/PageLayout/PageLayout';
import { AppContext } from '../../app-context/appContext';

import styles from './WordsPage.module.css';
import { routes } from '../../constants/routes';

const WordsPage = () => {
  const [fetchWords, { loading, error, data }] = useWordsLazyQuery();
  const { setNotification, language } = useContext(AppContext);
  const [deleteWordFunc, deleteWordData] = useDeleteWordMutation({
    update(cache) {
      cache.evict({ fieldName: 'game' });
      cache.evict({ fieldName: 'words' });
    }
  });

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
        subText: error?.message,
        sameLocation: true
      });
    }
  }, [error, setNotification]);

  useEffect(() => {
    if (error) {
      setNotification({
        variant: 'error',
        text: 'Error',
        subText: error?.message || 'something went wrong',
        sameLocation: true
      });
    }
  }, [error]);

  useEffect(() => {
    if (deleteWordData.error) {
      setNotification({
        variant: 'error',
        text: 'Error',
        subText: deleteWordData?.error?.message || 'something went wrong',
        sameLocation: true
      });
    }
  }, [deleteWordData.error]);

  useEffect(() => {
    if (deleteWordData.data) {
      setNotification({
        variant: 'success',
        text: 'Word deleted',
        subText: `${deleteWordData?.data?.deleteWord}`,
        sameLocation: true
      });
    }
  }, [deleteWordData.data]);

  const getDeleteWordHandler = (id: string) => {
    return function () {
      deleteWordFunc({
        variables: { deleteWordId: id }
      });
    };
  };

  const renderWords = () => {
    if (!Array.isArray(data?.words)) {
      return;
    }
    const words = data?.words as Word[];
    return (
      <ul className={styles.wordList}>
        {words.map(word => {
          return (
            <li className={styles.wordListItem} key={word?.id}>
              <CardWrapper
                onClick={() => {
                  navigate(`/words/review/${word?.id}`);
                }}
              >
                <WordCard
                  variant="short"
                  className={styles.wordCard}
                  word={word}
                  deleteButton={{
                    callback: getDeleteWordHandler(word.id),
                    isLoading: deleteWordData.loading
                  }}
                />
              </CardWrapper>
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <PageLayout>
      <h1 className={styles.heading}>Vocabulary</h1>
      <p className={styles.wordsInfo}>
        {`You have ${data?.words.length || 0} words in your vocabulary`}{' '}
        <Link className={styles.link} to={`/${routes.words}/new`}>
          Add new
        </Link>
      </p>
      {loading && <Spinner />}
      {renderWords()}
    </PageLayout>
  );
};

export default WordsPage;
