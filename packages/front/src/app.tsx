import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { PageSpinner } from './components/PageSpinner/PageSpinner';
import { AppProvider } from './app-context/appContext';
import { getUserData } from './util/getUserData';
import { ErrorBoundary } from '@lp/ui';

import { routes } from '../constants/routes';

import './app.css';

const HomePage = lazy(() => import('./pages/home/HomePage'));
const WordsPage = lazy(() => import('./pages/words/WordsPage'));
const WordPage = lazy(() => import('./pages/words/word/WordPage'));
const NewWordPage = lazy(() => import('./pages/NewWordPage/NewWordPage'));
const GamesPage = lazy(() => import('./pages/games/GamesPage'));
const GamePage = lazy(() => import('./pages/games/game/GamePage'));
const SearchPage = lazy(() => import('./pages/search/SearchPage'));
const NotFoundPage = lazy(() => import('./pages/notFound/NotFoundPage'));
const SignInPage = lazy(() => import('./pages/sign-in/SignInPage'));
const SignUpPage = lazy(() => import('./pages/sign-up/SignUpPage'));
const ProfilePage = lazy(() => import('./pages/profile/ProfilePage'));

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

//TODO refactor routes and reduce code duplication
export const App = () => {
  return (
    <ErrorBoundary>
      <AppProvider>
        <ApolloProvider client={client}>
          <BrowserRouter>
            <Routes>
              <Route path="/">
                <Route
                  element={
                    <Suspense fallback={<PageSpinner />}>
                      <HomePage />
                    </Suspense>
                  }
                  index
                />
                <Route
                  element={
                    <Suspense fallback={<PageSpinner />}>
                      <SearchPage />
                    </Suspense>
                  }
                  path={routes.search}
                />
                <Route
                  element={
                    <Suspense fallback={<PageSpinner />}>
                      <SignInPage />
                    </Suspense>
                  }
                  path={routes.signIn}
                />
                <Route
                  element={
                    <Suspense fallback={<PageSpinner />}>
                      <ProfilePage />
                    </Suspense>
                  }
                  path={routes.profile}
                />
                <Route
                  element={
                    <Suspense fallback={<PageSpinner />}>
                      <SignUpPage />
                    </Suspense>
                  }
                  path={routes.signUp}
                />
                <Route path={routes.words}>
                  <Route
                    index
                    element={
                      <Suspense fallback={<PageSpinner />}>
                        <WordsPage />
                      </Suspense>
                    }
                  />
                  <Route
                    path=":wordId"
                    element={
                      <Suspense fallback={<PageSpinner />}>
                        <WordPage />
                      </Suspense>
                    }
                  />
                </Route>
                <Route path={routes.games}>
                  <Route
                    index
                    element={
                      <Suspense fallback={<PageSpinner />}>
                        <GamesPage />
                      </Suspense>
                    }
                  />
                  <Route
                    path=":gameId"
                    element={
                      <Suspense fallback={<PageSpinner />}>
                        <GamePage />
                      </Suspense>
                    }
                  />
                </Route>
                <Route
                  path="*"
                  element={
                    <Suspense fallback={<PageSpinner />}>
                      <NotFoundPage />
                    </Suspense>
                  }
                />
              </Route>
            </Routes>
          </BrowserRouter>
        </ApolloProvider>
      </AppProvider>
    </ErrorBoundary>
  );
};
