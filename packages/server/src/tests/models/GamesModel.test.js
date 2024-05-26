import { GameModel } from '../../db/models/Game';
import { Game, Language } from '../../generated/graphql';
import { connectToDb, disconnectFromDb, dropDb, seedDb } from '../helpers';

const snapshotConfig = {
  id: expect.any(String),
  _id: expect.any(Object)
};

describe('WordTagModel findMany', () => {
  beforeEach(async () => {
    await connectToDb();
    await dropDb();
    await seedDb();
  });

  afterEach(async () => {
    await dropDb();
    await disconnectFromDb();
  });

  test('English', async () => {
    const result = await GameModel.findMany({
      languages: Language.English
    });
    expect(result.length).toBe(4);
  });
  test('Spanish', async () => {
    const result = await GameModel.findMany({
      languages: Language.Spanish
    });

    expect(result.length).toBe(5);
  });
});

const gameTypes = Object.values(Game);

describe('WordTagModel findOne', () => {
  beforeEach(async () => {
    await connectToDb();
    await seedDb();
  });

  afterEach(async () => {
    await dropDb();
    await disconnectFromDb();
  });
  gameTypes.forEach(game => {
    test(`with ${game} game, English`, async () => {
      const result = await GameModel.findOne({
        type: game
      });
      expect(result).toMatchSnapshot(snapshotConfig);
    });
  });
});
