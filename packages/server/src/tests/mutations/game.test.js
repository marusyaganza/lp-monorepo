import { createTestServer, getErrorMessageFromGQL } from '../helpers';
import { mutations } from '../mocks/gqlMutations';
import { models } from '../mocks/models';
import { Game } from '../../generated/graphql';

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

describe('game mutations', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  afterAll(() => {
    jest.resetAllMocks();
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
    expect(res).toMatchSnapshot();
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
    expect(getErrorMessageFromGQL(res)).toEqual(
      'You do not have permission to perform this operation'
    );
    expect(updateStatistics).toHaveBeenCalledTimes(0);
  });

  test('safe game result if user does not exist', async () => {
    models.User.findOne.mockResolvedValueOnce(undefined);
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
      'You do not have permission to perform this operation'
    );
    expect(updateStatistics).toHaveBeenCalledTimes(0);
  });
});
