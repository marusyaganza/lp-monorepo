import { authorized, UserTokenInfo } from '../auth';
import {
  AuthenticationError,
  UserInputError,
  OperationResolutionError
} from '../utils/apolloCustomErrors';
import {
  AuthUser,
  MutationResolvers as MutationResolversType,
  Role
} from '../generated/graphql';
import { ResolverContext } from './index';

export const MutationResolvers: MutationResolversType<ResolverContext> = {
  saveWord: authorized(Role.Member, async (_, { input }, { models, user }) => {
    const existing = input?.uuid
      ? await models.Word.findOne({
          user: user?.id,
          uuid: input?.uuid
        })
      : null;
    if (existing) {
      throw new UserInputError(
        `word with uuid ${input?.uuid} is already added`
      );
    }
    const word = await models.Word.createOne({ ...input, user: user?.id });
    return word;
  }),
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
  saveGameResult: authorized(
    Role.Member,
    async (_, { input }, { models, user }) => {
      const { ok } = await models.Word.updateStatistics(input, user?.id);
      if (!ok) {
        throw new UserInputError(`saving training result failed`);
      }
      return 'Game result saved';
    }
  ),
  deleteWord: authorized(Role.Member, async (_, { id }, { models, user }) => {
    const result = await models.Word.deleteOne({ id, user: user?.id });
    if (!result.ok) {
      throw new UserInputError(`deleting word with id ${id} failed`);
    }
    return `word with id ${id} was deleted`;
  }),
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
    if (!user) {
      throw new OperationResolutionError(`sign up operation failed`);
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
  },
  login: async (_, { input }, { models, createToken, validatePassword }) => {
    const user = await models.User.findOne({ email: input?.email });
    if (!user) {
      throw new AuthenticationError(`email or password is incorrect`);
    }
    const isValidPassword = await validatePassword(
      input.password,
      user.password
    );
    if (!isValidPassword) {
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
    // TODO find a way to simplify this
    const result: AuthUser = {
      token,
      firstName: user.firstName,
      lastName: user.lastName,
      createdAt: user.createdAt,
      id: user.id,
      role: user.role,
      email: user.email
    };
    return result;
  }
};
