import React, { useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Link, Icon, EditWordForm, Spinner } from '@lp/ui';
import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import styles from './EditWordPage.module.css';

import { PageLayout } from '../../components/PageLayout/PageLayout';
import { routes } from '../../constants/routes';
import {
  TagsQuery,
  UpdateWordInput,
  WordByIdQuery
} from '../../generated/graphql';
import { AppContext } from '../../app-context/appContext';
import { TAGS_QUERY, WORD_BY_ID_QUERY } from '../../gql/queries';
import { UPDATE_WORD_MUTATION } from '../../gql/mutations';

const EditWordPage = () => {
  const { wordId } = useParams();
  const [updateWordFunc, updateWordData] = useMutation(UPDATE_WORD_MUTATION, {
    update(cache) {
      cache.evict({ fieldName: 'game' });
      cache.evict({ fieldName: 'wordsPerPage' });
    }
  });
  const [fetchWord, { loading, error, data }] =
    useLazyQuery<WordByIdQuery>(WORD_BY_ID_QUERY);
  const { setNotification, language } = useContext(AppContext);

  const tagsData = useQuery<TagsQuery>(TAGS_QUERY, {
    variables: { language }
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetchWord({
      variables: { wordId }
    });
  }, [wordId]);

  useEffect(() => {
    if (error) {
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
    updateWordFunc({
      variables: { input: values },
      update(cache) {
        cache.evict({ fieldName: 'game' });
        cache.evict({ fieldName: 'wordsPerPage' });
      }
    });
  };

  const renderForm = () => {
    const isLoading = loading || tagsData?.loading;
    if (isLoading) {
      return <Spinner />;
    }
    const tags = tagsData?.data?.tags;
    const word = data?.word;
    if (!word || !tags) {
      return;
    }
    return (
      <EditWordForm
        word={word}
        tags={tags}
        onSubmit={handleFormSubmit}
        language={language}
      />
    );
  };

  return (
    <PageLayout>
      <Link data-cy="backLink" className={styles.link} to={`/${routes.words}`}>
        <Icon width={16} height={16} id="arrow-left" />
        Back to vocabulary
      </Link>
      {renderForm()}
    </PageLayout>
  );
};

export default EditWordPage;
