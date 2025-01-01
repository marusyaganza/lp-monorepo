import React, {
  useEffect,
  useContext,
  useState,
  useCallback,
  useMemo
} from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import {
  Word,
  DeleteWordMutation,
  SortWordsBy,
  TagsQuery,
  WordsPerPageQuery
} from '../../generated/graphql';
import { TAGS_QUERY, WORDS_PER_PAGE_QUERY } from '../../gql/queries';
import { DELETE_WORD_MUTATION } from '../../gql/mutations';

import {
  WordCard,
  CardWrapper,
  Link,
  Spinner,
  TagSelector,
  Button,
  SearchField
} from '@lp/ui';

import { PageLayout } from '../../components/PageLayout/PageLayout';
import { AppContext } from '../../app-context/appContext';
import {
  SortByType,
  SortControls
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
  const navigate = useNavigate();
  const [fetchWords, { loading, error, data }] =
    useLazyQuery<WordsPerPageQuery>(WORDS_PER_PAGE_QUERY);
  const { setNotification, language } = useContext(AppContext);
  const [sortBy, setSortBy] = useState<SortWordsBy>();
  const [tags, setTags] = useState<string[] | undefined>();
  const [isReverseOrder, setIsReverseOrder] = useState(false);
  const [pageNum, setPageNum] = useState(1);
  const [searchQuery, setSearchQuery] = useState<string>();

  const words = useMemo(
    () => data?.wordsPerPage?.words || [],
    [data]
  ) as Word[];

  const hasNext = useMemo(() => data?.wordsPerPage?.hasNext, [data]);

  const tagsResult = useQuery<TagsQuery>(TAGS_QUERY, {
    variables: { language }
  });

  const [deleteWordFunc, deleteWordData] = useMutation<DeleteWordMutation>(
    DELETE_WORD_MUTATION,
    {
      update(cache) {
        cache.evict({ fieldName: 'game' });
        cache.evict({ fieldName: 'wordsPerPage' });
      }
    }
  );

  const handleSortingParamChange = useCallback((val: SortByType) => {
    setSortBy(val as SortWordsBy);
    storeData('sortWordsBy', val as SortWordsBy);
  }, []);

  const handleTagsChange = useCallback(
    (val: string[]) => {
      setTags(val);
      const storedTags = getStoredData('tags') || {};
      storedTags[language] = val;
      storeData('tags', storedTags);
    },
    [language]
  );

  const handleOrderChange = useCallback((value: boolean) => {
    setIsReverseOrder(value);
    storeData('wordsSortOrder', value);
  }, []);

  const handleNext = () => {
    fetchWords({
      variables: {
        input: {
          language,
          isReverseOrder,
          sortBy: sortBy || undefined,
          tags,
          searchQuery,
          page: pageNum + 1
        }
      }
    });
    setPageNum(prev => prev + 1);
  };

  const handlePrevious = () => {
    if (pageNum < 2) {
      return;
    }
    fetchWords({
      variables: {
        input: {
          language,
          isReverseOrder,
          sortBy: sortBy || undefined,
          tags,
          searchQuery,
          page: pageNum - 1
        }
      }
    });
    setPageNum(prev => prev - 1);
  };

  const handleSearch = (val?: string) => {
    setSearchQuery(val);
  };

  useEffect(() => {
    setPageNum(1);
    fetchWords({
      variables: {
        input: {
          language,
          isReverseOrder,
          sortBy: sortBy || undefined,
          tags,
          searchQuery
        }
      }
    });
  }, [language, sortBy, isReverseOrder, tags, searchQuery]);

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
    const storedSortBy = getStoredData('sortWordsBy');
    const storedIsReverseOrder = getStoredData('wordsSortOrder');
    const storedTags = getStoredData('tags')?.[language];
    if (storedSortBy) {
      setSortBy(storedSortBy);
    }
    if (storedIsReverseOrder) {
      setIsReverseOrder(storedIsReverseOrder);
    }
    setTags(storedTags);
  }, [language]);

  const getDeleteWordHandler = (id: string) => {
    return function () {
      deleteWordFunc({
        variables: { deleteWordId: id }
      });
    };
  };

  const renderWords = () => {
    if (!Array.isArray(words)) {
      return;
    }
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

  const renderPagination = () => {
    if (!words?.length || (!hasNext && pageNum === 1)) {
      return;
    }
    return (
      <div className={styles.pagination} data-cy="pagination">
        <Button
          data-cy="prev-btn"
          onClick={handlePrevious}
          disabled={pageNum === 1}
          variant="tertiary"
        >
          Previous
        </Button>
        <Button
          data-cy="next-btn"
          disabled={!hasNext}
          onClick={handleNext}
          variant="tertiary"
        >
          Next
        </Button>
      </div>
    );
  };

  return (
    <PageLayout>
      <h1 className={styles.heading}>Vocabulary</h1>
      {!loading && (
        <div className={styles.topSection}>
          <p data-cy="words-count" className={styles.wordsInfo}>
            {`You have ${data?.wordsPerPage?.wordsCount || 0} words.`}{' '}
            <Link
              data-cy="add-word-link"
              className={styles.link}
              to={`/${routes.words}/new`}
            >
              Add new
            </Link>
          </p>
          <SearchField
            className={styles.search}
            searchQuery={searchQuery}
            onSearch={handleSearch}
            allowEmptySearch
          />
          <div className={styles.wordSelection}>
            <TagSelector
              dataCy="tag-selector"
              showNoTagsTag
              tags={tagsResult?.data?.tags}
              value={tags}
              label="tags"
              onChange={handleTagsChange}
              className={styles.tagsSelector}
            />
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
        </div>
      )}
      {loading && <Spinner />}
      {renderWords()}
      {renderPagination()}
      <Outlet />
    </PageLayout>
  );
};

export default WordsPage;
