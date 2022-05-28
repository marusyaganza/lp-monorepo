import React from 'react';
import { useParams } from 'react-router-dom';

const WordPage = () => {
  const params = useParams();
  return (
    <>
      <h1>Word page: {params.wordId}</h1>
    </>
  );
};

export default WordPage;
