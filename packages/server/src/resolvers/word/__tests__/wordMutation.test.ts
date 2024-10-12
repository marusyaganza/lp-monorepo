import {
  createTestServer,
  getDataFromGQL,
  getErrorMessageFromGQL
} from '../../../tests/helpers';
import { mutations } from '../../../tests/mocks/gqlMutations';
import { models } from '../../../tests/mocks/mockModels';
import { testData } from '../../../tests/mocks/dbTestData';
import { ERROR_MESSAGES } from '../../../constants/errorMessages';
import { Game } from '../../../generated/graphql';

const user = { id: 'userId' };

const gameResultData = [
  {
    id: '1',
    hasError: true,
    gameType: Game.Audio
  },
  {
    id: '2',
    hasError: false,
    gameType: Game.Audio
  },
  {
    id: '3',
    hasError: false,
    gameType: Game.Audio
  }
];

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
    expect(getDataFromGQL(res).deleteWord).toEqual(
      'word with id deleteWordId was deleted'
    );
    expect(getErrorMessageFromGQL(res)).toEqual(undefined);
    expect(deleteOne).toHaveBeenCalledWith('deleteWordId', 'userId');
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
    expect(deleteOne).toHaveBeenCalledWith('deleteWordId', 'userId');
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
    expect(models.Word.deleteOne).toHaveBeenCalledWith(
      'deleteWordId',
      'userId'
    );
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
    expect(getErrorMessageFromGQL(res)).toEqual(ERROR_MESSAGES.NOT_AUTHORIZED);
    expect(deleteOne).toHaveBeenCalledTimes(0);
  });

  test('create word', async () => {
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
    expect(getErrorMessageFromGQL(res)).toEqual(undefined);
    expect(models.Word.createOne).toHaveBeenCalledWith(
      testData.createWordInput,
      'userId'
    );
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
    expect(getErrorMessageFromGQL(res)).toEqual(ERROR_MESSAGES.NOT_AUTHORIZED);
    expect(models.User.findOne).toHaveBeenCalledTimes(0);
    expect(models.Word.createOne).toHaveBeenCalledTimes(0);
  });

  test('create word if operation returns undefined', async () => {
    // @ts-expect-error: ts do not hanle this mocking case
    models.Word.createOne.mockReturnValueOnce(undefined);
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
      'saving word with name egalitarian failed'
    );
    expect(models.Word.createOne).toHaveBeenCalledTimes(1);
    expect(models.Word.createOne).toHaveBeenCalledWith(
      testData.createWordInput,
      'userId'
    );
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
    expect(getDataFromGQL(res)).toMatchSnapshot();
    expect(getErrorMessageFromGQL(res)).toEqual(undefined);
    expect(updateOne).toHaveBeenCalledWith(
      {
        ...testData.updateWordInput,
        id: '1'
      },
      'userId'
    );
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
    expect(updateOne).toHaveBeenCalledWith(
      {
        ...testData.updateWordInput,
        id: '1'
      },
      'userId'
    );
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
    expect(updateOne).toHaveBeenCalledWith(
      {
        ...testData.updateWordInput,
        id: '1'
      },
      'userId'
    );
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
    expect(getErrorMessageFromGQL(res)).toEqual(ERROR_MESSAGES.NOT_AUTHORIZED);
    expect(updateOne).toHaveBeenCalledTimes(0);
  });
  test('safe game result', async () => {
    const updateStatistics = jest.fn(() => ({ ok: true }));
    const { mutate } = createTestServer({
      user,
      models: {
        ...models,
        Word: {
          updateStatistics
        }
      }
    });

    const res = await mutate({
      mutation: mutations.saveGameResultMutation,
      variables: {
        input: gameResultData
      }
    });
    expect(getDataFromGQL(res).saveGameResult).toEqual('Game result saved');
    expect(getErrorMessageFromGQL(res)).toEqual(undefined);
    expect(updateStatistics).toHaveBeenCalledWith(gameResultData, user.id);
  });

  test('safe game result if operation failed', async () => {
    const updateStatistics = jest.fn(() => ({ ok: false }));
    const { mutate } = createTestServer({
      user,
      models: {
        ...models,
        Word: {
          updateStatistics
        }
      }
    });

    const res = await mutate({
      mutation: mutations.saveGameResultMutation,
      variables: {
        input: gameResultData
      }
    });
    expect(getErrorMessageFromGQL(res)).toEqual(
      'saving training result failed'
    );
    expect(updateStatistics).toHaveBeenCalledWith(gameResultData, user.id);
  });

  test('safe game result if operation result is undefined', async () => {
    const updateStatistics = jest.fn();
    const { mutate } = createTestServer({
      user,
      models: {
        ...models,
        Word: {
          updateStatistics
        }
      }
    });

    const res = await mutate({
      mutation: mutations.saveGameResultMutation,
      variables: {
        input: gameResultData
      }
    });
    expect(getErrorMessageFromGQL(res)).toEqual(
      'saving training result failed'
    );
    expect(updateStatistics).toHaveBeenCalledWith(gameResultData, user.id);
  });

  test('safe game result if user is not defined', async () => {
    const updateStatistics = jest.fn();
    const { mutate } = createTestServer({
      models: {
        ...models,
        Word: {
          updateStatistics
        }
      }
    });

    const res = await mutate({
      mutation: mutations.saveGameResultMutation,
      variables: {
        input: gameResultData
      }
    });
    expect(getErrorMessageFromGQL(res)).toEqual(ERROR_MESSAGES.NOT_AUTHORIZED);
    expect(updateStatistics).toHaveBeenCalledTimes(0);
  });
});
