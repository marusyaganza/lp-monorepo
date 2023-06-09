import { AuthenticationError } from './utils/apolloCustomErrors';
import { Role, ResolverFn } from './generated/graphql';
import { ResolverContext } from 'resolvers';
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

export interface UserTokenInfo {
  id: string;
  role: Role;
}

export const ERROR_MESSAGES = {
  NOT_AUTHENTICATED: 'Login to perform this operation',
  NOT_AUTHORIZED: 'You do not have permission to perform this operation'
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ResolverFunc = ResolverFn<any, any, ResolverContext, any>;
export type CreateTokenFuncType = (user: UserTokenInfo) => string | undefined;
export type HashPasswordFuncType = (password?: string) => Promise<string>;
export type ValidatePasswordFuncType = (
  password?: string,
  sample?: string
) => Promise<boolean>;

const { JWT_SECTET } = process.env;

export const hashPassword: HashPasswordFuncType = async function (password) {
  if (!password) {
    return;
  }
  const salt = process.env.SALT_NUMBER || '';
  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, parseInt(salt));
  } catch (err) {
    console.log('error');
  }
  return hashedPassword;
};

export const validatePassword: ValidatePasswordFuncType = async function (
  password,
  sample
) {
  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(password, sample);
  } catch (err) {
    console.error(err);
  }
  return isValidPassword;
};

export const createToken: CreateTokenFuncType = ({ id, role }) => {
  if (!JWT_SECTET) {
    return;
  }
  const token = jwt.sign({ id, role }, JWT_SECTET);
  return token;
};

/**retrieve user data from the token */
export function getUserFromToken(token?: string): UserTokenInfo | undefined {
  if (!token || !JWT_SECTET) {
    return;
  }
  try {
    const user = jwt.verify(token, JWT_SECTET);
    return user;
  } catch (e) {
    console.log('error', e);
    return;
  }
}

export function authenticated(next: ResolverFunc): ResolverFunc {
  return (root, args, context, info) => {
    if (!context?.user?.id) {
      throw new AuthenticationError(ERROR_MESSAGES.NOT_AUTHENTICATED);
    }
    return next(root, args, context, info);
  };
}

export function authorized(role: Role, next: ResolverFunc): ResolverFunc {
  return (root, args, context, info) => {
    if (!context?.user?.id || context?.user?.role !== role) {
      throw new AuthenticationError(ERROR_MESSAGES.NOT_AUTHORIZED);
    }
    return next(root, args, context, info);
  };
}
