import { authenticated } from '../../auth';
import { QueryResolvers } from '../../generated/graphql';
import { IResolverContext } from '../../types/types';
import { UserInputError } from '../../utils/apolloCustomErrors';

export const wordQueryResolvers: QueryResolvers<IResolverContext> = {
  wordsPerPage: authenticated(async (_, { input }, { models, user }) => {
    const result = await models.Word.findManyAndPaginate(input, user.id);
    return result;
  }),

  word: authenticated(async (_, { id }, { models, user }) => {
    const word = await models.Word.findById(id, user.id);
    if (!word) {
      throw new UserInputError(`word with id ${id} is not found`);
    }

    return word;
  }),

  searchWord: authenticated(async (_, { input }, { searchWord }) => {
    const searchResult = await searchWord(input?.search, input.language);
    return searchResult;
  })
};
