import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const GamesPage = () => (
  <>
    <h1>Games page</h1>
    <Link to="/games/audio">Go to audio game</Link>
    <Link to="/games/option">Go to option game</Link>
    <Outlet />
  </>
);

export default GamesPage;
