import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { TAGS_QUERY } from '../../gql/queries';
import {
  UPDATE_TAG_MUTATION,
  CREATE_TAG_MUTATION,
  DELETE_TAG_MUTATION
} from '../../gql/mutations';
import {
  Language,
  TagsQuery,
  UpdateWordTagInput
} from '../../generated/graphql';

import { Button, Tag, TagsForm, TagsFormValues, useModal } from '@lp/ui';
import { PageLayout } from '../../components/PageLayout/PageLayout';
import { DeleteConfirnation } from '../../components/DeleteConfirnation/DeleteConfirnation';
import { useNotificationContext, useLanguageContext } from '../../app-context';
import { removeTypenames } from '../../util/wordUtils';

import styles from './TagsPage.module.css';
import { getStoredData, storeData } from '../../util/localStorageUtils';

const filterData = (
  id: string,
  dataName: 'tags' | 'gameTags',
  language: Language
) => {
  const storedData = getStoredData(dataName);

  if (!storedData?.[language]?.length) {
    return;
  }
  storedData[language] = storedData?.[language]?.filter(tag => tag != id);
  storeData(dataName, storedData);
};

const cleanUpDeletedTags = (id: string, language: Language) => {
  filterData(id, 'tags', language);
  filterData(id, 'gameTags', language);
};

export const TagsPage = () => {
  const { setNotification } = useNotificationContext();
  const { language } = useLanguageContext();

  const [currentTag, setCurrentTag] = useState<
    UpdateWordTagInput | undefined
  >();
  const [tagToDelete, setTagToDelete] = useState<
    { text?: string; id?: string } | undefined
  >();
  const [showNewTagForm, setShowNewTagForm] = useState(false);

  const { Modal, openModal, closeModal } = useModal();

  const { error, loading, data } = useQuery<TagsQuery>(TAGS_QUERY, {
    variables: { language }
  });

  const [updateTagFunc, updateTagData] = useMutation(UPDATE_TAG_MUTATION, {
    update(cache) {
      cache.evict({ fieldName: 'game' });
      cache.evict({ fieldName: 'wordsPerPage' });
      cache.evict({ fieldName: 'tags' });
    }
  });

  const [deleteTagFunc, deleteTagData] = useMutation(DELETE_TAG_MUTATION, {
    update(cache) {
      cache.evict({ fieldName: 'game' });
      cache.evict({ fieldName: 'wordsPerPage' });
      cache.evict({ fieldName: 'tags' });
    }
  });

  const [createTagFunc, createTagData] = useMutation(CREATE_TAG_MUTATION, {
    update(cache) {
      cache.evict({ fieldName: 'game' });
      cache.evict({ fieldName: 'wordsPerPage' });
      cache.evict({ fieldName: 'tags' });
    }
  });

  const getUpdateFormHandler = (id: string) => {
    return function submitUpdateTag(values: TagsFormValues) {
      const mutationFunc = updateTagFunc;
      const input: UpdateWordTagInput = { ...values, id };
      mutationFunc({
        variables: { input },
        update(cache) {
          cache.evict({ fieldName: 'game' });
          cache.evict({ fieldName: 'wordsPerPage' });
          cache.evict({ fieldName: 'tags' });
        }
      });
    };
  };

  const handleNewTagFormSubmit = (values: TagsFormValues) => {
    const mutationFunc = createTagFunc;
    mutationFunc({
      variables: { input: { ...values, language } }
    });
  };

  const renderTags = () => {
    const tags = data?.tags;
    if (!tags) {
      return;
    }

    return tags.map(tag => {
      const { id, text, desc } = tag;
      return (
        <div key={id} data-cy={`tag-${text}`}>
          <div className={styles.tag}>
            <div className={styles.tagDisplay}>
              <Tag {...tag} />
            </div>
            {desc && (
              <p data-cy="tag-desc" className={styles.desc}>
                {desc}
              </p>
            )}
            <div className={styles.buttons}>
              <Button
                data-cy="edit-btn"
                variant="icon"
                iconId="edit"
                iconHeight={30}
                iconWidth={30}
                onClick={getEditButtonHandler(id)}
              >
                Edit
              </Button>
              <Button
                data-cy="delete-btn"
                iconId="eraser"
                variant="icon"
                iconHeight={30}
                iconWidth={30}
                onClick={getDeleteButtonHandler({
                  text,
                  id
                })}
              >
                Delete
              </Button>
            </div>
          </div>
          {currentTag?.id === id && (
            <TagsForm
              onSubmit={getUpdateFormHandler(tag?.id)}
              onCancel={() => {
                setCurrentTag(undefined);
              }}
              initialValues={tag}
            />
          )}
        </div>
      );
    });
  };

  const getEditButtonHandler = (id?: string) => {
    return function editTag() {
      const tag = data?.tags?.find(tag => tag?.id === id) as UpdateWordTagInput;
      setCurrentTag(removeTypenames(tag));
    };
  };

  const getDeleteButtonHandler = (tagInfo: { text?: string; id?: string }) => {
    return function deleteTag() {
      setTagToDelete(tagInfo);
    };
  };

  const handleDeleteTag = () => {
    closeModal();
    deleteTagFunc({ variables: { deleteTagId: tagToDelete?.id } });
  };

  const handleDeleteCancel = () => {
    closeModal();
    setTagToDelete(undefined);
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
    if (deleteTagData?.error) {
      setNotification({
        variant: 'error',
        text: 'Error',
        subText: deleteTagData?.error?.message || 'something went wrong'
      });
    }
  }, [deleteTagData?.error]);

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
    const { data } = deleteTagData;

    if (data?.deleteTag) {
      const id = data?.deleteTag?.id;
      cleanUpDeletedTags(id, language);

      setNotification({
        variant: 'success',
        text: 'Tag deleted',
        subText: `${data?.deleteTag?.text} was deleted`
      });
    }
  }, [deleteTagData.data, language]);

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

  useEffect(() => {
    if (tagToDelete) {
      openModal();
    }
  }, [tagToDelete]);

  const isLoading = loading || updateTagData?.loading;

  const showTagsFormHandler = () => {
    setShowNewTagForm(prev => !prev);
  };

  return (
    <>
      <PageLayout className={styles.tagsPage} isLoading={isLoading}>
        <h1 className={styles.mainHeading}>Manage your tags</h1>
        <>
          <div>{renderTags()}</div>
          <section className={styles.newTagContainer}>
            <Button
              data-cy="new-tag-btn"
              variant="tertiary"
              isActionButton
              iconId="plus"
              onClick={showTagsFormHandler}
            >
              Create new tag
            </Button>
            {showNewTagForm && (
              <TagsForm
                className={styles.newTagForm}
                onSubmit={handleNewTagFormSubmit}
                onCancel={showTagsFormHandler}
              />
            )}
          </section>
        </>
      </PageLayout>
      <Modal>
        <DeleteConfirnation
          onCancel={handleDeleteCancel}
          onDelete={handleDeleteTag}
        >
          <p>
            Are you sure you want to delete the tag{' '}
            <span className={styles.boldText}>{tagToDelete?.text}</span>?
          </p>
        </DeleteConfirnation>
      </Modal>
    </>
  );
};

export default TagsPage;
