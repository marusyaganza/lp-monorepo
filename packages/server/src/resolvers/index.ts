import { QueryResolvers } from './Query';
import { MutationResolvers } from './Mutation';
import { Resolvers } from '../generated/graphql';
import {
  CreateTokenFuncType,
  UserTokenInfo,
  ValidatePasswordFuncType,
  HashPasswordFuncType
} from '../auth';
import { ModelsType } from '../db/models';
import { SearchFuncType } from '../dictionary/searchWord';

export interface ResolverContext {
  models: ModelsType;
  user?: UserTokenInfo;
  createToken: CreateTokenFuncType;
  validatePassword: ValidatePasswordFuncType;
  hashPassword: HashPasswordFuncType;
  searchWord: SearchFuncType;
}

export const resolvers: Resolvers<ResolverContext> = {
  SearchResult: {
    __resolveType(obj) {
      // @ts-ignore
      if (obj?.suggestions) {
        return 'Suggestions';
      }
      // @ts-ignore
      if (obj?.name) {
        return 'DictionaryWord';
      }

      return null;
    }
  },
  Query: QueryResolvers,
  Mutation: MutationResolvers
};
