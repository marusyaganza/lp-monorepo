import {
  createTestServer,
  getDataFromGQL,
  getErrorMessageFromGQL
} from '../../../tests/helpers';
import { models } from '../../../tests/mocks/mockModels';
import { user } from '../../../tests/mocks/data';
import { tagsQueries } from '../../../tests/mocks/gqlQueries';
import { Language } from '../../../generated/graphql';
import { ERROR_MESSAGES } from '../../../constants/errorMessages';

describe('tags queries', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  afterAll(() => {
    jest.resetAllMocks();
  });

  test('tags, English', async () => {
    const { query } = createTestServer({
      user,
      models
    });

    const res = await query({
      query: tagsQueries.tagsQuery,
      variables: { language: Language.English }
    });
    expect(getDataFromGQL(res)).toMatchSnapshot();
    expect(getErrorMessageFromGQL(res)).toEqual(undefined);
  });

  test('tags, Spanish', async () => {
    const { query } = createTestServer({
      user,
      models
    });

    const res = await query({
      query: tagsQueries.tagsQuery,
      variables: { language: Language.Spanish }
    });
    expect(getDataFromGQL(res)).toMatchSnapshot();
    expect(getErrorMessageFromGQL(res)).toEqual(undefined);
  });

  test('tags if user is undefined', async () => {
    const { query } = createTestServer({
      models: {
        ...models,
        User: {
          findOne: jest.fn()
        }
      }
    });

    const res = await query({
      query: tagsQueries.tagsQuery,
      variables: { language: Language.English }
    });
    expect(getErrorMessageFromGQL(res)).toEqual(
      ERROR_MESSAGES.NOT_AUTHENTICATED
    );
  });

  test('tags if user is not found', async () => {
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
      query: tagsQueries.tagsQuery,
      variables: { language: Language.English }
    });
    expect(getErrorMessageFromGQL(res)).toEqual(
      ERROR_MESSAGES.NOT_AUTHENTICATED
    );
  });
});
