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
  games: async (_, { language }, { models }) => {
    const lang = language || Language.English;
    const games = await models.Game.findMany({
      languages: lang
    });
    if (!games) {
      throw new UserInputError(`no games for ${language} language were found`);
    }
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
    async (_, { input }, { models, user, generateGameData }) => {
      const {
        language = Language.English,
        gameType,
        sortBy,
        isReverseOrder,
        tags,
        tense = 'pind'
      } = input;
      const config = await models.Game.findOne({
        type: gameType,
        languages: input.language
      });

      if (!config) {
        throw new OperationResolutionError(`game not found`);
      }

      const minWords = config?.minWords;

      let optionsMaterial;

      if (config?.optionsPerGame) {
        optionsMaterial = await models.Word.findMany(
          {
            user: user?.id,
            language
          },
          'name shortDef',
          { limit: 40 }
        );
      }

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

      return generateGameData(gameType, words, config, optionsMaterial, tense);
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
