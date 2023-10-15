import React, { useContext, useEffect, useMemo, useState } from 'react';
import { AppContext } from '../../app-context/appContext';
import { useSearchParams } from 'react-router-dom';
import { Icon, SearchField, Link } from '@lp/ui';
import { PageLayout } from '../../components/PageLayout/PageLayout';
import {
  useSearchWordsLazyQuery,
  useSaveWordMutation,
  Suggestions,
  Word
} from '../../generated/graphql';
import { WordCard, Spinner } from '@lp/ui';
import styles from './SearchPage.module.css';
import { routes } from '../../constants/routes';
import { removeTypenames } from '../../util/wordUtils';

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [saveWordFunc, saveWordData] = useSaveWordMutation({
    update(cache) {
      cache.evict({ fieldName: 'game' });
      cache.evict({ fieldName: 'words' });
    }
  });
  const { setNotification, language } = useContext(AppContext);
  const [fetchSearchResult, { loading, error, data }] =
    useSearchWordsLazyQuery();
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
        subText: error?.message || 'something went wrong',
        sameLocation: true
      });
    }
  }, [error]);

  useEffect(() => {
    if (saveWordData.error) {
      setNotification({
        variant: 'error',
        text: 'Error',
        subText: saveWordData?.error?.message || 'something went wrong',
        sameLocation: true
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
        subText: `${name} is added successfully.`,
        sameLocation: true
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
    return (
      <article>
        {suggestions?.map(el => (
          <p className={styles.suggestion} key={el?.suggestions?.[0]}>
            <Icon id="pointer" width={20} height={20} />
            {el?.suggestions?.join(', ')}
          </p>
        ))}
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
            <li className={styles.listItem} key={word?.id}>
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
            variant="button"
            className={styles.link}
            to={`/${routes.words}/new`}
          >
            Add your own word
          </Link>
        </div>
        <SearchField
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
