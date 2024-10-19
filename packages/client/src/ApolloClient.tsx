import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import { getStoredData } from './util/localStorageUtils';

const httpLink = createHttpLink({
  uri: import.meta.env.VITE_GQL_URL
});

const token = getStoredData('userData')?.token;

export const createAuthLink = (tkn: string | undefined) => {
  return setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        authorization: tkn ? `Bearer ${tkn}` : ''
      }
    };
  }).concat(httpLink);
};

export const client = new ApolloClient({
  link: createAuthLink(token),
  cache: new InMemoryCache()
});
