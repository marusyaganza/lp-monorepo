import { IResolverContext } from '../../types/types';
import { AuthUser, MutationResolvers } from '../../generated/graphql';
import {
  AuthenticationError,
  OperationResolutionError
} from '../../utils/apolloCustomErrors';
import { ERROR_MESSAGES } from '../../constants/errorMessages';

export const userMutationResolvers: MutationResolvers<IResolverContext> = {
  signUp: async (_, { input }, { models, createToken }) => {
    if (process?.env?.NODE_ENV === 'production') {
      throw new OperationResolutionError(ERROR_MESSAGES.SING_UP_UNAVAILABLE);
    }
    const user = await models.User.createOne(input);

    if (!user) {
      throw new OperationResolutionError(ERROR_MESSAGES.SIGN_UP_FAILED);
    }

    const userInfo = {
      id: user.id,
      role: user.role
    };

    const token = createToken(userInfo);

    if (!token) {
      throw new OperationResolutionError(ERROR_MESSAGES.SIGN_UP_FAILED);
    }

    return { ...user, token } as AuthUser;
  },

  login: async (_, { input }, { models, createToken, validatePassword }) => {
    const user = await models.User.findOne({ email: input?.email });
    if (!user) {
      throw new AuthenticationError(ERROR_MESSAGES.INCORRECT_CREDS);
    }
    const isValidPassword = await validatePassword(
      input.password,
      user.password
    );

    if (!isValidPassword) {
      throw new AuthenticationError(ERROR_MESSAGES.INCORRECT_CREDS);
    }

    const userInfo = {
      id: user.id,
      role: user.role
    };

    const token = createToken(userInfo);

    if (!token) {
      throw new OperationResolutionError(ERROR_MESSAGES.SIGN_UP_FAILED);
    }

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
