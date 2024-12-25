import { testData } from '../../../tests/mocks/wordsForGames';
import { generateTypeWordGame } from '../generateTypeWordGame';
import { Game, Language } from '../../../generated/graphql';
import { DEFAULT_GAMES_SETTINGS } from '../../../constants/defultGameSettings';

const languages = Object.values(Language);
const gameType = Game.TypeWord;

const gameConfig = DEFAULT_GAMES_SETTINGS[gameType];

describe('generateTypeWordGame', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  languages.forEach(language => {
    it(`should return the correct number of questions when data has enough ${language} words`, async () => {
      const gameData = await generateTypeWordGame(testData[language]);
      expect(gameData?.questions?.length).toBe(gameConfig?.wordsPerGame);
      expect(gameData.type).toBe(gameType);
      expect(gameData).toMatchSnapshot();
    });

    it(`should return the correct number of questions when with minimal ${language} words`, async () => {
      const gameData = await generateTypeWordGame([testData[language][0]]);
      expect(gameData?.questions?.length).toBe(gameConfig?.minWords);
      expect(gameData.type).toBe(gameType);
      expect(gameData).toMatchSnapshot();
    });
  });
});
