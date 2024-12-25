import { testData } from '../../../tests/mocks/wordsForGames';
import { generateSelectWordGame } from '../generateSelectWordGame';
import { Game, Language, Word } from '../../../generated/graphql';
import {
  connectToDb,
  disconnectFromDb,
  dropDb,
  seedDb
} from '../../../tests/helpers/testDBUtils';
import { newWordInputs } from '../../../tests/mocks/inputs/newWordInputs';
import { usersTestData } from '../../../tests/mocks/inputs/newUserInput';
import { DEFAULT_GAMES_SETTINGS } from '../../../constants/defultGameSettings';

const gameType = Game.SelectWord;
const gameConfig = DEFAULT_GAMES_SETTINGS[gameType];

const languages = Object.values(Language);
const task = 'Select a word that means ';
describe('generateSelectWordGame', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  beforeEach(async () => {
    await connectToDb();
    await dropDb();
  });

  afterEach(async () => {
    await dropDb();
    await disconnectFromDb();
  });

  languages.forEach(language => {
    it(`should return the correct number of questions when data has enough ${language} words`, async () => {
      const data = await seedDb({
        words: [
          ...newWordInputs[Language.Spanish],
          ...newWordInputs[Language.English]
        ],
        users: [usersTestData[0]]
      });
      const wordId = data?.words?.[0] as string;
      const userId = data?.users?.[0] as string;
      const words = [...testData[language]] as Word[];
      words[0].id = wordId;
      const gameData = await generateSelectWordGame(
        words,
        {
          language,
          gameType
        },
        gameConfig,
        userId
      );
      expect(
        gameData.questions?.map(q => ({ ...q, wordId: expect.any(String) }))
      ).toMatchSnapshot();
      expect(gameData?.task).toEqual(task);
      expect(gameData.type).toEqual(gameType);
      expect(gameData?.questions?.length).toBe(gameConfig?.wordsPerGame);
      expect(gameData.type).toBe(gameType);
    });

    it(`generate data with minimal ${language} words`, async () => {
      const data = await seedDb({
        words: [
          newWordInputs[Language.Spanish][0],
          newWordInputs[Language.English][0]
        ],
        users: [usersTestData[0]]
      });
      const wordId = data?.words?.[0] as string;
      const userId = data?.users?.[0] as string;
      const words = [testData[language][0]] as Word[];
      words[0].id = wordId;
      const gameData = await generateSelectWordGame(
        words,
        {
          language: language,
          gameType
        },
        gameConfig,
        userId
      );

      expect(gameData?.questions?.length).toBe(gameConfig?.minWords);
      expect(gameData.type).toBe(gameType);
      expect(gameData?.questions?.[0]).toMatchSnapshot({
        wordId: expect.any(String)
      });
    });
  });
});
