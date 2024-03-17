import React, { useContext, useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { TAGS_QUERY, WORDS_QUERY } from '../../gql/queries';
import { UPDATE_TAG, CREATE_TAG } from '../../gql/mutations';
import {
  TagsQuery,
  UpdateWordTagInput,
  WordTagInput
} from '../../generated/graphql';
import { Button, Tag } from '@lp/ui';
import { PageLayout } from '../../components/PageLayout/PageLayout';
import { TagsForm } from '../../components/TagsForm/TagsForm';
import { AppContext } from '../../app-context/appContext';
import { removeTypenames } from '../../util/wordUtils';

import styles from './TagsPage.module.css';

export const TagsPage = () => {
  const { error, loading, data } = useQuery<TagsQuery>(TAGS_QUERY);
  const { setNotification, language } = useContext(AppContext);
  const [currentTag, setCurrentTag] = useState<
    UpdateWordTagInput | undefined
  >();

  const [showNewTagForm, setShowNewTagForm] = useState(false);

  const [updateTagFunc, updateTagData] = useMutation(UPDATE_TAG, {
    update(cache) {
      cache.evict({ fieldName: 'game' });
      cache.evict({ fieldName: 'words' });
      cache.evict({ fieldName: 'tags' });
    }
  });

  const [createTagFunc, createTagData] = useMutation(CREATE_TAG, {
    update(cache) {
      cache.evict({ fieldName: 'game' });
      cache.evict({ fieldName: 'words' });
      cache.evict({ fieldName: 'tags' });
    }
  });

  const renderTags = () => {
    const tags = data?.tags;
    if (!tags) {
      return;
    }

    return tags.map(tag => (
      <div key={tag?.id}>
        <div className={styles.tag}>
          <div className={styles.tagDisplay}>
            <Tag {...tag} />
          </div>
          {tag?.desc && <p className={styles.desc}>{tag?.desc}</p>}
          <div className={styles.buttons}>
            <Button
              variant="icon"
              iconId="edit"
              iconHeight={30}
              iconWidth={30}
              onClick={getEditButtonHandler(tag?.id)}
            >
              Edit
            </Button>
            <Button
              iconId="eraser"
              variant="icon"
              iconHeight={30}
              iconWidth={30}
            >
              Delete
            </Button>
          </div>
        </div>
        {currentTag?.id === tag?.id && (
          <TagsForm<UpdateWordTagInput>
            onSubmit={handleFormSubmit}
            onCancel={() => {
              setCurrentTag(undefined);
            }}
            // @ts-ignore
            initialValues={removeTypenames(tag)}
          />
        )}
      </div>
    ));
  };

  const handleFormSubmit = (values: UpdateWordTagInput) => {
    const mutationFunc = updateTagFunc;
    const input = removeTypenames(values);
    mutationFunc({
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

  const handleNewTagFormSubmit = (values: WordTagInput) => {
    const mutationFunc = createTagFunc;
    mutationFunc({
      variables: { input: values },
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

  const getEditButtonHandler = (id?: string) => {
    return function editTag() {
      const tag = data?.tags?.find(tag => tag?.id === id) as UpdateWordTagInput;
      setCurrentTag(removeTypenames(tag));
    };
  };

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
    if (updateTagData?.error) {
      setNotification({
        variant: 'error',
        text: 'Error',
        subText: error?.message || 'something went wrong'
      });
    }
  }, [updateTagData?.error]);

  useEffect(() => {
    if (createTagData?.error) {
      setNotification({
        variant: 'error',
        text: 'Error',
        subText: error?.message || 'something went wrong'
      });
    }
  }, [createTagData?.error]);

  useEffect(() => {
    const { data } = updateTagData;
    if (data?.updateTag) {
      setNotification({
        variant: 'success',
        text: 'Tag updated',
        subText: data?.updateTag
      });
      setCurrentTag(undefined);
    }
  }, [updateTagData.data]);

  useEffect(() => {
    const { data } = createTagData;
    if (data?.createTag) {
      setNotification({
        variant: 'success',
        text: 'Tag created',
        subText: data?.createTag
      });
      setShowNewTagForm(false);
    }
  }, [createTagData.data]);

  const isLoading = loading || updateTagData?.loading;

  const showTagsFormHandler = () => {
    setShowNewTagForm(prev => !prev);
  };

  return (
    <PageLayout className={styles.tagsPage} isLoading={isLoading}>
      <h1 className={styles.mainHeading}>Manage your tags</h1>
      <>
        <div>{renderTags()}</div>
        <section className={styles.newTagContainer}>
          <Button
            variant="tertiary"
            isActionButton
            iconId="plus"
            onClick={showTagsFormHandler}
          >
            Create new tag
          </Button>
          {showNewTagForm && (
            <TagsForm
              onSubmit={handleNewTagFormSubmit}
              onCancel={showTagsFormHandler}
            />
          )}
        </section>
      </>
    </PageLayout>
  );
};

export default TagsPage;
