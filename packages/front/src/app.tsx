import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Spinner } from '../../ui/src/components/Spinner/Spinner';
import { AppProvider } from './app-context/appContext';
import { setContext } from '@apollo/client/link/context';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink
} from '@apollo/client';

import { getUserData } from './util/getUserData';

import './app.css';

const HomePage = lazy(() => import('./pages/home/HomePage'));
const WordsPage = lazy(() => import('./pages/words/WordsPage'));
const WordPage = lazy(() => import('./pages/words/word/WordPage'));
const GamesPage = lazy(() => import('./pages/games/GamesPage'));
const GamePage = lazy(() => import('./pages/games/game/GamePage'));
const SearchPage = lazy(() => import('./pages/search/SearchPage'));
const NotFoundPage = lazy(() => import('./pages/notFound/NotFoundPage'));
const SignInPage = lazy(() => import('./pages/sign-in/SignInPage'));

const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql'
});

const token = getUserData()?.token;

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

export const App = () => {
  return (
    <AppProvider>
      <ApolloProvider client={client}>
        <BrowserRouter>
          <Routes>
            <Route path="/">
              <Route
                element={
                  <Suspense fallback={<Spinner />}>
                    <HomePage />
                  </Suspense>
                }
                index
              />
              <Route
                element={
                  <Suspense fallback={<Spinner />}>
                    <SearchPage />
                  </Suspense>
                }
                path="search"
              />
              <Route
                element={
                  <Suspense fallback={<Spinner />}>
                    <SignInPage />
                  </Suspense>
                }
                path="sign-in"
              />
              <Route path="words">
                <Route
                  index
                  element={
                    <Suspense fallback={<Spinner />}>
                      <WordsPage />
                    </Suspense>
                  }
                />
                <Route
                  path=":wordId"
                  element={
                    <Suspense fallback={<Spinner />}>
                      <WordPage />
                    </Suspense>
                  }
                />
              </Route>
              <Route path="games">
                <Route
                  index
                  element={
                    <Suspense fallback={<Spinner />}>
                      <GamesPage />
                    </Suspense>
                  }
                />
                <Route
                  path=":gameId"
                  element={
                    <Suspense fallback={<Spinner />}>
                      <GamePage />
                    </Suspense>
                  }
                />
              </Route>
              <Route
                path="*"
                element={
                  <Suspense fallback={<Spinner />}>
                    <NotFoundPage />
                  </Suspense>
                }
              />
            </Route>
          </Routes>
        </BrowserRouter>
      </ApolloProvider>
    </AppProvider>
  );
};
