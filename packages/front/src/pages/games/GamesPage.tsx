import React from 'react';
import { Link, Outlet } from 'react-router-dom';

import { PageLayout } from '../../components/PageLayout/PageLayout';

const GamesPage = () => (
  <PageLayout>
    <h1>Games page</h1>
    <Link to="/games/audio">Go to audio game</Link>
    <Link to="/games/option">Go to option game</Link>
    <Outlet />
  </PageLayout>
);

export default GamesPage;
