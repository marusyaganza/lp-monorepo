import { createTestServer } from './helpers';
import { words, users } from './mocks/data';
import { Language } from '../generated/graphql';
import { searchWord } from '../dictionary';
import { games } from '../mocks/games';
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

describe('queries', () => {
  test('words', async () => {
    const findMany = jest.fn(() => words);
    const { query } = createTestServer({
      user: { id: '1' },
      models: {
        Word: {
          findMany
        }
      }
    });

    const res = await query({ query: wordsQuery });
    expect(res).toMatchSnapshot();
    expect(findMany).toHaveBeenCalledTimes(1);
  });

  test('word by id', async () => {
    const findOne = jest.fn(() => words[0]);
    const { query } = createTestServer({
      user: { id: '1' },
      models: {
        Word: {
          findOne
        }
      }
    });

    const res = await query({
      query: wordByIdQuery,
      variables: { wordId: 'mockid' }
    });
    expect(res).toMatchSnapshot();
    expect(findOne).toHaveBeenCalledTimes(1);
  });

  test('user', async () => {
    const findOneUser = jest.fn(() => users[0]);
    const findOneWord = jest.fn(() => words[0]);
    const { query } = createTestServer({
      user: { id: '1', role: 'MEMBER' },
      models: {
        Word: {
          findOne: findOneWord
        },
        User: {
          findOne: findOneUser
        }
      }
    });

    const res = await query({ query: userQuery });
    expect(res).toMatchSnapshot();
  });
  test('searchWord', async () => {
    const searchWord = jest.fn(() => words);
    const { query } = createTestServer({
      user: { id: '1' },
      searchWord
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
      user: { id: '1' },
      searchWord
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
      user: { id: '1' },
      searchWord
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
      user: { id: '1' },
      searchWord
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
      user: { id: '1' },
      searchWord
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
});
