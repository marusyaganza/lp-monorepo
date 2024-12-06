import {
  createTestServer,
  getDataFromGQL,
  getErrorMessageFromGQL
} from '../../../tests/helpers';
import { words, user } from '../../../tests/mocks/data';
import { Language, SortWordsBy } from '../../../generated/graphql';
import { searchWord } from '../../../dictionary/searchWord';
import { models } from '../../../tests/mocks/mockModels';
import { wordQueries } from '../../../tests/mocks/gqlQueries';
import { ERROR_MESSAGES } from '../../../constants/errorMessages';
import { mockSuggestions } from '../../../dictionary/fetchWord/mockFetchWord/mockFetchWord';

describe('word queries', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  afterAll(() => {
    jest.resetAllMocks();
  });
  test('wordsPerPage, English', async () => {
    const { query } = createTestServer({
      user,
      models
    });

    const input = {
      isReverseOrder: true,
      sortBy: SortWordsBy.UpdatedAt,
      language: Language.English
    };

    const res = await query({
      query: wordQueries.wordsQuery,
      variables: { input }
    });
    expect(getDataFromGQL(res)).toMatchSnapshot();
    expect(getErrorMessageFromGQL(res)).toEqual(undefined);
    expect(models.Word.findManyAndPaginate).toHaveBeenCalledTimes(1);
    expect(models.Word.findManyAndPaginate).toHaveBeenCalledWith(input, '1');
  });

  test('wordsPerPage, Spanish', async () => {
    const { query } = createTestServer({
      user,
      models
    });

    const input = { language: Language.Spanish };

    const res = await query({
      query: wordQueries.wordsQuery,
      variables: { input }
    });
    expect(getDataFromGQL(res)).toMatchSnapshot();
    expect(getErrorMessageFromGQL(res)).toEqual(undefined);
    expect(models.Word.findManyAndPaginate).toHaveBeenCalledWith(input, '1');
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
    expect(getDataFromGQL(res)).toMatchSnapshot();
    expect(getErrorMessageFromGQL(res)).toEqual(undefined);
    expect(models.Word.findById).toHaveBeenCalledTimes(1);
  });

  test('word by id if word is not found', async () => {
    const { query } = createTestServer({
      user,
      models: {
        ...models,
        Word: {
          findById: jest.fn()
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
      ERROR_MESSAGES.NOT_AUTHENTICATED
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

    // @ts-expect-error: testing with invalid arguments
    const res = await query({
      query: wordQueries.wordsQuery
    });
    expect(getErrorMessageFromGQL(res)).toEqual(
      ERROR_MESSAGES.NOT_AUTHENTICATED
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
      ERROR_MESSAGES.NOT_AUTHENTICATED
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
    expect(getDataFromGQL(res)).toMatchSnapshot();
    expect(getErrorMessageFromGQL(res)).toEqual(undefined);
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
    expect(getDataFromGQL(res)).toMatchSnapshot();
    expect(getErrorMessageFromGQL(res)).toEqual(undefined);
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
    expect(getDataFromGQL(res).searchWord[0].suggestions).toEqual(
      mockSuggestions[Language.Spanish]
    );
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
    expect(getDataFromGQL(res).searchWord[0].suggestions).toEqual(
      mockSuggestions[Language.English]
    );
  });
});
