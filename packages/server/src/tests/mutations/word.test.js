import { createTestServer, getErrorMessageFromGQL } from '../helpers';
import { mutations } from '../mocks/gqlMutations';
import { models } from '../mocks/models';
import { testData } from '../mocks/dbTestData';

const user = { id: 'userId' };

describe('word mutations', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  afterAll(() => {
    jest.resetAllMocks();
  });

  test('delete word', async () => {
    const deleteOne = jest.fn(() => ({ ok: true }));
    const { mutate } = createTestServer({
      user,
      models: {
        ...models,
        Word: {
          deleteOne
        }
      }
    });

    const res = await mutate({
      mutation: mutations.deleteWordMutation,
      variables: {
        deleteWordId: 'deleteWordId'
      }
    });
    expect(res).toMatchSnapshot();
    expect(deleteOne).toHaveBeenCalledWith({
      id: 'deleteWordId',
      user: 'userId'
    });
  });

  test('delete word if operation fails', async () => {
    const deleteOne = jest.fn(() => ({ ok: false }));
    const { mutate } = createTestServer({
      user,
      models: {
        ...models,
        Word: {
          deleteOne
        }
      }
    });

    const res = await mutate({
      mutation: mutations.deleteWordMutation,
      variables: {
        deleteWordId: 'deleteWordId'
      }
    });
    expect(getErrorMessageFromGQL(res)).toEqual(
      'deleting word with id deleteWordId failed'
    );
    expect(deleteOne).toHaveBeenCalledWith({
      id: 'deleteWordId',
      user: 'userId'
    });
  });

  test('delete word if operation result is undefined', async () => {
    const { mutate } = createTestServer({
      user,
      models
    });

    const res = await mutate({
      mutation: mutations.deleteWordMutation,
      variables: {
        deleteWordId: 'deleteWordId'
      }
    });
    expect(getErrorMessageFromGQL(res)).toEqual(
      'deleting word with id deleteWordId failed'
    );
    expect(models.Word.deleteOne).toHaveBeenCalledWith({
      id: 'deleteWordId',
      user: 'userId'
    });
  });

  test('delete word if user is not defined', async () => {
    const deleteOne = jest.fn(() => ({ ok: true }));
    const { mutate } = createTestServer({
      models: {
        ...models,
        Word: {
          deleteOne
        }
      }
    });

    const res = await mutate({
      mutation: mutations.deleteWordMutation,
      variables: {
        deleteWordId: 'deleteWordId'
      }
    });
    expect(getErrorMessageFromGQL(res)).toEqual(
      'You do not have permission to perform this operation'
    );
    expect(deleteOne).toHaveBeenCalledTimes(0);
  });

  test('delete word if user is not found', async () => {
    models.User.findOne.mockReturnValueOnce(null);
    const deleteOne = jest.fn(() => ({ ok: true }));
    const { mutate } = createTestServer({
      user,
      models: {
        ...models,
        Word: {
          deleteOne
        }
      }
    });

    const res = await mutate({
      mutation: mutations.deleteWordMutation,
      variables: {
        deleteWordId: 'deleteWordId'
      }
    });
    expect(getErrorMessageFromGQL(res)).toEqual(
      'You do not have permission to perform this operation'
    );
    expect(deleteOne).toHaveBeenCalledTimes(0);
  });

  test('create word', async () => {
    models.Word.findOne.mockReturnValueOnce(null);
    const { mutate } = createTestServer({
      user,
      models
    });

    const res = await mutate({
      mutation: mutations.saveWordMutation,
      variables: {
        input: {
          ...testData.createWordInput
        }
      }
    });
    expect(res.body.singleResult.errors).not.toBeDefined();
    expect(models.Word.createOne).toHaveBeenCalledWith({
      ...testData.createWordInput,
      user: 'userId'
    });
  });

  test('not create word if user is not defined', async () => {
    const { mutate } = createTestServer({
      models
    });

    const res = await mutate({
      mutation: mutations.saveWordMutation,
      variables: {
        input: {
          ...testData.createWordInput
        }
      }
    });
    expect(getErrorMessageFromGQL(res)).toEqual(
      'You do not have permission to perform this operation'
    );
    expect(models.User.findOne).toHaveBeenCalledTimes(0);
    expect(models.Word.createOne).toHaveBeenCalledTimes(0);
  });

  test('create not create word if user is not found', async () => {
    models.User.findOne.mockReturnValueOnce(null);
    const { mutate } = createTestServer({
      user,
      models
    });

    const res = await mutate({
      mutation: mutations.saveWordMutation,
      variables: {
        input: {
          ...testData.createWordInput
        }
      }
    });
    expect(getErrorMessageFromGQL(res)).toEqual(
      'You do not have permission to perform this operation'
    );
    expect(models.Word.createOne).toHaveBeenCalledTimes(0);
  });

  test('create word if word exists', async () => {
    models.Word.findOne.mockReturnValueOnce(testData.createWordInput);
    const { mutate } = createTestServer({
      user,
      models
    });

    const res = await mutate({
      mutation: mutations.saveWordMutation,
      variables: {
        input: {
          ...testData.createWordInput
        }
      }
    });
    expect(getErrorMessageFromGQL(res)).toEqual(
      'word with uuid 74046e79-e4c9-4b52-ac96-cb7ae98fb601 is already added'
    );
    expect(models.Word.createOne).toHaveBeenCalledTimes(0);
  });

  test('update word', async () => {
    const updateOne = jest.fn(() => ({
      ok: true,
      value: { ...testData.createWordInput2, user: 'mockUserId' }
    }));
    const { mutate } = createTestServer({
      user,
      models: {
        ...models,
        Word: {
          updateOne
        }
      }
    });

    const res = await mutate({
      mutation: mutations.updateWordMutation,
      variables: {
        input: { ...testData.updateWordInput, id: '1' }
      }
    });
    expect(res).toMatchSnapshot();
    expect(updateOne).toHaveBeenCalledWith({
      ...testData.updateWordInput,
      id: '1',
      user: 'userId'
    });
  });

  test('update word if operation fails', async () => {
    const updateOne = jest.fn(() => ({ ok: false }));
    const { mutate } = createTestServer({
      user,
      models: {
        ...models,
        Word: {
          updateOne
        }
      }
    });

    const res = await mutate({
      mutation: mutations.updateWordMutation,
      variables: {
        input: { ...testData.updateWordInput, id: '1' }
      }
    });
    expect(getErrorMessageFromGQL(res)).toEqual(
      'updating word with id 1 failed'
    );
    expect(updateOne).toHaveBeenCalledWith({
      ...testData.updateWordInput,
      id: '1',
      user: 'userId'
    });
  });

  test('update word if operation result is undefined', async () => {
    const updateOne = jest.fn();
    const { mutate } = createTestServer({
      user,
      models: {
        ...models,
        Word: {
          updateOne
        }
      }
    });

    const res = await mutate({
      mutation: mutations.updateWordMutation,
      variables: {
        input: { ...testData.updateWordInput, id: '1' }
      }
    });
    expect(getErrorMessageFromGQL(res)).toEqual(
      'updating word with id 1 failed'
    );
    expect(updateOne).toHaveBeenCalledWith({
      ...testData.updateWordInput,
      id: '1',
      user: 'userId'
    });
  });

  test('update word if user is not defined', async () => {
    const updateOne = jest.fn(() => ({ ok: true }));
    const { mutate } = createTestServer({
      models: {
        ...models,
        Word: {
          updateOne
        }
      }
    });

    const res = await mutate({
      mutation: mutations.updateWordMutation,
      variables: {
        input: { ...testData.updateWordInput, id: '1' }
      }
    });
    expect(getErrorMessageFromGQL(res)).toEqual(
      'You do not have permission to perform this operation'
    );
    expect(updateOne).toHaveBeenCalledTimes(0);
  });
});
