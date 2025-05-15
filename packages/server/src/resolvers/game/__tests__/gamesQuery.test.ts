import {
  connectToDb,
  createTestServer,
  disconnectFromDb,
  dropDb,
  getDataFromGQL,
  getErrorMessageFromGQL,
  seedDb
} from '../../../tests/helpers';
import { gameQueries } from '../../../tests/mocks/gqlQueries';
import { models } from '../../../tests/mocks/mockModels';
import { newWordInputs } from '../../../tests/mocks/inputs/newWordInputs';
import { usersTestData } from '../../../tests/mocks/inputs/newUserInput';
import { Language, Role } from '../../../generated/graphql';

describe('game queries', () => {
  let data;
  beforeEach(async () => {
    await connectToDb();
    await dropDb();
    data = await seedDb({
      words: [
        ...newWordInputs[Language.Spanish],
        ...newWordInputs[Language.English]
      ],
      users: usersTestData
    });
  });

  afterEach(async () => {
    await dropDb();
    await disconnectFromDb();
  });

  test('games query', async () => {
    const userId = data?.users?.[0] as string;
    const { query } = createTestServer({
      models,
      user: { id: userId, role: Role.Member }
    });
    // @ts-expect-error: ts do not hanle this mocking case
    const res = await query({ query: gameQueries.gamesQuery });
    expect(getErrorMessageFromGQL(res)).toEqual(undefined);
    expect(getDataFromGQL(res)).toMatchSnapshot();
  });
});
