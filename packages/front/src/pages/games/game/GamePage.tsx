import React from 'react';
import { useParams } from 'react-router-dom';

const GamePage = () => {
  const params = useParams();
  return (
    <>
      <h1>Game page: {params.gameId}</h1>
    </>
  );
};

export default GamePage;
