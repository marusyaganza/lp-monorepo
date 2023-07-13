import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { AppProvider } from './app-context/appContext';
import { getUserData } from './util/getUserData';
import { ErrorBoundary } from '@lp/ui';
import { AppRoutes } from './routes';

import './app.css';

//TODO save url in the env variable
const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql'
});

const token = getUserData()?.token;

const createAuthLink = (tkn: string | undefined) => {
  return setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        authorization: tkn ? `Bearer ${tkn}` : ''
      }
    };
  }).concat(httpLink);
};

// TODO clear cache when user logs out
const client = new ApolloClient({
  link: createAuthLink(token),
  cache: new InMemoryCache()
});

export const App = () => {
  return (
    <ErrorBoundary>
      <AppProvider>
        <ApolloProvider client={client}>
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </ApolloProvider>
      </AppProvider>
    </ErrorBoundary>
  );
};
