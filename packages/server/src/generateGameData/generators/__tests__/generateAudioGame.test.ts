import { testData } from '../../../tests/mocks/wordsForGames';
import { generateAudioGame } from '../generateAudioGame';
import { Game, Language } from '../../../generated/graphql';
import { OperationResolutionError } from '../../../utils/apolloCustomErrors';
import { ERROR_MESSAGES } from '../../../constants/errorMessages';
import { DEFAULT_GAMES_SETTINGS } from '../../../constants/defaultGameSettings';

const languages = Object.values(Language);
const gameType = Game.Audio;

const gameConfig = DEFAULT_GAMES_SETTINGS[gameType];
describe('generateAudioGame', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  languages.forEach(language => {
    it(`should return the correct number of questions when data has enough ${language} words`, async () => {
      const gameData = await generateAudioGame(testData[language]);
      expect(gameData?.questions?.length).toBe(gameConfig?.wordsPerGame);
      expect(gameData.type).toBe(gameType);
      expect(gameData).toMatchSnapshot();
    });

    it(`should return the correct number of questions when with minimal ${language} words`, async () => {
      const gameData = await generateAudioGame([testData[language][0]]);
      expect(gameData?.questions?.length).toBe(gameConfig?.minWords);
      expect(gameData.type).toBe(gameType);
      expect(gameData).toMatchSnapshot();
    });
  });
  it('should throw an error with incorrect data', async () => {
    let error;
    try {
      // @ts-expect-error: using incorrect arguments here
      await generateAudioGame([{}]);
    } catch (err) {
      error = err;
    }
    expect(error).toEqual(
      new OperationResolutionError(ERROR_MESSAGES.GAME_GENERATION_FAILED)
    );
  });
});
