import {
  wordsWithConjugation,
  testData
} from '../../../tests/mocks/wordsForGames';
import { generateConjugationGame } from '../generateConjugationGame';
import { Game, Language, Tense } from '../../../generated/graphql';
import { TENSES } from '../../../constants/tenses';
import { OperationResolutionError } from '../../../utils/apolloCustomErrors';
import { ERROR_MESSAGES } from '../../../constants/errorMessages';
import { DEFAULT_GAMES_SETTINGS } from '../../../constants/defaultGameSettings';

const gameType = Game.Conjugation;
const gameConfig = DEFAULT_GAMES_SETTINGS[gameType];

const language = Language.Spanish;
const tenses = Object.values(Tense);

describe('generateConjugationGame', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  tenses.forEach(tense => {
    it(`should return the correct data if there are enough words with ${tense} tense`, async () => {
      const gameData = await generateConjugationGame(wordsWithConjugation, {
        language,
        gameType,
        tense
      });
      expect(
        gameData.questions?.map(q => ({ ...q, wordId: expect.any(String) }))
      ).toMatchSnapshot();
      expect(gameData?.task).toEqual(`Conjugate the verb in ${TENSES[tense]}`);
      expect(gameData.type).toEqual(gameType);
      expect(gameData?.questions?.length).toBe(gameConfig?.wordsPerGame);
      expect(gameData.type).toBe(gameType);
    });

    it(`generate data with minimal ${language} words with ${tense} tense`, async () => {
      const words = wordsWithConjugation.slice(0, 1);
      const gameData = await generateConjugationGame(words, {
        language: language,
        gameType,
        tense
      });

      expect(gameData?.questions?.length).toBe(gameConfig?.minWords);
      expect(gameData.type).toBe(gameType);
      expect(gameData).toMatchSnapshot();
    });
    it('should throw an error with incorrect data', async () => {
      let error;
      try {
        // @ts-expect-error: using incorrect arguments here
        await generateConjugationGame(testData[language]);
      } catch (err) {
        error = err;
      }
      expect(error).toEqual(
        new OperationResolutionError(ERROR_MESSAGES.GAME_GENERATION_FAILED)
      );
    });
  });
});
