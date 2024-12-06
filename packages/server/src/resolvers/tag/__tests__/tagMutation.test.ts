import {
  createTestServer,
  getDataFromGQL,
  getErrorMessageFromGQL
} from '../../../tests/helpers';
import {
  updateTagMutation,
  createTagMutation,
  deleteTagMutation
} from '../../../tests/mocks/gqlMutations';
import { models } from '../../../tests/mocks/mockModels';
import { testData } from '../../../tests/mocks/dbTestData';
import { ERROR_MESSAGES } from '../../../constants/errorMessages';

const user = { id: 'userId' };

describe('tag mutations', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  afterAll(() => {
    jest.resetAllMocks();
  });

  const deleteTagId = 'deleteTagId';

  test('delete tag', async () => {
    const deleteOne = jest.fn(() => ({
      ok: true,
      value: { ...testData.createTagInput, id: deleteTagId }
    }));
    const { mutate } = createTestServer({
      user,
      models: {
        ...models,
        WordTag: {
          deleteOne
        }
      }
    });

    const res = await mutate({
      mutation: deleteTagMutation,
      variables: {
        deleteTagId
      }
    });
    expect(getDataFromGQL(res).deleteTag).toEqual({
      ...testData.createTagInput,
      id: deleteTagId
    });
    expect(getErrorMessageFromGQL(res)).toEqual(undefined);
    expect(deleteOne).toHaveBeenCalledWith(deleteTagId, user.id);
  });

  test('delete tag if operation fails', async () => {
    const deleteOne = jest.fn(() => ({ ok: false }));
    const { mutate } = createTestServer({
      user,
      models: {
        ...models,
        WordTag: {
          deleteOne
        }
      }
    });

    const res = await mutate({
      mutation: deleteTagMutation,
      variables: {
        deleteTagId
      }
    });
    expect(getErrorMessageFromGQL(res)).toEqual(
      'deleting tag with id deleteTagId failed'
    );
    expect(deleteOne).toHaveBeenCalledWith(deleteTagId, user.id);
  });

  test('delete tag if operation result is undefined', async () => {
    const { mutate } = createTestServer({
      user,
      models
    });

    const res = await mutate({
      mutation: deleteTagMutation,
      variables: {
        deleteTagId
      }
    });
    expect(getErrorMessageFromGQL(res)).toEqual(
      'deleting tag with id deleteTagId failed'
    );
    expect(models.WordTag.deleteOne).toHaveBeenCalledWith(deleteTagId, user.id);
  });

  test('delete tag if user is not defined', async () => {
    const deleteOne = jest.fn(() => ({ ok: true }));
    const { mutate } = createTestServer({
      models: {
        ...models,
        WordTag: {
          deleteOne
        }
      }
    });

    const res = await mutate({
      mutation: deleteTagMutation,
      variables: {
        deleteTagId
      }
    });
    expect(getErrorMessageFromGQL(res)).toEqual(ERROR_MESSAGES.NOT_AUTHORIZED);
    expect(deleteOne).toHaveBeenCalledTimes(0);
  });

  test('delete tag if user is not found', async () => {
    // @ts-expect-error: ts do not hanle this mocking case
    models.User.findOne.mockReturnValueOnce(null);
    const deleteOne = jest.fn(() => ({ ok: true }));
    const { mutate } = createTestServer({
      user,
      models: {
        ...models,
        WordTag: {
          deleteOne
        }
      }
    });

    const res = await mutate({
      mutation: deleteTagMutation,
      variables: {
        deleteTagId
      }
    });
    expect(getErrorMessageFromGQL(res)).toEqual(ERROR_MESSAGES.NOT_AUTHORIZED);
    expect(deleteOne).toHaveBeenCalledTimes(0);
  });

  test('create tag', async () => {
    // @ts-expect-error: ts do not hanle this mocking case
    models.WordTag.findOne.mockReturnValueOnce(null);
    const { mutate } = createTestServer({
      user,
      models
    });

    const res = await mutate({
      mutation: createTagMutation,
      variables: {
        input: {
          ...testData.createTagInput
        }
      }
    });
    expect(getDataFromGQL(res).createTag).toEqual(
      'tag Tag text was created successfully'
    );
    expect(getErrorMessageFromGQL(res)).toEqual(undefined);
    // expect(res.body.singleResult.errors).not.toBeDefined();
    expect(models.WordTag.createOne).toHaveBeenCalledWith(
      testData.createTagInput,
      user.id
    );
  });

  test('create tag if operation fails', async () => {
    // @ts-expect-error: ts do not hanle this mocking case
    models.WordTag.findOne.mockReturnValueOnce(null);
    // @ts-expect-error: ts do not hanle this mocking case
    models.WordTag.createOne.mockReturnValueOnce(null);
    const { mutate } = createTestServer({
      user,
      models
    });

    const res = await mutate({
      mutation: createTagMutation,
      variables: {
        input: {
          ...testData.createTagInput
        }
      }
    });
    expect(getErrorMessageFromGQL(res)).toEqual(
      'creating tag operation failed'
    );
    expect(models.WordTag.createOne).toHaveBeenCalledWith(
      testData.createTagInput,
      user.id
    );
  });

  test('not create tag if user is not defined', async () => {
    const { mutate } = createTestServer({
      models
    });

    const res = await mutate({
      mutation: createTagMutation,
      variables: {
        input: {
          ...testData.createTagInput
        }
      }
    });
    expect(getErrorMessageFromGQL(res)).toEqual(ERROR_MESSAGES.NOT_AUTHORIZED);
    expect(models.User.findOne).toHaveBeenCalledTimes(0);
    expect(models.WordTag.createOne).toHaveBeenCalledTimes(0);
  });

  test('not create tag if user is not found', async () => {
    // @ts-expect-error: ts do not hanle this mocking case
    models.User.findOne.mockReturnValueOnce(null);
    const { mutate } = createTestServer({
      user,
      models
    });

    const res = await mutate({
      mutation: createTagMutation,
      variables: {
        input: {
          ...testData.createTagInput
        }
      }
    });
    expect(getErrorMessageFromGQL(res)).toEqual(ERROR_MESSAGES.NOT_AUTHORIZED);
    expect(models.WordTag.createOne).toHaveBeenCalledTimes(0);
  });

  test('create tag if tag exists', async () => {
    // @ts-expect-error: ts do not hanle this mocking case
    models.WordTag.findOne.mockReturnValueOnce(testData.createTagInput);
    const { mutate } = createTestServer({
      user,
      models
    });

    const res = await mutate({
      mutation: createTagMutation,
      variables: {
        input: {
          ...testData.createTagInput
        }
      }
    });
    expect(getErrorMessageFromGQL(res)).toEqual(
      'tag with text Tag text is already added'
    );
    expect(models.Word.createOne).toHaveBeenCalledTimes(0);
  });

  test('update tag', async () => {
    const updateOne = jest.fn(() => ({
      ok: true,
      value: { ...testData.createTagInput, user: user.id }
    }));
    const { mutate } = createTestServer({
      user,
      models: {
        ...models,
        WordTag: {
          updateOne
        }
      }
    });

    const res = await mutate({
      mutation: updateTagMutation,
      variables: {
        input: { ...testData.updateTagInput, id: '1' }
      }
    });
    expect(getDataFromGQL(res).updateTag).toEqual('tag Tag text was updated');
    expect(getErrorMessageFromGQL(res)).toEqual(undefined);
    expect(updateOne).toHaveBeenCalledWith(
      {
        ...testData.updateTagInput,
        id: '1'
      },
      user.id
    );
  });

  test('update tag if operation fails', async () => {
    const updateOne = jest.fn(() => ({ ok: false }));
    const { mutate } = createTestServer({
      user,
      models: {
        ...models,
        WordTag: {
          updateOne
        }
      }
    });

    const res = await mutate({
      mutation: updateTagMutation,
      variables: {
        input: { ...testData.updateTagInput, id: '1' }
      }
    });
    expect(getErrorMessageFromGQL(res)).toEqual(
      'updating tag with id 1 failed'
    );
    expect(updateOne).toHaveBeenCalledWith(
      {
        ...testData.updateTagInput,
        id: '1'
      },
      user.id
    );
  });

  test('update tag if operation result is undefined', async () => {
    const { mutate } = createTestServer({
      user,
      models
    });

    const res = await mutate({
      mutation: updateTagMutation,
      variables: {
        input: { ...testData.updateTagInput, id: '1' }
      }
    });
    expect(getErrorMessageFromGQL(res)).toEqual(
      'updating tag with id 1 failed'
    );
    expect(models.WordTag.updateOne).toHaveBeenCalledWith(
      {
        ...testData.updateTagInput,
        id: '1'
      },
      user.id
    );
  });

  test('update tag if user is not defined', async () => {
    const updateOne = jest.fn(() => ({ ok: true }));
    const { mutate } = createTestServer({
      models: {
        ...models,
        WordTag: {
          updateOne
        }
      }
    });

    const res = await mutate({
      mutation: updateTagMutation,
      variables: {
        input: { ...testData.updateTagInput, id: '1' }
      }
    });
    expect(getErrorMessageFromGQL(res)).toEqual(ERROR_MESSAGES.NOT_AUTHORIZED);
    expect(updateOne).toHaveBeenCalledTimes(0);
  });
});
