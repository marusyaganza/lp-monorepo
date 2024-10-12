import { QueryResolvers } from './Query';
import { MutationResolvers } from './Mutation';
import { Resolvers } from '../generated/graphql';
import { IResolverContext } from '../types/types';
import { isSuggestion } from '../types/typeGuards';

export const resolvers: Resolvers<IResolverContext> = {
  SearchResult: {
    __resolveType(obj) {
      if (isSuggestion(obj)) {
        return 'Suggestions';
      }
      return 'DictionaryWord';
    }
  },
  Query: QueryResolvers,
  Mutation: MutationResolvers
};
