import React from 'react';
import { Link } from 'react-router-dom';

import { PageLayout } from '../../components/PageLayout/PageLayout';

const WordsPage = () => (
  <PageLayout>
    <h1>Words page</h1>
    <Link to="/words/ball">ball</Link>
    <Link to="/words/doll">doll</Link>
  </PageLayout>
);

export default WordsPage;
