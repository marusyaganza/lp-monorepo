import { testData } from '../../../tests/mocks/wordsForGames';
import { generateGenderGame } from '../generateGenderGame';
import { Game, Language } from '../../../generated/graphql';
import { DEFAULT_GAMES_SETTINGS } from '../../../constants/defaultGameSettings';

const gameType = Game.Gender;
const language = Language.Spanish;

const gameConfig = DEFAULT_GAMES_SETTINGS[gameType];

describe('generateGenderGame', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it(`should return the correct number of questions when data has enough ${language} words`, async () => {
    const gameData = await generateGenderGame(testData[language]);
    expect(gameData).toMatchSnapshot();
    expect(gameData?.questions?.length).toBe(gameConfig?.wordsPerGame);
    expect(gameData.type).toBe(gameType);
  });

  it(`should return the correct number of questions when with minimal ${language} words`, async () => {
    const gameData = await generateGenderGame([testData[language][0]]);
    expect(gameData?.questions?.length).toBe(gameConfig?.minWords);
    expect(gameData.type).toBe(gameType);
    expect(gameData).toMatchSnapshot();
  });
});
