import React, { useEffect, useContext } from 'react';
import { useLazyQuery } from '@apollo/client';
import { useParams, useNavigate } from 'react-router-dom';
import { WordCard, Icon, Link, Spinner } from '@lp/ui';
import { routes } from '../../../constants/routes';
import { PageLayout } from '../../../components/PageLayout/PageLayout';
import { WORD_BY_ID_QUERY } from '../../../gql/queries';
import { AppContext } from '../../../app-context/appContext';

import styles from './WordPage.module.css';

const WordPage = () => {
  const { wordId } = useParams();
  const { setNotification } = useContext(AppContext);
  const [fetchWord, { loading, error, data }] = useLazyQuery(WORD_BY_ID_QUERY);
  const navigate = useNavigate();

  useEffect(() => {
    fetchWord({
      variables: { wordId }
    });
  }, [wordId]);

  const handleEdit = () => {
    navigate(`/${routes.words}/edit/${wordId}`);
  };

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
  return (
    <PageLayout>
      <Link className={styles.link} to={`/${routes.words}`}>
        <Icon width={16} height={16} id="arrow-left" />
        Back to vocabulary
      </Link>
      {loading && <Spinner />}
      {data?.word && (
        <WordCard
          className={styles.wordCard}
          word={data.word}
          editButton={{ callback: handleEdit, isLoading: loading }}
        />
      )}
    </PageLayout>
  );
};

export default WordPage;
