import React from 'react';
import { Link, Outlet } from 'react-router-dom';

import { PageLayout } from '../../components/PageLayout/PageLayout';

const HomePage = () => (
  <PageLayout>
    <h1>Home page</h1>
    <Link to="/games">Go to games</Link>
    <Outlet />
  </PageLayout>
);

export default HomePage;
