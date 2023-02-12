const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

import {
  ERROR_MESSAGES,
  hashPassword,
  createToken,
  validatePassword,
  getUserFromToken,
  authenticated,
  authorized
} from '../auth';
import { mockEnv } from '../mocks/constants';
import { Role } from '../generated/graphql';

jest.mock('bcryptjs', () => {
  return {
    hash: jest.fn((pass, salt) => `mock_hash_${pass}_salt_${salt}`),
    compare: jest.fn(() => false)
  };
});

jest.mock('jsonwebtoken', () => {
  return {
    sign: jest.fn(
      (obj, secret) => `mock_token_${JSON.stringify(obj)}_secret_${secret}`
    ),
    verify: jest.fn(() => 'user')
  };
});

const mockUser = { id: '1', role: 'role' };

const testData = [
  {
    name: 'createToken',
    module: createToken,
    tests: [
      {
        desc: 'with valid arguments',
        arguments: [mockUser],
        result: 'mock_token_{"id":"1","role":"role"}_secret_JWT_secret'
      }
    ]
  },
  {
    name: 'hashPassword',
    module: hashPassword,
    tests: [
      {
        desc: 'with valid arguments',
        arguments: ['password'],
        result: 'mock_hash_password_salt_3'
      },
      {
        desc: 'with empty arguments',
        arguments: [undefined],
        result: undefined
      }
    ]
  }
];

testData.forEach(testModule => {
  describe(`auth ${testModule.name}`, () => {
    testModule.tests.forEach(testCase => {
      test(`${testCase.desc}`, async () => {
        const result = await testModule.module(...testCase.arguments);
        expect(result).toBe(testCase.result);
      });
    });
  });
});

describe('auth', () => {
  test('validatePassword', async () => {
    const args = ['arg1', 'arg2'];
    const result = await validatePassword(...args);
    expect(bcrypt.compare).toHaveBeenCalledWith(...args);
    expect(result).toBe(false);
  });
  test('getUserFromToken with valid args', async () => {
    const token = 'token';
    const result = await getUserFromToken(token);
    expect(jwt.verify).toHaveBeenCalledWith('token', mockEnv.JWT_SECTET);
    expect(result).toBe('user');
  });
  test('getUserFromToken with empty args', async () => {
    const result = await getUserFromToken();
    expect(result).toBe(undefined);
  });
  test('authenticated with valid user', async () => {
    const next = jest.fn();
    const fn = await authenticated(next);
    const context = {
      user: mockUser
    };
    const args = ['root', 'args', context, 'info'];

    fn(...args);
    expect(next).toHaveBeenCalledWith(...args);
  });
  test('authenticated with empty user', async () => {
    const next = jest.fn();
    const fn = await authenticated(next);
    const context = {
      user: {}
    };
    const args = ['root', 'args', context, 'info'];
    expect(() => {
      fn(...args);
    }).toThrow(ERROR_MESSAGES.NOT_AUTHENTICATED);
  });
  test('authenticated without context', async () => {
    const next = jest.fn();
    const fn = await authenticated(next);
    const args = ['root', 'args', null, 'info'];
    expect(() => {
      fn(...args);
    }).toThrow(ERROR_MESSAGES.NOT_AUTHENTICATED);
  });
  test('authorized with valid user and role', async () => {
    const next = jest.fn();
    const fn = await authorized(Role.Admin, next);
    const context = {
      user: {
        id: mockUser.id,
        role: Role.Admin
      }
    };
    const args = ['root', 'args', context, 'info'];

    fn(...args);
    expect(next).toHaveBeenCalledWith(...args);
  });
  test('authorized with incorrect role', async () => {
    const next = jest.fn();
    const fn = await authorized(Role.Admin, next);
    const context = {
      user: {
        id: mockUser.id,
        role: Role.Member
      }
    };
    const args = ['root', 'args', context, 'info'];
    expect(() => {
      fn(...args);
    }).toThrow(ERROR_MESSAGES.NOT_AUTHORIZED);
  });
  test('authorized with empty user', async () => {
    const next = jest.fn();
    const fn = await authorized(next);
    const context = {
      user: {}
    };
    const args = ['root', 'args', context, 'info'];
    expect(() => {
      fn(...args);
    }).toThrow(ERROR_MESSAGES.NOT_AUTHORIZED);
  });
  test('authorized without context', async () => {
    const next = jest.fn();
    const fn = await authorized(next);
    const args = ['root', 'args', null, 'info'];
    expect(() => {
      fn(...args);
    }).toThrow(ERROR_MESSAGES.NOT_AUTHORIZED);
  });
});
