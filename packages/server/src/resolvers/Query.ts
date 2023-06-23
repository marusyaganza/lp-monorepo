import { authenticated } from '../auth';
import { UserInputError } from '../utils/apolloCustomErrors';
import { QueryResolvers as QueryResolversType } from '../generated/graphql';
import { ResolverContext } from './index';

export const QueryResolvers: QueryResolversType<ResolverContext> = {
  user: async (_, __, { models, user }) => {
    const result = await models.User.findOne({ id: user?.id });
    if (!result) {
      throw new UserInputError(`user is not found`);
    }
    return result;
  },
  words: authenticated(async (_, __, { models, user }) => {
    const words = await models.Word.findMany({ user: user?.id });
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
  })
};
