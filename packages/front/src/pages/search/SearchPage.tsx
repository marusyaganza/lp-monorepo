import React, { useContext, useEffect, useMemo, useState } from 'react';
import { AppContext } from '../../app-context/appContext';
import { useSearchParams } from 'react-router-dom';
import { Icon, SearchField, Link } from '@lp/ui';
import { PageLayout } from '../../components/PageLayout/PageLayout';
import {
  Suggestions,
  Word,
  SaveWordMutation,
  SearchWordsQuery
} from '../../generated/graphql';
import { WordCard, Spinner } from '@lp/ui';
import styles from './SearchPage.module.css';
import { routes } from '../../constants/routes';
import { removeTypenames } from '../../util/wordUtils';
import notFound from '../../assets/img/not-found.svg';
import { SEARCH_WORDS_QUERY } from '../../gql/queries';
import { SAVE_WORD_MUTATION } from '../../gql/mutations';
import { useMutation, useLazyQuery } from '@apollo/client';

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [saveWordFunc, saveWordData] = useMutation<SaveWordMutation>(
    SAVE_WORD_MUTATION,
    {
      update(cache) {
        cache.evict({ fieldName: 'game' });
        cache.evict({ fieldName: 'wordsPerPage' });
        cache.evict({ fieldName: 'verbs' });
        cache.evict({ fieldName: 'games' });
        cache.evict({ fieldName: 'verbs' });
      }
    }
  );
  const { setNotification, language } = useContext(AppContext);
  const [fetchSearchResult, { loading, error, data }] =
    useLazyQuery<SearchWordsQuery>(SEARCH_WORDS_QUERY);
  const [savedWords, setSavedWords] = useState<string[]>([]);
  const containsSuggestions = useMemo(
    () =>
      data?.searchWord?.every(d => d?.__typename === 'Suggestions') && !loading,
    [data, loading]
  );

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
    if (saveWordData.error) {
      setNotification({
        variant: 'error',
        text: 'Error',
        subText: saveWordData?.error?.message || 'something went wrong'
      });
    }
  }, [saveWordData.error]);

  useEffect(() => {
    const { data } = saveWordData;
    if (data) {
      const { name, uuid } = data.saveWord;
      setNotification({
        variant: 'success',
        text: 'Word added',
        subText: `${name} is added successfully.`
      });
      if (uuid) {
        setSavedWords(prev => [...prev, uuid]);
      }
    }
  }, [saveWordData.data]);

  useEffect(() => {
    const search = searchParams.get('search');
    if (search) {
      fetchSearchResult({
        variables: { input: { search, language } }
      });
    }
  }, [language, fetchSearchResult, searchParams]);

  const handleSearch = (search?: string) => {
    if (search) {
      setSearchParams({ search });
      fetchSearchResult({
        variables: { input: { search, language } }
      });
    }
  };

  const getSuggestionClickHandler = (suggestion?: string | null) => {
    if (!suggestion) {
      return;
    }
    return function () {
      setSearchParams({ search: suggestion });
    };
  };

  const getAddWordHandler = (word: Word) => {
    return function () {
      saveWordFunc({
        variables: { input: removeTypenames(word) }
      });
    };
  };

  const renderSuggestions = () => {
    if (!containsSuggestions || !Array.isArray(data?.searchWord)) {
      return;
    }

    const suggestions = data?.searchWord as Suggestions[];
    if (!suggestions?.length) {
      return (
        <div className={styles.notFound}>
          <img src={notFound} className={styles.notFoundImage} alt="" />
          <h3 className={styles.notFoundText} data-cy="empty-search-result">
            {searchParams?.get('search') ?? 'word'} is not found
          </h3>
        </div>
      );
    }

    const suggestionsArr = suggestions[0].suggestions;

    if (!suggestionsArr?.length) {
      return;
    }

    return (
      <article>
        <div className={styles.suggestionsContainer}>
          <Icon
            className={styles.suggestionsIcon}
            id="pointer"
            width={20}
            height={20}
          />
          <p className={styles.suggestions}>
            {suggestionsArr.map(suggestion => (
              <button
                className={styles.suggestion}
                key={suggestion}
                onClick={getSuggestionClickHandler(suggestion)}
                data-cy="clickable-suggestion"
              >
                {suggestion}
              </button>
            ))}
          </p>
        </div>
      </article>
    );
  };

  const renderWords = () => {
    if (containsSuggestions || !Array.isArray(data?.searchWord)) {
      return;
    }
    const words = data?.searchWord as Word[];
    return (
      <ul className={styles.list} data-cy="searchResult">
        {words.map(word => {
          return (
            <li className={styles.listItem} key={word.uuid}>
              <WordCard
                addButton={{
                  callback: getAddWordHandler(word),
                  isLoading: saveWordData.loading,
                  isDisabled: savedWords.some(w => w === word?.uuid)
                }}
                word={word}
              />
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <PageLayout>
      <div className={styles.content}>
        <div className={styles.headingContainer}>
          <h1 className={styles.mainHeading}>Look up word</h1>
          <Link
            data-cy="add-word-link"
            variant="button"
            to={`/${routes.words}/new`}
          >
            Add your own word
          </Link>
        </div>
        <SearchField
          autofocus
          className={styles.search}
          searchQuery={searchParams.get('search') || ''}
          onSearch={handleSearch}
        />
        {loading && <Spinner />}
        {renderSuggestions()}
        {renderWords()}
      </div>
    </PageLayout>
  );
};

export default SearchPage;
