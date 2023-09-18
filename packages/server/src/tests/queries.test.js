import { createTestServer } from './helpers';
import { words, users } from './mocks/data';
import { Language, Game, SortBy, SortWordsBy } from '../generated/graphql';
import { searchWord } from '../dictionary';
import { games } from '../mocks/games';
import { generateGameData } from '../utils/generateGameData';
import {
  randomNumbersArray,
  words as wordsArr
} from './mocks/gameGenerationData';
const wordsQuery = `
  {
    words {
      id
      name
      defs {
        def
      }
      particle
      audioUrl
      transcription
      isOffensive
      level
    }
  }
`;

const wordByIdQuery = `
  query Query($wordId: ID!) {
    word(id: $wordId) {
      id
      name
      defs {
        def
        examples {
          text
        }
      }
      particle
      imgUrl
      audioUrl
      additionalInfo
      transcription
      user
      isOffensive
      stems
      level
    }
  }
`;

const userQuery = `
  {
    user {
      firstName
      lastName
      email
      id
      role
    }
  }
`;

const searchQuery = `
  query SearchWords($input: WordSearchInput!) {
    searchWord(input: $input) {
      ... on Suggestions {
        suggestions
      }
      ... on DictionaryWord {
        uuid
        transcription
        stems
        particle
        name
        isOffensive
        imgUrl
        defs {
          examples {
            text
            translation
          }
          def
        }
        audioUrl
        additionalInfo
        imgDesc
        shortDef
      }
    }
  }
`;

const gamesQuery = `query Games {
  games {
    desc
    imgUrl
    name
    id
  }
}`;

const gameQuery = `query Game($input: GameDataInput!) {
  game(input: $input) {
    questions {
      wordId
      question
      options
      answer
      additionalInfo {
        audioUrl
      }
    }
    task
    type
  }
}`;

let index = 0;

const mathRandomMock = jest
  .spyOn(global.Math, 'random')
  .mockImplementation(function () {
    if (index === randomNumbersArray.length) {
      index = 0;
    }
    const randomNum = randomNumbersArray[index];
    index++;
    return randomNum;
  });

const findMany = jest.fn(() => words);
const findOneUser = jest.fn(() => users[0]);
const findOneWord = jest.fn(() => words[0]);
const findManyAndSort = jest.fn(() => wordsArr);

const user = { id: '1' };

const models = {
  Word: {
    findMany,
    findOne: findOneWord,
    findManyAndSort
  },
  User: {
    findOne: findOneUser
  }
};

