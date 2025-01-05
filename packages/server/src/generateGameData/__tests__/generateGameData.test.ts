import { generateGameData } from '..';
import { Game, Language, Tense } from '../../generated/graphql';
import {
  connectToDb,
  disconnectFromDb,
  dropDb,
  seedDb
} from '../../tests/helpers';

import { usersTestData } from '../../tests/mocks/inputs/newUserInput';
import { newWordInputs } from '../../tests/mocks/inputs/newWordInputs';
import { OperationResolutionError } from '../../utils/apolloCustomErrors';
import { ERROR_MESSAGES } from '../../constants/errorMessages';
import { DEFAULT_GAMES_SETTINGS } from '../../constants/defultGameSettings';

const snapshotConfig = {
  wordId: expect.any(String)
};

const gameTypes = Object.values(Game).filter(
  g => g !== Game.Conjugation && g !== Game.Gender
);
const tenses = Object.values(Tense);

describe('generateGameData', () => {
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
  gameTypes.forEach(game => {
    const gameConfig = DEFAULT_GAMES_SETTINGS[game];
    const wordsPerGame = gameConfig?.wordsPerGame;

    test(`with ${game} game Spanish`, async () => {
      const userId = data?.users?.[0] as string;
      const resultSpanish = await generateGameData(
        {
          gameType: game,
          language: Language.Spanish
        },
        userId
      );

      expect(resultSpanish?.questions?.[0]).toMatchSnapshot(snapshotConfig);
      expect(resultSpanish.questions).toHaveLength(wordsPerGame);
    });

    test(`with ${game} game English`, async () => {
      const userId = data?.users?.[0] as string;
      const result = await generateGameData(
        {
          gameType: game,
          language: Language.English
        },
        userId
      );

      expect(result?.questions?.[0]).toMatchSnapshot(snapshotConfig);
      expect(result.questions).toHaveLength(wordsPerGame);
    });

    test(`should throw an error with ${game} game if not enough words`, async () => {
      const userId = data?.users?.[1] as string;
      let error;
      try {
        await generateGameData(
          {
            gameType: game
          },
          userId
        );
      } catch (err) {
        error = err;
      }
      expect(error).toEqual(
        new OperationResolutionError(
          `not enough words to start a game. You have 0 word. Words requited for the game: ${gameConfig?.minWords}`
        )
      );
    });
  });

  tenses.forEach(tense => {
    test(`with ${Game.Conjugation} game ${tense} tense`, async () => {
      const userId = data?.users?.[0];
      const gameConfig = DEFAULT_GAMES_SETTINGS[Game.Conjugation];
      const wordsPerGame = gameConfig?.wordsPerGame;

      const result = await generateGameData(
        {
          gameType: Game.Conjugation,
          language: Language.Spanish,
          tense
        },
        userId
      );

      expect(result?.questions?.[0]).toMatchSnapshot(snapshotConfig);
      expect(result.questions).toHaveLength(wordsPerGame);
    });
  });

  test(`should throw error with ${Game.Conjugation} game ${Language.English}`, async () => {
    const userId = data?.users?.[0];
    let error;
    try {
      await generateGameData(
        {
          gameType: Game.Conjugation,
          language: Language.English
        },
        userId
      );
    } catch (err) {
      error = err;
    }
    expect(error).toEqual(
      new OperationResolutionError(ERROR_MESSAGES.GAME_NOT_AVAILABLE)
    );
  });

  test(`should throw error with ${Game.Gender} game ${Language.English}`, async () => {
    const userId = data?.users?.[0];
    let error;
    try {
      await generateGameData(
        {
          gameType: Game.Gender,
          language: Language.English
        },
        userId
      );
    } catch (err) {
      error = err;
    }
    expect(error).toEqual(
      new OperationResolutionError(ERROR_MESSAGES.GAME_NOT_AVAILABLE)
    );
  });
});
