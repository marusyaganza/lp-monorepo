import { createTestServer, getErrorMessageFromGQL } from '../helpers';
import { Language, Game, SortBy } from '../../generated/graphql';
import { generateGameData } from '../../utils/generateGameData';
import { randomNumbersArray } from '../mocks/gameGenerationData';

import { models } from '../mocks/models';
import { gameQueries } from './queries';

const user = { id: '1' };

let index = 0;

jest.spyOn(global.Math, 'random').mockImplementation(function () {
  if (index === randomNumbersArray.length) {
    index = 0;
  }
  const randomNum = randomNumbersArray[index];
  index++;
  return randomNum;
});

describe('queries', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  afterAll(() => {
    jest.resetAllMocks();
  });

  test('game queries', async () => {
    const { query } = createTestServer({ models });
    const res = await query({ query: gameQueries.gamesQuery });
    expect(res).toMatchSnapshot();
  });

  test('get gamedata with walid user for Audio game and English', async () => {
    const { query } = createTestServer({
      generateGameData,
      models,
      user
    });
    const res = await query({
      query: gameQueries.gameQuery,
      variables: {
        input: { gameType: Game.Audio, language: Language.English }
      }
    });
    expect(res).toMatchSnapshot();
  });

  test('get gamedata with walid user for SelectDef game and English', async () => {
    const input = {
      gameType: Game.SelectDef,
      language: Language.English,
      isReverseOrder: true,
      sortBy: SortBy.PracticedTimes
    };
    const { query } = createTestServer({
      generateGameData,
      models,
      user
    });
    const res = await query({
      query: gameQueries.gameQuery,
      variables: {
        input
      }
    });
    expect(res).toMatchSnapshot();
    expect(models.Word.findManyAndSort).toHaveBeenCalledWith({
      ...input,
      timesToLearn: 5,
      user: user.id
    });
    expect(models.Word.findMany).toHaveBeenCalledWith(
      { language: Language.English, user: '1' },
      'name shortDef',
      {
        limit: 40
      }
    );
  });

  test('get gamedata with walid user for SelectWord game and English', async () => {
    const input = {
      gameType: Game.SelectWord,
      language: Language.English,
      isReverseOrder: false,
      sortBy: SortBy.LastTimePracticed
    };

    const { query } = createTestServer({
      generateGameData,
      models,
      user
    });

    const res = await query({
      query: gameQueries.gameQuery,
      variables: {
        input
      }
    });
    expect(res).toMatchSnapshot();
    expect(models.Word.findManyAndSort).toHaveBeenCalledWith({
      ...input,
      timesToLearn: 5,
      user: user.id
    });
    expect(models.Word.findMany).toHaveBeenCalledWith(
      { language: Language.English, user: '1' },
      'name shortDef',
      {
        limit: 40
      }
    );
  });

  test('get gamedata with walid user for TypeWord game and English', async () => {
    const input = {
      gameType: Game.TypeWord,
      language: Language.English,
      isReverseOrder: true,
      sortBy: SortBy.ErrorCount
    };
    const { query } = createTestServer({
      generateGameData,
      models,
      user
    });
    const res = await query({
      query: gameQueries.gameQuery,
      variables: {
        input
      }
    });
    expect(res).toMatchSnapshot();
    expect(models.Word.findManyAndSort).toHaveBeenCalledWith({
      ...input,
      timesToLearn: 5,
      user: user.id
    });
  });

  test('get gamedata with walid user for Conjugation game and Spanish', async () => {
    const input = {
      gameType: Game.Conjugation,
      language: Language.Spanish,
      sortBy: SortBy.SuccessRate
    };
    const { query } = createTestServer({
      generateGameData,
      models,
      user
    });
    const res = await query({
      query: gameQueries.gameQuery,
      variables: {
        input
      }
    });
    expect(res).toMatchSnapshot();
    expect(models.Word.findManyAndSort).toHaveBeenCalledWith({
      ...input,
      timesToLearn: 5,
      user: user.id
    });
  });

  test('should not generate game data if user is not found', async () => {
    const input = {
      gameType: Game.TypeWord,
      language: Language.English,
      isReverseOrder: true,
      sortBy: SortBy.ErrorCount
    };
    const { query } = createTestServer({
      generateGameData,
      models: {
        ...models,
        User: {
          findOne: jest.fn()
        }
      },
      user
    });
    const res = await query({
      query: gameQueries.gameQuery,
      variables: {
        input
      }
    });
    expect(getErrorMessageFromGQL(res)).toEqual(
      'Login to perform this operation'
    );
    expect(models.Word.findManyAndSort).toHaveBeenCalledTimes(0);
  });

  test('should not generate game data if user is undefined', async () => {
    const input = {
      gameType: Game.TypeWord,
      language: Language.English,
      isReverseOrder: true,
      sortBy: SortBy.ErrorCount
    };
    const { query } = createTestServer({
      generateGameData,
      models
    });
    const res = await query({
      query: gameQueries.gameQuery,
      variables: {
        input
      }
    });
    expect(getErrorMessageFromGQL(res)).toEqual(
      'Login to perform this operation'
    );
    expect(models.Word.findManyAndSort).toHaveBeenCalledTimes(0);
  });

  test('generate game data if user does not have enough words', async () => {
    const input = {
      gameType: Game.TypeWord,
      language: Language.English,
      isReverseOrder: true,
      sortBy: SortBy.ErrorCount
    };
    const { query } = createTestServer({
      generateGameData,
      user,
      models: {
        ...models,
        Word: {
          findManyAndSort: jest.fn(() => [])
        }
      }
    });
    const res = await query({
      query: gameQueries.gameQuery,
      variables: {
        input
      }
    });
    expect(getErrorMessageFromGQL(res)).toEqual(
      'not enough words to start a game. You have 0 word. Words requited for the game: 1'
    );
  });

  test('generate game data if words do not exist', async () => {
    const input = {
      gameType: Game.TypeWord,
      language: Language.English,
      isReverseOrder: true,
      sortBy: SortBy.ErrorCount
    };
    const { query } = createTestServer({
      generateGameData,
      user,
      models: {
        ...models,
        Word: {
          findManyAndSort: jest.fn()
        }
      }
    });
    const res = await query({
      query: gameQueries.gameQuery,
      variables: {
        input
      }
    });
    expect(getErrorMessageFromGQL(res)).toEqual('words not found');
  });

  test('generate game data if game is not found', async () => {
    const input = {
      gameType: Game.SelectDef,
      language: Language.English,
      isReverseOrder: true,
      sortBy: SortBy.ErrorCount
    };
    const { query } = createTestServer({
      generateGameData,
      user,
      models: {
        ...models,
        Word: {
          findManyAndSort: jest.fn()
        },
        Game: {
          findOne: jest.fn()
        }
      }
    });
    const res = await query({
      query: gameQueries.gameQuery,
      variables: {
        input
      }
    });
    expect(getErrorMessageFromGQL(res)).toEqual('game not found');
  });

  test('generate game data if game is not available for a language', async () => {
    const { query } = createTestServer({
      generateGameData,
      user,
      models: {
        ...models,
        Game: {
          ...models.Game,
          findMany: jest.fn()
        }
      }
    });
    const res = await query({
      query: gameQueries.gamesQuery,
      variables: {
        language: Language.English
      }
    });
    expect(getErrorMessageFromGQL(res)).toEqual(
      'no games for ENGLISH language were found'
    );
  });
});
