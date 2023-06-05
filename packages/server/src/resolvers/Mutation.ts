import { authorized, UserTokenInfo } from '../auth';
import {
  AuthenticationError,
  UserInputError,
  OperationResolutionError
} from '../utils/apolloCustomErrors';
import {
  MutationResolvers as MutationResolversType,
  Role
} from '../generated/graphql';
import { ResolverContext } from './index';

export const MutationResolvers: MutationResolversType<ResolverContext> = {
  saveWord: authorized(
    Role.Member,
    async (_, { input }, { models, user }: ResolverContext) => {
      if (!user?.id) {
        throw new OperationResolutionError(
          `creating word with name ${input.name} failed`
        );
      }
      const word = await models.Word.createOne({ ...input, user: user.id });
      return word;
    }
  ),
  updateWord: authorized(
    Role.Member,
    async (_, { input }, { models, user }) => {
      const { ok, value } = await models.Word.updateOne({
        ...input,
        user: user?.id
      });
      if (!ok) {
        throw new UserInputError(`updating word with id ${input.id} failed`);
      }
      return value;
    }
  ),
  deleteWord: authorized(Role.Member, async (_, { id }, { models, user }) => {
    const result = await models.Word.deleteOne({ id, user: user?.id });
    if (!result.ok) {
      throw new UserInputError(`deleting word with id ${id} failed`);
    }
    return `word with id ${id} was deleted`;
  }),
  // @ts-ignore
  signUp: async (_, { input }, { models, createToken, hashPassword }) => {
    const existing = await models.User.findOne({ email: input?.email });
    if (existing) {
      throw new AuthenticationError(
        `user with email ${input?.email} already exists`
      );
    }
    const role = Role.Member;
    const hashedPassword = await hashPassword(input?.password);
    if (!hashedPassword) {
      throw new OperationResolutionError(`sign up operation failed`);
    }
    const user = await models.User.createOne({
      ...input,
      password: hashedPassword,
      role
    });
    const userInfo = {
      // @ts-ignore
      id: user.id,
      // @ts-ignore
      role: user.role
    } as UserTokenInfo;
    const token = createToken(userInfo);
    if (!token) {
      throw new OperationResolutionError(`sign up operation failed`);
    }
    return { ...user, token };
  },
  login: async (_, { input }, { models, createToken, validatePassword }) => {
    const user = await models.User.findOne({ email: input?.email });
    if (!user || !validatePassword(input?.password, user?.password)) {
      throw new AuthenticationError(`email or password is incorrect`);
    }
    const userInfo = {
      id: user.id,
      role: user.role
    } as UserTokenInfo;

    const token = createToken(userInfo);
    if (!token) {
      throw new OperationResolutionError(`sign up operation failed`);
    }
    return { ...user, token };
  }
};
