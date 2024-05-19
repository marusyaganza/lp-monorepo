import { createTestServer, getErrorMessageFromGQL } from '../helpers';
import { models } from '../mocks/models';
import { user } from '../mocks/data';
import { tagsQueries } from './queries';
import { Language } from '../../generated/graphql';

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
    expect(res).toMatchSnapshot();
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
    expect(res).toMatchSnapshot();
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
      'Login to perform this operation'
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
      'Login to perform this operation'
    );
  });
});
