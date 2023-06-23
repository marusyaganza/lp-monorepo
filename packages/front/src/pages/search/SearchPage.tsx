import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Button, Spinner } from '@lp/ui';
import { PageLayout } from '../../components/PageLayout/PageLayout';
import { useSearchWordsLazyQuery, Language } from '../../generated/graphql';
import { WordCard } from '@lp/ui';
import styles from '../words/WordsPage.module.css';

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [language, setLanguage] = useState<Language>(Language.English);
  const [fetchSearchResult, { loading, error, data }] =
    useSearchWordsLazyQuery();
  const handleLanguageChange = (e: any) => {
    setLanguage(e.target.value);
  };
  const handleSearch = (event: any) => {
    event.preventDefault();
    const search = searchParams.get('filter');
    if (search) {
      fetchSearchResult({
        variables: { input: { search, language } }
      });
    }
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
        {loading && <Spinner />}
        <Button type="submit" isLoading={loading}>
          Search
        </Button>
      </form>
      {containsSuggestions &&
        // TODO refactor rendering suggestions
        // @ts-ignore
        data?.searchWord?.map(el => <p>{el?.suggestions?.join(', ')}</p>)}
      {data?.searchWord && !containsSuggestions && (
        <ul className={styles.wordList}>
          {/* TODO: refactor this part */}
          {data?.searchWord?.map((word: any) => {
            if (word) {
              return (
                <li className={styles.wordListItem} key={word?.id}>
                  <WordCard className={styles.wordCard} word={word} />
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
