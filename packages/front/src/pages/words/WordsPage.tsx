import React from 'react';
import { Link } from 'react-router-dom';

const WordsPage = () => (
  <>
    <h1>Words page</h1>
    <Link to="/words/ball">ball</Link>
    <Link to="/words/doll">doll</Link>
  </>
);

export default WordsPage;
