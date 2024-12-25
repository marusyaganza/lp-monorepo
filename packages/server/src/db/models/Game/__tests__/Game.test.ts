import { GameModel } from '../Game';
import { Game, Language } from '../../../../generated/graphql';
import {
  connectToDb,
  disconnectFromDb,
  dropDb,
  seedDb,
  baseSnapshotConfig
} from '../../../../tests/helpers';

describe('Game findMany', () => {
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
    expect(result?.length).toBe(4);
    expect(result?.map(item => item?.type)).toEqual([
      'AUDIO',
      'SELECT_DEF',
      'SELECT_WORD',
      'TYPE_WORD'
    ]);
  });
  test('Spanish', async () => {
    const result = await GameModel.findMany({
      languages: Language.Spanish
    });

    expect(result?.length).toBe(6);
    expect(result?.map(item => item?.type)).toEqual([
      'AUDIO',
      'SELECT_DEF',
      'SELECT_WORD',
      'TYPE_WORD',
      'CONJUGATION',
      'GENDER'
    ]);
  });
});

const gameTypes = Object.values(Game);

describe('Game findOne', () => {
  beforeEach(async () => {
    await connectToDb();
    await dropDb();
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
      expect(result).toMatchSnapshot(baseSnapshotConfig);
    });
  });
});
