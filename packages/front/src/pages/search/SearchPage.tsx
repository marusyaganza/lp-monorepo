import React from 'react';
import { useSearchParams } from 'react-router-dom';

import { PageLayout } from '../../components/PageLayout/PageLayout';

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  return (
    <PageLayout>
      <h1>Search word: {searchParams.get('filter') || ''} </h1>
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
    </PageLayout>
  );
};

export default SearchPage;
