import React from 'react';

import { PageLayout } from '../../components/PageLayout/PageLayout';
import { WordForm } from '../../components/WordForm/WordForm';

const NewWordPage = () => {
  return (
    <PageLayout>
      <h1>Add new word </h1>
      <WordForm
        onSubmit={val => {
          console.log('values', val);
        }}
      />
    </PageLayout>
  );
};

export default NewWordPage;
