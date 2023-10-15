import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link, Icon } from '@lp/ui';
import styles from './NewWordPage.module.css';

import { PageLayout } from '../../components/PageLayout/PageLayout';
import { WordForm } from '../../components/WordForm/WordForm';
import { routes } from '../../constants/routes';
import { NewWordInput, useSaveWordMutation } from '../../generated/graphql';
import { AppContext } from '../../app-context/appContext';
import { defaultInitialValues, formConfig, validators } from './formConfig';
import { cleanDefs } from '../../util/wordUtils';

const NewWordPage = () => {
  const [saveWordFunc, saveWordData] = useSaveWordMutation({
    update(cache) {
      cache.evict({ fieldName: 'game' });
      cache.evict({ fieldName: 'words' });
    }
  });
  const { setNotification, language } = useContext(AppContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (saveWordData.error) {
      setNotification({
        variant: 'error',
        text: 'Error',
        subText: saveWordData?.error?.message || 'something went wrong',
        sameLocation: true
      });
    }
  }, [saveWordData.error]);

  useEffect(() => {
    const { data } = saveWordData;
    if (data) {
      const { name } = data.saveWord;
      setNotification({
        variant: 'success',
        text: 'Word added',
        subText: `${name} is added successfully.`
      });
      navigate(`/${routes.words}`);
    }
  }, [saveWordData.data]);

  const handleFormSubmit = (values: NewWordInput) => {
    const input = { ...cleanDefs(values), language };
    saveWordFunc({
      variables: { input }
    });
  };

  return (
    <PageLayout>
      <Link data-cy="backLink" className={styles.link} to={`/${routes.words}`}>
        <Icon width={16} height={16} id="arrow-left" />
        Back to vocabulary
      </Link>
      <h1 className={styles.mainHeading}>Add new word</h1>
      <WordForm
        initialValues={defaultInitialValues}
        formConfig={formConfig}
        validators={validators}
        onSubmit={handleFormSubmit}
      />
    </PageLayout>
  );
};

export default NewWordPage;
