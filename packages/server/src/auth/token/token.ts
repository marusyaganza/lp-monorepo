import jwt from 'jsonwebtoken';
import { DEFAULT_TOKEN_TTL } from '../../constants/defaultValues';
import { Role } from '../../generated/graphql';
import { assertIsUserTokenInfo, isUserTokenInfo } from '../../types/typeGuards';
import { IUserTokenInfo } from '../../types/types';

const { JWT_SECTET, TOKEN_TTL, DEMO_VERSION } = process.env;

const isDemo = DEMO_VERSION === 'true';

export function createToken(input: {
  id: string;
  role: Role;
}): string | undefined {
  if (!JWT_SECTET || !isUserTokenInfo(input)) {
    return;
  }
  const { id, role } = input;
  const tokenTtl = TOKEN_TTL || DEFAULT_TOKEN_TTL;
  const token = jwt.sign({ id, role }, JWT_SECTET, {
    expiresIn: isDemo ? '1h' : `${tokenTtl}d`
  });
  return token;
}

export function getUserFromToken(token?: string): IUserTokenInfo | undefined {
  if (!token || !JWT_SECTET) {
    return;
  }
  try {
    const user = jwt.verify(token, JWT_SECTET);
    assertIsUserTokenInfo(user);
    return user;
  } catch (e) {
    console.error('error', e);
    return;
  }
}