describe('queries', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  afterAll(() => {
    jest.resetAllMocks();
  });
  test('words', async () => {
    const { query } = createTestServer({
      user,
      models
    });

    const res = await query({
      query: wordsQuery
    });
    expect(res).toMatchSnapshot();
    expect(findManyAndSort).toHaveBeenCalledTimes(1);
  });

  test('word by id', async () => {
    const { query } = createTestServer({
      user,
      models
    });

    const res = await query({
      query: wordByIdQuery,
      variables: { wordId: 'mockid' }
    });
    expect(res).toMatchSnapshot();
    expect(findOneWord).toHaveBeenCalledTimes(1);
  });

  test('word by id if word is not found', async () => {
    const { query } = createTestServer({
      user,
      models: {
        ...models,
        Word: {
          findOne: jest.fn()
        }
      }
    });

    const res = await query({
      query: wordByIdQuery,
      variables: { wordId: 'mockid' }
    });
    expect(res).toMatchSnapshot();
  });

  test('user if user exist', async () => {
    const { query } = createTestServer({
      user: { id: '1', role: 'MEMBER' },
      models
    });

    const res = await query({ query: userQuery });
    expect(res).toMatchSnapshot();
  });

  test('user if user is undefined', async () => {
    const { query } = createTestServer({
      models
    });

    const res = await query({ query: userQuery });
    expect(res).toMatchSnapshot();
  });

  test('user if user is not found', async () => {
    const { query } = createTestServer({
      user: { id: '1', role: 'MEMBER' },
      models: {
        ...models,
        User: {
          findOne: jest.fn()
        }
      }
    });

    const res = await query({ query: userQuery });
    expect(res).toMatchSnapshot();
  });

  test('searchWord', async () => {
    const searchWord = jest.fn(() => words);
    const { query } = createTestServer({
      user,
      searchWord,
      models
    });
    await query({
      query: searchQuery,
      variables: {
        input: {
          search: 'word',
          language: Language.English
        }
      }
    });
    expect(searchWord).toHaveBeenCalledWith('word', Language.English);
  });

  test('searchWord spanish lang, mocks enabled', async () => {
    const { query } = createTestServer({
      user,
      searchWord,
      models
    });
    const res = await query({
      query: searchQuery,
      variables: {
        input: {
          search: 'idioma',
          language: Language.Spanish
        }
      }
    });
    expect(res).toMatchSnapshot();
  });

  test('searchWord english lang, mocks enabled', async () => {
    const { query } = createTestServer({
      user,
      searchWord,
      models
    });
    const res = await query({
      query: searchQuery,
      variables: {
        input: {
          search: 'rubber',
          language: Language.English
        }
      }
    });
    expect(res).toMatchSnapshot();
  });

  test('searchWord spanish lang, mocks enabled returns suggestion', async () => {
    const { query } = createTestServer({
      user,
      searchWord,
      models
    });
    const res = await query({
      query: searchQuery,
      variables: {
        input: {
          search: 'unbelievableWordThatDoNotExist',
          language: Language.Spanish
        }
      }
    });
    expect(res).toMatchSnapshot();
  });

  test('searchWord english lang, mocks enabled returns suggestion', async () => {
    const { query } = createTestServer({
      user,
      searchWord,
      models
    });
    const res = await query({
      query: searchQuery,
      variables: {
        input: {
          search: 'unbelievableWordThatDoNotExist',
          language: Language.English
        }
      }
    });
    expect(res).toMatchSnapshot();
  });

  test('games', async () => {
    const { query } = createTestServer({
      games
    });
    const res = await query({ query: gamesQuery });
    expect(res).toMatchSnapshot();
  });

  test('get gamedata with walid user for Audio game and English', async () => {
    const { query } = createTestServer({
      games,
      generateGameData,
      models,
      user
    });
    const res = await query({
      query: gameQuery,
      variables: {
        input: { gameType: Game.Audio, language: Language.English }
      }
    });
    expect(res).toMatchSnapshot();
  });

  test('get gamedata with walid user for SelectDef game and English', async () => {
    const input = {
      gameType: Game.TypeWord,
      language: Language.English,
      isReverseOrder: true,
      sortBy: SortBy.PracticedTimes
    };
    const { query } = createTestServer({
      games,
      generateGameData,
      models,
      user
    });
    const res = await query({
      query: gameQuery,
      variables: {
        input
      }
    });
    expect(res).toMatchSnapshot();
    expect(findManyAndSort).toHaveBeenCalledWith({
      ...input,
      user: user.id
    });
  });

  test('get gamedata with walid user for SelectWord game and English', async () => {
    const input = {
      gameType: Game.TypeWord,
      language: Language.English,
      isReverseOrder: false,
      sortBy: SortBy.LastTimePracticed
    };

    const { query } = createTestServer({
      games,
      generateGameData,
      models,
      user
    });

    const res = await query({
      query: gameQuery,
      variables: {
        input
      }
    });
    expect(res).toMatchSnapshot();
    expect(findManyAndSort).toHaveBeenCalledWith({
      ...input,
      user: user.id
    });
  });

  test('get gamedata with walid user for TypeWord game and English', async () => {
    const input = {
      gameType: Game.TypeWord,
      language: Language.English,
      isReverseOrder: true,
      sortBy: SortBy.ErrorCount
    };
    const { query } = createTestServer({
      games,
      generateGameData,
      models,
      user
    });
    const res = await query({
      query: gameQuery,
      variables: {
        input
      }
    });
    expect(res).toMatchSnapshot();
    expect(findManyAndSort).toHaveBeenCalledWith({
      ...input,
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
      games,
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
      query: gameQuery,
      variables: {
        input
      }
    });
    expect(res).toMatchSnapshot();
    expect(findManyAndSort).toHaveBeenCalledTimes(0);
  });

  test('should not generate game data if user is undefined', async () => {
    const input = {
      gameType: Game.TypeWord,
      language: Language.English,
      isReverseOrder: true,
      sortBy: SortBy.ErrorCount
    };
    const { query } = createTestServer({
      games,
      generateGameData,
      models
    });
    const res = await query({
      query: gameQuery,
      variables: {
        input
      }
    });
    expect(res).toMatchSnapshot();
    expect(findManyAndSort).toHaveBeenCalledTimes(0);
  });

  test('generate game data if user does not have enough words', async () => {
    const input = {
      gameType: Game.TypeWord,
      language: Language.English,
      isReverseOrder: true,
      sortBy: SortBy.ErrorCount
    };
    const { query } = createTestServer({
      games,
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
      query: gameQuery,
      variables: {
        input
      }
    });
    expect(res).toMatchSnapshot();
  });

  test('generate game data if words do not exist', async () => {
    const input = {
      gameType: Game.TypeWord,
      language: Language.English,
      isReverseOrder: true,
      sortBy: SortBy.ErrorCount
    };
    const { query } = createTestServer({
      games,
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
      query: gameQuery,
      variables: {
        input
      }
    });
    expect(res).toMatchSnapshot();
  });

  test('generate game data if game is not found', async () => {
    const input = {
      gameType: Game.SelectDef,
      language: Language.English,
      isReverseOrder: true,
      sortBy: SortBy.ErrorCount
    };
    const { query } = createTestServer({
      games: [],
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
      query: gameQuery,
      variables: {
        input
      }
    });
    expect(res).toMatchSnapshot();
  });
});
