import {
  connectToDb,
  createTestServer,
  disconnectFromDb,
  dropDb,
  getDataFromGQL,
  getErrorMessageFromGQL,
  seedDb
} from '../../../tests/helpers';
import {
  Language,
  Game,
  SortBy,
  Role,
  Tense
} from '../../../generated/graphql';

import { models } from '../../../tests/mocks/mockModels';
import { gameQueries } from '../../../tests/mocks/gqlQueries';
import { newWordInputs } from '../../../tests/mocks/inputs/newWordInputs';
import { usersTestData } from '../../../tests/mocks/inputs/newUserInput';
import { generateGameData } from '../../../generateGameData';
import { GAMES } from '../../../constants/games';
import { ERROR_MESSAGES } from '../../../constants/errorMessages';

const gameTypes = Object.values(Game).filter(
  g => g !== Game.Conjugation && g !== Game.Gender
);
const languages = Object.values(Language);
const tenses = Object.values(Tense);

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
  gameTypes.forEach(game => {
    languages.forEach(lang => {
      test(`game query with ${game} and ${lang}`, async () => {
        const gameConfig = GAMES.find(g => g.type === game);
        const wordsPerGame = gameConfig?.wordsPerGame as number;
        const userId = data?.users?.[0] as string;

        const { query } = createTestServer({
          models,
          generateGameData,
          user: { id: userId, role: Role.Member }
        });
        const res = await query({
          query: gameQueries.gameQuery,
          variables: {
            input: {
              gameType: game,
              language: lang
            }
          }
        });
        expect(getDataFromGQL(res).game.questions).toHaveLength(wordsPerGame);
        expect(
          getDataFromGQL(res).game.questions?.map(q => ({
            ...q,
            wordId: expect.any(String)
          }))
        ).toMatchSnapshot();
        expect(getDataFromGQL(res).game.type).toEqual(game);
        expect(getErrorMessageFromGQL(res)).toEqual(undefined);
      });
      test(`game query with ${game} and ${lang} if there not enough words`, async () => {
        const userId = data?.users?.[1] as string;

        const { query } = createTestServer({
          models,
          generateGameData,
          user: { id: userId, role: Role.Member }
        });
        const res = await query({
          query: gameQueries.gameQuery,
          variables: {
            input: {
              gameType: game,
              language: lang
            }
          }
        });
        expect(getErrorMessageFromGQL(res)).toEqual(
          'not enough words to start a game. You have 0 word. Words requited for the game: 1'
        );
      });

      test(`game query with ${game} and ${lang} for unknown user`, async () => {
        const { query } = createTestServer({
          models,
          generateGameData
        });
        const res = await query({
          query: gameQueries.gameQuery,
          variables: {
            input: {
              gameType: game,
              language: lang
            }
          }
        });
        expect(getErrorMessageFromGQL(res)).toEqual(
          ERROR_MESSAGES.NOT_AUTHENTICATED
        );
      });
    });
  });

  tenses.forEach(tense => {
    test(`game query with valid user for Conjugation game and ${tense} tense`, async () => {
      const gameConfig = GAMES.find(g => g.type === Game.Conjugation);
      const wordsPerGame = gameConfig?.wordsPerGame as number;
      const userId = data?.users?.[0] as string;

      const input = {
        gameType: Game.Conjugation,
        language: Language.Spanish,
        sortBy: SortBy.SuccessRate,
        tense
      };
      const { query } = createTestServer({
        generateGameData,
        models,
        user: { id: userId, role: Role.Member }
      });
      const res = await query({
        query: gameQueries.gameQuery,
        variables: {
          input
        }
      });
      expect(getDataFromGQL(res).game.questions).toHaveLength(wordsPerGame);
      expect(
        getDataFromGQL(res).game.questions?.map(q => ({
          ...q,
          wordId: expect.any(String)
        }))
      ).toMatchSnapshot();
      expect(getDataFromGQL(res).game.type).toEqual(Game.Conjugation);
      expect(getErrorMessageFromGQL(res)).toEqual(undefined);
    });

    test(`game query with valid user Conjugation game ${tense} tense and English`, async () => {
      const userId = data?.users?.[0] as string;

      const input = {
        gameType: Game.Conjugation,
        language: Language.English,
        sortBy: SortBy.SuccessRate,
        tense
      };
      const { query } = createTestServer({
        generateGameData,
        models,
        user: { id: userId, role: Role.Member }
      });
      const res = await query({
        query: gameQueries.gameQuery,
        variables: {
          input
        }
      });

      expect(getErrorMessageFromGQL(res)).toEqual(
        ERROR_MESSAGES.GAME_NOT_FOUND
      );
    });
  });
});
