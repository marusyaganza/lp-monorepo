import { authenticated } from '../auth';
import {
  UserInputError,
  OperationResolutionError
} from '../utils/apolloCustomErrors';
import {
  Language,
  QueryResolvers as QueryResolversType
} from '../generated/graphql';
import { ResolverContext } from './index';

export const QueryResolvers: QueryResolversType<ResolverContext> = {
  user: async (_, __, { models, user }) => {
    const result = await models.User.findOne({ id: user?.id });
    if (!result) {
      throw new UserInputError(`user is not found`);
    }
    return result;
  },
  games: async (_, __, { games }) => {
    return games;
  },
  words: authenticated(
    async (_, { language = Language.English }, { models, user }) => {
      const words = await models.Word.findMany({ user: user?.id, language });
      return words;
    }
  ),
  word: authenticated(async (_, { id }, { models, user }) => {
    const word = await models.Word.findOne({
      user: user?.id,
      id
    });
    if (!word) {
      throw new UserInputError(`word with id ${id} is not found`);
    }
    return word;
  }),
  searchWord: authenticated(async (_, { input }, { searchWord }) => {
    const searchResult = await searchWord(input?.search, input?.language);
    return searchResult;
  }),
  game: authenticated(
    async (_, { input }, { models, user, generateGameData, games }) => {
      const {
        language = Language.English,
        gameType,
        sortBy,
        isReverseOrder
      } = input;
      const config = games.find(game => game.type === gameType);

      if (!config) {
        throw new OperationResolutionError(`game not found`);
      }

      const minWords = config?.minWords;

      // @ts-ignore
      const words = await models.Word.findManyAndSort({
        // @ts-ignore
        user: user?.id,
        language,
        sortBy,
        isReverseOrder
      });
      if (!words) {
        throw new OperationResolutionError(`words not found`);
      }

      if (!minWords || words.length < minWords) {
        throw new OperationResolutionError(
          `not enough words to start a game. You have ${words.length} word. Words requited for the game: ${minWords}`
        );
      }

      return generateGameData(gameType, words, config);
    }
  )
};
