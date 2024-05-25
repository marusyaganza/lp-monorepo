import { createTestServer, getErrorMessageFromGQL } from '../helpers';
import { words, user } from '../mocks/data';
import { Language } from '../../generated/graphql';
import { searchWord } from '../../dictionary';
import { models } from '../mocks/models';
import { wordQueries } from '../mocks/gqlQueries';

describe('word queries', () => {
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
      query: wordQueries.wordsQuery
    });
    expect(res).toMatchSnapshot();
    expect(models.Word.findManyAndSort).toHaveBeenCalledTimes(1);
    expect(models.Word.findManyAndSort).toHaveBeenCalledWith({
      isReverseOrder: true,
      sortBy: 'updatedAt',
      user: '1'
    });
  });

  test('words in Spanish', async () => {
    const { query } = createTestServer({
      user,
      models
    });

    const res = await query({
      query: wordQueries.wordsQuery,
      variables: { input: { language: Language.Spanish } }
    });
    expect(res).toMatchSnapshot();
    expect(models.Word.findManyAndSort).toHaveBeenCalledWith({
      isReverseOrder: true,
      language: 'SPANISH',
      sortBy: 'updatedAt',
      user: '1'
    });
  });

  test('word by id', async () => {
    const { query } = createTestServer({
      user,
      models
    });

    const res = await query({
      query: wordQueries.wordByIdQuery,
      variables: { wordId: 'mockid' }
    });
    expect(res).toMatchSnapshot();
    expect(models.Word.findOne).toHaveBeenCalledTimes(1);
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
      query: wordQueries.wordByIdQuery,
      variables: { wordId: 'mockid' }
    });
    expect(getErrorMessageFromGQL(res)).toEqual(
      'word with id mockid is not found'
    );
  });

  test('word by id if user is not found', async () => {
    const { query } = createTestServer({
      user,
      models: {
        ...models,
        User: {
          findOne: jest.fn()
        }
      }
    });

    const res = await query({
      query: wordQueries.wordByIdQuery,
      variables: { wordId: 'mockid' }
    });
    expect(getErrorMessageFromGQL(res)).toEqual(
      'Login to perform this operation'
    );
  });

  test('words if user is not found', async () => {
    const { query } = createTestServer({
      user,
      models: {
        ...models,
        User: {
          findOne: jest.fn()
        }
      }
    });

    const res = await query({
      query: wordQueries.wordsQuery
    });
    expect(getErrorMessageFromGQL(res)).toEqual(
      'Login to perform this operation'
    );
  });

  test('searchWord if user is not found', async () => {
    const { query } = createTestServer({
      user,
      models: {
        ...models,
        User: {
          findOne: jest.fn()
        }
      }
    });

    const res = await query({
      query: wordQueries.searchQuery,
      variables: {
        input: {
          search: 'word',
          language: Language.English
        }
      }
    });
    expect(getErrorMessageFromGQL(res)).toEqual(
      'Login to perform this operation'
    );
  });

  test('searchWord', async () => {
    const searchWord = jest.fn(() => words);
    const { query } = createTestServer({
      user,
      searchWord,
      models
    });
    await query({
      query: wordQueries.searchQuery,
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
      query: wordQueries.searchQuery,
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
      query: wordQueries.searchQuery,
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
      query: wordQueries.searchQuery,
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
      query: wordQueries.searchQuery,
      variables: {
        input: {
          search: 'unbelievableWordThatDoNotExist',
          language: Language.English
        }
      }
    });
    expect(res).toMatchSnapshot();
  });
});
