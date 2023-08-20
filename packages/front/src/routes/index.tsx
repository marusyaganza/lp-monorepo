import React, { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

import { withSuspense } from './helpers';
import { routes } from '../constants/routes';

const WordsPage = lazy(() => import('../pages/words/WordsPage'));
const SearchPage = lazy(() => import('../pages/search/SearchPage'));
const WordPage = lazy(() => import('../pages/words/word/WordPage'));
const NewWordPage = lazy(() => import('../pages/NewWordPage/NewWordPage'));
const EditWordPage = lazy(() => import('../pages/EditWordPage/EditWordPage'));
const HomePage = lazy(() => import('../pages/home/HomePage'));
const GamesPage = lazy(() => import('../pages/games/GamesPage'));
const GamePage = lazy(() => import('../pages/games/game/GamePage'));
const NotFoundPage = lazy(() => import('../pages/notFound/NotFoundPage'));
const SignInPage = lazy(() => import('../pages/sign-in/SignInPage'));
const SignUpPage = lazy(() => import('../pages/sign-up/SignUpPage'));
const ProfilePage = lazy(() => import('../pages/profile/ProfilePage'));

export const AppRoutes = () => {
  return (
    <Routes>
      <Route index element={withSuspense(HomePage)} />
      <Route path={routes.search} element={withSuspense(SearchPage)} />
      <Route path={routes.words}>
        <Route index element={withSuspense(WordsPage)} />
        <Route path="review/:wordId" element={withSuspense(WordPage)} />
        <Route path="edit/:wordId" element={withSuspense(EditWordPage)} />
        <Route path="new" element={withSuspense(NewWordPage)} />
      </Route>
      <Route path={routes.games}>
        <Route index element={withSuspense(GamesPage)} />
        <Route path=":gameId" element={withSuspense(GamePage)} />
      </Route>
      <Route path={routes.signIn} element={withSuspense(SignInPage)} />
      <Route path={routes.signUp} element={withSuspense(SignUpPage)} />
      <Route path={routes.profile} element={withSuspense(ProfilePage)} />
      <Route path="*" element={withSuspense(NotFoundPage)} />
    </Routes>
  );
};
