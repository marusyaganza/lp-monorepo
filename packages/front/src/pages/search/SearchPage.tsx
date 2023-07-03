import React, { useContext, useEffect } from 'react';
import { AppContext } from '../../app-context/appContext';
import { useSearchParams } from 'react-router-dom';
import { Button } from '@lp/ui';
import { PageLayout } from '../../components/PageLayout/PageLayout';
import { WORDS_QUERY } from '../../gql/queries';
import {
  useSearchWordsLazyQuery,
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
  const [saveWordFunc, saveWordData] = useSaveWordMutation();
  const { setNotification, language } = useContext(AppContext);
  const [fetchSearchResult, { loading, error, data }] =
    useSearchWordsLazyQuery();

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
        // TODO after saving the word successfully, save its id in state to display saved word
        // 'add' button as disabled
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

  const containsSuggestions = data?.searchWord?.some(
    d => d?.__typename === 'Suggestions'
  );

  return (
    <PageLayout isLoading={loading}>
      <h1>Search word: {searchParams.get('filter') || ''} </h1>
      <form onSubmit={handleSearch}>
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
