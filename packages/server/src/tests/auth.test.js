const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
import { AuthenticationError } from '../utils/apolloCustomErrors';

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
    compare: jest.fn(() => false),
    genSalt: jest.fn(() => 3)
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

const mockUser = { id: '1', role: Role.Member };
const findOne = jest.fn(() => mockUser);

const models = {
  User: {
    findOne
  }
};

const testData = [
  {
    name: 'createToken',
    module: createToken,
    tests: [
      {
        desc: 'with valid arguments',
        arguments: [mockUser],
        result: 'mock_token_{"id":"1","role":"MEMBER"}_secret_JWT_secret'
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
  afterEach(() => {
    jest.clearAllMocks();
  });
  afterAll(() => {
    jest.resetAllMocks();
  });

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
    const fn = authenticated(next);
    const context = {
      user: mockUser,
      models
    };

    const args = ['root', 'args', context, 'info'];

    await fn(...args);
    expect(findOne).toHaveBeenCalledWith({ id: '1' });
    expect(next).toHaveBeenCalledWith(...args);
  });

  test('authenticated with empty user', async () => {
    const next = jest.fn();
    const fn = authenticated(next);
    const context = {
      user: {},
      models
    };
    const args = ['root', 'args', context, 'info'];
    let error;
    try {
      await fn(...args);
    } catch (err) {
      error = err;
    }
    expect(error).toEqual(
      new AuthenticationError(ERROR_MESSAGES.NOT_AUTHENTICATED)
    );
    // TODO investigate why it stopped working
    // expect(async () => {
    //   await fn(...args);
    // }).toThrow(new AuthenticationError(ERROR_MESSAGES.NOT_AUTHENTICATED));
  });

  test('authenticated without context', async () => {
    const next = jest.fn();
    const fn = authenticated(next);
    const args = ['root', 'args', null, 'info'];
    let error;
    try {
      await fn(...args);
    } catch (err) {
      error = err;
    }
    expect(error).toEqual(
      new AuthenticationError(ERROR_MESSAGES.NOT_AUTHENTICATED)
    );
  });

  test('authorized with valid user and role', async () => {
    const next = jest.fn();
    const fn = authorized(Role.Member, next);
    const context = {
      user: mockUser,
      models
    };
    const args = ['root', 'args', context, 'info'];

    await fn(...args);
    expect(next).toHaveBeenCalledWith(...args);
  });

  test('authorized with incorrect role', async () => {
    const next = jest.fn();
    const fn = authorized(Role.Admin, next);
    const context = {
      user: {
        id: mockUser.id,
        role: Role.Member
      }
    };
    const args = ['root', 'args', context, 'info'];
    let error;
    try {
      await fn(...args);
    } catch (err) {
      error = err;
    }
    expect(error).toEqual(
      new AuthenticationError(ERROR_MESSAGES.NOT_AUTHORIZED)
    );
  });

  test('authorized with empty user', async () => {
    const next = jest.fn();
    const fn = authorized(next);
    const context = {
      user: {}
    };
    const args = ['root', 'args', context, 'info'];
    let error;
    try {
      await fn(...args);
    } catch (err) {
      error = err;
    }
    expect(error).toEqual(
      new AuthenticationError(ERROR_MESSAGES.NOT_AUTHORIZED)
    );
  });

  test('authorized without context', async () => {
    const next = jest.fn();
    const fn = authorized(next);
    const args = ['root', 'args', null, 'info'];
    let error;
    try {
      await fn(...args);
    } catch (err) {
      error = err;
    }
    expect(error).toEqual(
      new AuthenticationError(ERROR_MESSAGES.NOT_AUTHORIZED)
    );
  });
});
