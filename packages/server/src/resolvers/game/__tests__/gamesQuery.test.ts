import {
  createTestServer,
  getDataFromGQL,
  getErrorMessageFromGQL
} from '../../../tests/helpers';
import { gameQueries } from '../../../tests/mocks/gqlQueries';
import { models } from '../../../tests/mocks/mockModels';

describe('game queries', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  afterAll(() => {
    jest.resetAllMocks();
  });

  test('games query', async () => {
    const { query } = createTestServer({ models });
    // @ts-expect-error: ts do not hanle this mocking case
    const res = await query({ query: gameQueries.gamesQuery });
    expect(getErrorMessageFromGQL(res)).toEqual(undefined);
    expect(getDataFromGQL(res)).toMatchSnapshot();
  });
});
