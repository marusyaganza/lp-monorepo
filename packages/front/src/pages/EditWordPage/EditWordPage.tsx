import React, { useContext, useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Link, Icon } from '@lp/ui';
import { useLazyQuery } from '@apollo/client';
import styles from './EditWordPage.module.css';
import { getDefaultInitialValues, formConfig, validators } from './formConfig';

import { PageLayout } from '../../components/PageLayout/PageLayout';
import { WordForm } from '../../components/WordForm/WordForm';
import { routes } from '../../constants/routes';
import {
  useUpdateWordMutation,
  UpdateWordInput
} from '../../generated/graphql';
import { AppContext } from '../../app-context/appContext';
import { WORDS_QUERY, WORD_BY_ID_QUERY } from '../../gql/queries';
import { cleanDefs, removeTypenames } from '../../util/wordUtils';

const EditWordPage = () => {
  const { wordId } = useParams();
  const [updateWordFunc, updateWordData] = useUpdateWordMutation({
    update(cache) {
      cache.evict({ fieldName: 'game' });
    }
  });
  const [fetchWord, { loading, error, data }] = useLazyQuery(WORD_BY_ID_QUERY);
  const { setNotification, language } = useContext(AppContext);

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
        subText: error?.message || 'something went wrong',
        sameLocation: true
      });
    }
  }, [error]);

  useEffect(() => {
    if (updateWordData.error) {
      setNotification({
        variant: 'error',
        text: 'Error',
        subText: updateWordData?.error?.message || 'something went wrong',
        sameLocation: true
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
        subText: `Changes for the word ${name} were saved`
      });
      navigate(`/${routes.words}`);
    }
  }, [updateWordData.data]);

  const handleFormSubmit = (values: UpdateWordInput) => {
    const input = cleanDefs(values);
    updateWordFunc({
      variables: { input },
      refetchQueries: () => [
        {
          query: WORDS_QUERY,
          variables: {
            language
          }
        }
      ]
    });
  };

  return (
    <PageLayout>
      <Link className={styles.link} to={`/${routes.words}`}>
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
