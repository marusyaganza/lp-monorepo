import { IResolverContext } from '../types/types';
import { MutationResolvers as MutationResolversType } from '../generated/graphql';
import { userMutationResolvers } from './user/userMutation';
import { wordMutationResolvers } from './word/wordMutation';
import { tagMutationResolvers } from './tag/tagMutation.resolvers';

export const MutationResolvers: MutationResolversType<IResolverContext> = {
  ...userMutationResolvers,
  ...wordMutationResolvers,
  ...tagMutationResolvers
};
