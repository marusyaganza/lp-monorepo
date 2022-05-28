import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const HomePage = lazy(() => import('./pages/home/HomePage'));
const WordsPage = lazy(() => import('./pages/words/WordsPage'));
const WordPage = lazy(() => import('./pages/word/WordPage'));
const GamesPage = lazy(() => import('./pages/games/GamesPage'));
const GamePage = lazy(() => import('./pages/games/game/GamePage'));
const SearchPage = lazy(() => import('./pages/search/SearchPage'));
const NotFoundPage = lazy(() => import('./pages/notFound/NotFoundPage'));

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <HomePage />
              </Suspense>
            }
            index
          />
          <Route
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <SearchPage />
              </Suspense>
            }
            path="search"
          />
          <Route path="words">
            <Route
              index
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <WordsPage />
                </Suspense>
              }
            />
            <Route
              path=":wordId"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <WordPage />
                </Suspense>
              }
            />
          </Route>
          <Route path="games">
            <Route
              index
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <GamesPage />
                </Suspense>
              }
            />
            <Route
              path=":gameId"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <GamePage />
                </Suspense>
              }
            />
          </Route>
          <Route
            path="*"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <NotFoundPage />
              </Suspense>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
