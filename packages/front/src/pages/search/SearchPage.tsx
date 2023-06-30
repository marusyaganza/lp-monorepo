import React, { useState, useContext, useEffect } from 'react';
import { AppContext } from '../../app-context/appContext';
import { useSearchParams } from 'react-router-dom';
import { Button, Spinner } from '@lp/ui';
import { PageLayout } from '../../components/PageLayout/PageLayout';
import { WORDS_QUERY } from '../../gql/queries';
import {
  useSearchWordsLazyQuery,
  Language,
  useSaveWordMutation,
  NewWordInput
} from '../../generated/graphql';
import { WordCard } from '@lp/ui';
import styles from './SearchPage.module.css';

//TODO refactor this part
//look for another approach of deleting __typedef property
function prepareData(data: NewWordInput) {
  const defs = data.defs.map(def => ({
    def: def?.def,
    examples: def?.examples?.map(ex => ({
      text: ex?.text,
      translation: ex?.translation
    }))
  }));
  const formattedData = { ...data };
  // @ts-ignore
  delete formattedData.__typename;
  return { ...formattedData, defs };
}

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [language, setLanguage] = useState<Language>(Language.English);
  const [saveWordFunc, saveWordData] = useSaveWordMutation();
  const { setNotification } = useContext(AppContext);
  const [fetchSearchResult, { loading, error, data }] =
    useSearchWordsLazyQuery();
  const handleLanguageChange = (e: any) => {
    setLanguage(e.target.value);
  };

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
    if (saveWordData.data) {
      setNotification({
        variant: 'success',
        text: 'Word added',
        subText: `${saveWordData?.data?.saveWord?.name} is added successfully. Go to the words page to review it`
      });
    }
  }, [saveWordData.data]);

  const handleSearch = (event: any) => {
    event.preventDefault();
    const search = searchParams.get('filter');
    if (search) {
      fetchSearchResult({
        variables: { input: { search, language } }
      });
    }
  };

  const getAddWordHandler = (word: NewWordInput) => {
    return function () {
      saveWordFunc({
        // @ts-ignore
        variables: { input: prepareData(word) },
        refetchQueries: () => [
          {
            query: WORDS_QUERY,
            variables: {
              // TODO store language in the localstorage and connect it to the app context
              language
            }
          }
        ]
      });
    };
  };

  const containsSuggestions = data?.searchWord?.some(
    d => d?.__typename === 'Suggestions'
  );

  return (
    <PageLayout>
      <h1>Search word: {searchParams.get('filter') || ''} </h1>
      <form onSubmit={handleSearch}>
        <select value={language} onChange={handleLanguageChange}>
          <option value={Language.English}>{Language.English}</option>
          <option value={Language.Spanish}>{Language.Spanish}</option>
        </select>
        <input
          value={searchParams.get('filter') || ''}
          onChange={event => {
            const filter = event.target.value;
            if (filter) {
              setSearchParams({ filter });
            } else {
              setSearchParams({});
            }
          }}
        />
        {(loading || saveWordData.loading) && <Spinner />}
        <Button type="submit" isLoading={loading}>
          Search
        </Button>
      </form>
      {containsSuggestions &&
        // TODO refactor rendering suggestions
        // @ts-ignore
        data?.searchWord?.map(el => (
          // @ts-ignore
          <p key={el?.suggestions?.[0]}>{el?.suggestions?.join(', ')}</p>
        ))}
      {data?.searchWord && !containsSuggestions && (
        <ul className={styles.list}>
          {/* TODO: refactor this part */}
          {data?.searchWord?.map((word: any) => {
            if (word) {
              return (
                <li className={styles.listItem} key={word?.id}>
                  <WordCard onAdd={getAddWordHandler(word)} word={word} />
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

export default SearchPage;
