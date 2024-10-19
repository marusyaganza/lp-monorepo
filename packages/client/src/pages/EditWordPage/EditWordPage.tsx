import React, { useContext, useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Link, Icon } from '@lp/ui';
import { useLazyQuery, useMutation } from '@apollo/client';
import styles from './EditWordPage.module.css';
import { getDefaultInitialValues, formConfig, validators } from './formConfig';

import { PageLayout } from '../../components/PageLayout/PageLayout';
import { WordForm } from '../../components/WordForm/WordForm';
import { routes } from '../../constants/routes';
import { UpdateWordInput } from '../../generated/graphql';
import { AppContext } from '../../context/appContext';
import { WORD_BY_ID_QUERY } from '../../gql/queries';
import { cleanDefs, removeTypenames } from '../../util/wordUtils';
import { UPDATE_WORD } from '../../gql/mutations';

const EditWordPage = () => {
  const { wordId } = useParams();
  const [updateWordFunc, updateWordData] = useMutation(UPDATE_WORD, {
    update(cache) {
      cache.evict({ fieldName: 'game' });
      cache.evict({ fieldName: 'wordsPerPage' });
    }
  });
  const [fetchWord, { loading, error, data }] = useLazyQuery(WORD_BY_ID_QUERY);
  const { setNotification } = useContext(AppContext);

  const navigate = useNavigate();

  const initialValues: UpdateWordInput | undefined = useMemo(
    () => getDefaultInitialValues(removeTypenames(data?.word)),
    [data?.word, wordId]
  );

  useEffect(() => {
    fetchWord({
      variables: { wordId }
    });
  }, [wordId]);

  useEffect(() => {
    if (updateWordData.error) {
      setNotification({
        variant: 'error',
        text: 'Error',
        subText: error?.message || 'something went wrong'
      });
    }
  }, [error]);

  useEffect(() => {
    if (updateWordData.error) {
      setNotification({
        variant: 'error',
        text: 'Error',
        subText: updateWordData?.error?.message || 'something went wrong'
      });
    }
  }, [updateWordData.error]);

  useEffect(() => {
    const { data } = updateWordData;
    if (data) {
      const { name } = data.updateWord;
      setNotification({
        variant: 'success',
        text: 'Word updated',
        subText: `Changes for the word ${name} were saved`,
        targetLocation: `/${routes.words}`
      });
      navigate(`/${routes.words}`);
    }
  }, [updateWordData.data]);

  const handleFormSubmit = (values: UpdateWordInput) => {
    const input = cleanDefs(values);
    updateWordFunc({
      variables: { input },
      update(cache) {
        cache.evict({ fieldName: 'game' });
        cache.evict({ fieldName: 'wordsPerPage' });
      }
    });
  };

  return (
    <PageLayout>
      <Link data-cy="backLink" className={styles.link} to={`/${routes.words}`}>
        <Icon width={16} height={16} id="arrow-left" />
        Back to vocabulary
      </Link>
      <h1 className={styles.mainHeading}>Edit word</h1>
      {data && initialValues && (
        <WordForm
          validators={validators}
          initialValues={initialValues}
          // @ts-ignore
          formConfig={formConfig(data.word)}
          isLoading={loading}
          onSubmit={handleFormSubmit}
        />
      )}
    </PageLayout>
  );
};

export default EditWordPage;
