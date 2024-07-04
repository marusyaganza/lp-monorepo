import React from 'react';
import { RouterProvider } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { AppProvider } from './app-context/appContext';
import { getStoredData } from './util/localStorageUtils';
import { router } from './routes';

import './app.css';

const httpLink = createHttpLink({
  uri: process.env.GQL_URL
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

export const App = () => {
  return (
    <AppProvider>
      <ApolloProvider client={client}>
        <RouterProvider router={router} />
      </ApolloProvider>
    </AppProvider>
  );
};
