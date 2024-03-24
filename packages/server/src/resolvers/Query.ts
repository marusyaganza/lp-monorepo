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
  words: authenticated(async (_, { input }, { models, user }) => {
    const sortBy = input?.sortBy || 'updatedAt';
    const isReverseOrder =
      !input?.isReverseOrder && !input?.sortBy ? true : input?.isReverseOrder;
    const words = await models.Word.findManyAndSort({
      ...input,
      user: user?.id,
      sortBy,
      isReverseOrder
    });
    return words;
  }),
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
        isReverseOrder,
        tags
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
        gameType,
        language,
        sortBy,
        isReverseOrder,
        tags,
        timesToLearn: config?.timesToLearn
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
  ),
  tags: authenticated(async (_, { language }, { models, user }) => {
    const tags = await models.WordTag.findMany({
      language,
      user: user?.id
    });
    return tags;
  })
};
