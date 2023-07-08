import React, { useContext, useEffect, useMemo, useState } from 'react';
import { AppContext } from '../../app-context/appContext';
import { useSearchParams } from 'react-router-dom';
import { Icon, SearchField } from '@lp/ui';
import { PageLayout } from '../../components/PageLayout/PageLayout';
import { WORDS_QUERY } from '../../gql/queries';
import {
  useSearchWordsLazyQuery,
  useSaveWordMutation,
  NewWordInput,
  Suggestions,
  Word
} from '../../generated/graphql';
import { WordCard, Spinner } from '@lp/ui';
import styles from './SearchPage.module.css';

//TODO refactor this part
//look for another approach of deleting __typedef property
//perhaps create an utility function for finding and deleting all properties with the giving name
//or executing a giving callback on all found properties
function prepareData(data: Word): NewWordInput {
  const defs = data.defs.map(def => ({
    def: def?.def,
    examples: def?.examples?.map(ex => ({
      text: ex?.text,
      translation: ex?.translation
    }))
  }));
  const formattedData = { ...data };
  delete formattedData.__typename;
  // @ts-ignore
  return { ...formattedData, defs };
}

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [saveWordFunc, saveWordData] = useSaveWordMutation();
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
        subText: `${name} is added successfully. Go to the words page to review it`
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
  }, []);

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
        variables: { input: prepareData(word) },
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
      <ul className={styles.list}>
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
        <h1 className={styles.mainHeading}>Look up word</h1>
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
