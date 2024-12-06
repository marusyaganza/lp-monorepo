import { ERROR_MESSAGES } from '../../constants/errorMessages';
import { Role } from '../../generated/graphql';
import { AuthenticationError } from '../../utils/apolloCustomErrors';
import { authenticated, authorized } from './resolvers';

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

describe('authenticated', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  afterAll(() => {
    jest.resetAllMocks();
  });

  test('should call next with valid user', async () => {
    const next = jest.fn();
    const fn = authenticated(next);
    const context = {
      user: mockUser,
      models
    };

    const args = ['root', 'args', context, 'info'];
    // @ts-expect-error: using mock arguments here
    await fn(...args);
    expect(findOne).toHaveBeenCalledWith({ id: '1' });
    expect(next).toHaveBeenCalledWith(...args);
  });

  test('should throw error with empty user', async () => {
    const next = jest.fn();
    const fn = authenticated(next);
    const context = {
      user: {},
      models
    };
    const args = ['root', 'args', context, 'info'];
    let error;
    try {
      // @ts-expect-error: using mock arguments here
      await fn(...args);
    } catch (err) {
      error = err;
    }
    expect(error).toEqual(
      new AuthenticationError(ERROR_MESSAGES.NOT_AUTHENTICATED)
    );
  });

  test('should throw error without context', async () => {
    const next = jest.fn();
    const fn = authenticated(next);
    const args = ['root', 'args', null, 'info'];
    let error;
    try {
      // @ts-expect-error: using mock arguments here
      await fn(...args);
    } catch (err) {
      error = err;
    }
    expect(error).toEqual(
      new AuthenticationError(ERROR_MESSAGES.NOT_AUTHENTICATED)
    );
  });

  describe('authorized', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });
    afterAll(() => {
      jest.resetAllMocks();
    });

    test('should call next with valid user and role', async () => {
      const next = jest.fn();
      const fn = authorized(Role.Member, next);
      const context = {
        user: mockUser,
        models
      };
      const args = ['root', 'args', context, 'info'];
      // @ts-expect-error: using mock arguments here
      await fn(...args);
      expect(next).toHaveBeenCalledWith(...args);
    });

    test('should throw error with incorrect role', async () => {
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
        // @ts-expect-error: using mock arguments here
        await fn(...args);
      } catch (err) {
        error = err;
      }
      expect(error).toEqual(
        new AuthenticationError(ERROR_MESSAGES.NOT_AUTHORIZED)
      );
    });

    test('should throw error with empty user', async () => {
      const next = jest.fn();
      const fn = authorized(Role.Member, next);
      const context = {
        user: {}
      };
      const args = ['root', 'args', context, 'info'];
      let error;
      try {
        // @ts-expect-error: using mock arguments here
        await fn(...args);
      } catch (err) {
        error = err;
      }
      expect(error).toEqual(
        new AuthenticationError(ERROR_MESSAGES.NOT_AUTHORIZED)
      );
    });

    test('should throw error without context', async () => {
      const next = jest.fn();
      const fn = authorized(Role.Member, next);
      const args: any[] = ['root', 'args', null, 'info'];
      let error;
      try {
        // @ts-expect-error: using mock arguments here
        await fn(...args);
      } catch (err) {
        error = err;
      }
      expect(error).toEqual(
        new AuthenticationError(ERROR_MESSAGES.NOT_AUTHORIZED)
      );
    });
  });
});
