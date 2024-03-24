import React, { useEffect, useContext, useState, useCallback } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import {
  WordsQuery,
  Word,
  DeleteWordMutation,
  SortWordsBy,
  TagsQuery
} from '../../generated/graphql';
import { TAGS_QUERY, WORDS_QUERY } from '../../gql/queries';
import { DELETE_WORD } from '../../gql/mutations';

import { WordCard, CardWrapper, Link, Spinner, TagSelector } from '@lp/ui';

import { PageLayout } from '../../components/PageLayout/PageLayout';
import { AppContext } from '../../app-context/appContext';
import {
  SortControls,
  SortByType
} from '../../components/SortControls/SortControls';

import styles from './WordsPage.module.css';
import { routes } from '../../constants/routes';
import { getStoredData, storeData } from '../../util/localStorageUtils';
import { useLazyQuery, useMutation, useQuery } from '@apollo/client';

const OPTIONS = {
  [SortWordsBy.Name]: 'Alphabetically',
  [SortWordsBy.Particle]: 'Particle',
  [SortWordsBy.Level]: 'Level'
};

const WordsPage = () => {
  const [fetchWords, { loading, error, data }] =
    useLazyQuery<WordsQuery>(WORDS_QUERY);
  const { setNotification, language } = useContext(AppContext);
  const [sortBy, setSortBy] = useState<SortWordsBy>();
  const [isReverseOrder, setIsReverseOrder] = useState(false);

  const tagsResult = useQuery<TagsQuery>(TAGS_QUERY, {
    variables: { language }
  });

  const [deleteWordFunc, deleteWordData] = useMutation<DeleteWordMutation>(
    DELETE_WORD,
    {
      update(cache) {
        cache.evict({ fieldName: 'game' });
        cache.evict({ fieldName: 'words' });
      }
    }
  );

  const handleSortingParamChange = useCallback((val: SortByType) => {
    setSortBy(val as SortWordsBy);
    storeData('sortWordsBy', val);
  }, []);
  const handleTagsChange = (tags: string[]) => {
    console.log('tags', tags);
  };

  const handleOrderChange = useCallback((value: boolean) => {
    setIsReverseOrder(value);
    storeData('wordsSortOrder', value);
  }, []);

  useEffect(() => {
    fetchWords({
      variables: {
        input: { language, isReverseOrder, sortBy: sortBy || undefined }
      }
    });
  }, [language, sortBy, isReverseOrder]);

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

  useEffect(() => {
    const storedSortBy = getStoredData<'sortWordsBy'>('sortWordsBy');
    const storedIsReverseOrder =
      getStoredData<'wordsSortOrder'>('wordsSortOrder');
    if (storedSortBy) {
      setSortBy(storedSortBy);
    }
    if (storedIsReverseOrder) {
      setIsReverseOrder(storedIsReverseOrder);
    }
  }, []);

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
      <ul data-cy="wordsList" className={styles.wordList}>
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
      {!loading && (
        <div className={styles.topSection}>
          <p data-cy="wordsCount" className={styles.wordsInfo}>
            {`You have ${data?.words.length || 0} words.`}{' '}
            <Link className={styles.link} to={`/${routes.words}/new`}>
              Add new
            </Link>
          </p>
          <TagSelector
            // @ts-ignore
            tags={tagsResult?.data?.tags}
            label="tags"
            onChange={handleTagsChange}
            className={styles.tagsSelector}
          />
          <Link to={`/${routes.tags}`}>Manage tags</Link>
          <SortControls
            blankOption="Date"
            blankValue="Date"
            options={OPTIONS}
            initialOrderValue={isReverseOrder}
            sortBy={sortBy || ''}
            onOrderChange={handleOrderChange}
            onSortChange={handleSortingParamChange}
            label="Sort words by"
          />
        </div>
      )}
      {loading && <Spinner />}
      {renderWords()}
      <Outlet />
    </PageLayout>
  );
};

export default WordsPage;
