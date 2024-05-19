import { createTestServer, getErrorMessageFromGQL } from '../helpers';
import { models } from '../mocks/models';
import { user } from '../mocks/data';
import { userQueries } from './queries';

describe('user queries', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  afterAll(() => {
    jest.resetAllMocks();
  });
  test('user if user exist', async () => {
    const { query } = createTestServer({
      user,
      models
    });

    const res = await query({ query: userQueries.userQuery });
    expect(res).toMatchSnapshot();
  });

  test('user if user is undefined', async () => {
    const { query } = createTestServer({
      models: {
        ...models,
        User: {
          findOne: jest.fn()
        }
      }
    });

    const res = await query({ query: userQueries.userQuery });
    expect(getErrorMessageFromGQL(res)).toEqual('user is not found');
  });

  test('user if user is not found', async () => {
    const { query } = createTestServer({
      user,
      models: {
        ...models,
        User: {
          findOne: jest.fn()
        }
      }
    });

    const res = await query({ query: userQueries.userQuery });
    expect(getErrorMessageFromGQL(res)).toEqual('user is not found');
  });
});
