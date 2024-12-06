import {
  createTestServer,
  getDataFromGQL,
  getErrorMessageFromGQL
} from '../../../tests/helpers';
import { models } from '../../../tests/mocks/mockModels';
import { user } from '../../../tests/mocks/data';
import { userQueries } from '../../../tests/mocks/gqlQueries';
import { ERROR_MESSAGES } from '../../../constants/errorMessages';

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
    // @ts-expect-error: ts do not hanle this case
    const res = await query({ query: userQueries.userQuery });
    expect(getDataFromGQL(res)).toMatchSnapshot();
    expect(getErrorMessageFromGQL(res)).toEqual(undefined);
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
    // @ts-expect-error: ts do not hanle this mocking case
    const res = await query({ query: userQueries.userQuery });
    expect(getErrorMessageFromGQL(res)).toEqual(
      ERROR_MESSAGES.NOT_AUTHENTICATED
    );
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
    // @ts-expect-error: ts do not hanle this mocking case
    const res = await query({ query: userQueries.userQuery });
    expect(getErrorMessageFromGQL(res)).toEqual(
      ERROR_MESSAGES.NOT_AUTHENTICATED
    );
  });
});
