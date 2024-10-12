import { QueryResolvers as QueryResolversType } from '../generated/graphql';
import { IResolverContext } from '../types/types';
import { userQueryResolvers } from './user/userQuery';
import { wordQueryResolvers } from './word/wordQuery';
import { gameQueryResolvers } from './game/gameQuery';
import { tagQueryResolvers } from './tag/tagQuery.resolvers';

export const QueryResolvers: QueryResolversType<IResolverContext> = {
  ...userQueryResolvers,
  ...wordQueryResolvers,
  ...gameQueryResolvers,
  ...tagQueryResolvers
};
