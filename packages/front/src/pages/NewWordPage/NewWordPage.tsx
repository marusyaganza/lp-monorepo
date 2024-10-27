import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link, Icon, NewWordForm, Spinner } from '@lp/ui';
import styles from './NewWordPage.module.css';

import { PageLayout } from '../../components/PageLayout/PageLayout';
import { routes } from '../../constants/routes';
import {
  NewWordInput,
  SaveWordMutation,
  TagsQuery
} from '../../generated/graphql';
import { AppContext } from '../../app-context/appContext';
import { useMutation, useQuery } from '@apollo/client';
import { SAVE_WORD } from '../../gql/mutations';
import { TAGS_QUERY } from '../../gql/queries';

const NewWordPage = () => {
  const [saveWordFunc, saveWordData] = useMutation<SaveWordMutation>(
    SAVE_WORD,
    {
      update(cache) {
        cache.evict({ fieldName: 'game' });
        cache.evict({ fieldName: 'wordsPerPage' });
      }
    }
  );
  const { setNotification, language } = useContext(AppContext);
  const tagsData = useQuery<TagsQuery>(TAGS_QUERY, {
    variables: { language }
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (saveWordData.error) {
      setNotification({
        variant: 'error',
        text: 'Error',
        subText: saveWordData?.error?.message || 'something went wrong'
      });
    }
  }, [saveWordData.error]);

  useEffect(() => {
    if (tagsData.error) {
      setNotification({
        variant: 'error',
        text: 'Error',
        subText: tagsData?.error?.message || 'something went wrong'
      });
    }
  }, [tagsData.error]);

  useEffect(() => {
    const { data } = saveWordData;
    if (data) {
      const { name } = data.saveWord;
      setNotification({
        variant: 'success',
        text: 'Word added',
        subText: `${name} is added successfully.`,
        targetLocation: `/${routes.words}`
      });
      navigate(`/${routes.words}`);
    }
  }, [saveWordData.data]);

  const handleFormSubmit = (values: NewWordInput) => {
    const input = { ...values, language };
    saveWordFunc({
      variables: { input }
    });
  };

  const renderForm = () => {
    const isLoading = saveWordData?.loading || tagsData?.loading;
    if (isLoading) {
      return <Spinner />;
    }
    const tags = tagsData?.data?.tags;

    if (!tags) {
      return;
    }
    return (
      <NewWordForm
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

export default NewWordPage;
