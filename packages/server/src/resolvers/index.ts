import { QueryResolvers } from './Query';
import { MutationResolvers } from './Mutation';
import { Resolvers } from '../generated/graphql';
import {
  CreateTokenFuncType,
  UserTokenInfo,
  ValidatePasswordFuncType,
  HashPasswordFuncType
} from '../auth';
import { ModelsType } from 'db';

export interface ResolverContext {
  models: ModelsType;
  user?: UserTokenInfo;
  createToken: CreateTokenFuncType;
  validatePassword: ValidatePasswordFuncType;
  hashPassword: HashPasswordFuncType;
}

export const resolvers: Resolvers<ResolverContext> = {
  Query: QueryResolvers,
  Mutation: MutationResolvers
};
