import jwt from 'jsonwebtoken';
import { getUserFromToken, createToken } from './token';
import { mockEnv } from '../../tests/mocks/mockEnv';
import { Role } from '../../generated/graphql';
import { IUserTokenInfo } from '../../types/types';

jest.mock('jsonwebtoken', () => {
  return {
    sign: jest.fn(
      (obj, secret) => `mock_token_${JSON.stringify(obj)}_secret_${secret}`
    ),
    verify: jest.fn(() => mockUser)
  };
});

const mockUser = { id: '1', role: Role.Member };

describe('getUserFromToken', () => {
  test('should return user data with valid token', () => {
    const token = 'token';
    const result = getUserFromToken(token);
    expect(jwt.verify).toHaveBeenCalledWith('token', mockEnv.JWT_SECTET);
    expect(result).toEqual(mockUser);
  });

  test('should return undefined with empty data', () => {
    const result = getUserFromToken();
    expect(result).toBe(undefined);
  });

  test('should return undefined with invalid token', () => {
    const token = 'token';
    // @ts-expect-error: ts do not hanle this mocking case
    jwt.verify.mockReturnValueOnce('user');
    const result = getUserFromToken(token);
    expect(result).toBe(undefined);

    expect(jwt.verify).toHaveBeenCalledWith('token', mockEnv.JWT_SECTET);
  });
});

describe('createToken', () => {
  test('should return token with valid data', () => {
    const result = createToken(mockUser);
    expect(jwt.sign).toHaveBeenCalledWith(mockUser, mockEnv.JWT_SECTET, {
      expiresIn: `${mockEnv.TOKEN_TTL}d`
    });
    expect(result).toEqual(
      'mock_token_{"id":"1","role":"MEMBER"}_secret_JWT_secret'
    );
  });

  test('should return undefined with empty data', () => {
    const emptyData = {} as IUserTokenInfo;
    const result = createToken(emptyData);
    expect(result).toBe(undefined);
  });
});
