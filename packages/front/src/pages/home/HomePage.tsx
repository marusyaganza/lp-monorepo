import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const HomePage = () => (
  <>
    <h1>Home page</h1>
    <Link to="/games">Go to games</Link>
    <Outlet />
  </>
);

export default HomePage;
