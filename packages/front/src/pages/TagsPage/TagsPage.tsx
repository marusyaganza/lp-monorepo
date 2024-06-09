import React, { useContext, useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { TAGS_QUERY } from '../../gql/queries';
import { UPDATE_TAG, CREATE_TAG, DELETE_TAG } from '../../gql/mutations';
import {
  Language,
  TagsQuery,
  UpdateWordTagInput,
  WordTagInput
} from '../../generated/graphql';
import { Button, Tag, useModal } from '@lp/ui';
import { PageLayout } from '../../components/PageLayout/PageLayout';
import { TagsForm } from '../../components/TagsForm/TagsForm';
import { DeleteConfirnation } from '../../components/DeleteConfirnation/DeleteConfirnation';
import { AppContext } from '../../app-context/appContext';
import { removeTypenames } from '../../util/wordUtils';

import styles from './TagsPage.module.css';
import {
  TagDataType,
  getStoredData,
  storeData
} from '../../util/localStorageUtils';

const filterData = (
  id: string,
  dataName: 'tags' | 'gameTags',
  language: Language
) => {
  const storedData: TagDataType | undefined = getStoredData<
    'tags' | 'gameTags'
  >(dataName);

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
  const { setNotification, language } = useContext(AppContext);
  const { error, loading, data } = useQuery<TagsQuery>(TAGS_QUERY, {
    variables: { language }
  });
  const [currentTag, setCurrentTag] = useState<
    UpdateWordTagInput | undefined
  >();

  const [tagToDelete, setTagToDelete] = useState<
    { text?: string; id?: string } | undefined
  >();

  const { Modal, openModal, closeModal } = useModal();

  const [showNewTagForm, setShowNewTagForm] = useState(false);

  const [updateTagFunc, updateTagData] = useMutation(UPDATE_TAG, {
    update(cache) {
      cache.evict({ fieldName: 'game' });
      cache.evict({ fieldName: 'wordsPerPage' });
      cache.evict({ fieldName: 'tags' });
    }
  });

  const [deleteTagFunc, deleteTagData] = useMutation(DELETE_TAG, {
    update(cache) {
      cache.evict({ fieldName: 'game' });
      cache.evict({ fieldName: 'wordsPerPage' });
      cache.evict({ fieldName: 'tags' });
    }
  });

  const [createTagFunc, createTagData] = useMutation(CREATE_TAG, {
    update(cache) {
      cache.evict({ fieldName: 'game' });
      cache.evict({ fieldName: 'wordsPerPage' });
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
              onClick={getDeleteButtonHandler({ text: tag?.text, id: tag?.id })}
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
      update(cache) {
        cache.evict({ fieldName: 'game' });
        cache.evict({ fieldName: 'wordsPerPage' });
      }
    });
  };

  const handleNewTagFormSubmit = (values: WordTagInput) => {
    const mutationFunc = createTagFunc;
    mutationFunc({
      variables: { input: { ...values, language } }
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
