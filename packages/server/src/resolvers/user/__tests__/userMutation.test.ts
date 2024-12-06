import {
  createTestServer,
  getDataFromGQL,
  getErrorMessageFromGQL
} from '../../../tests/helpers';
import { mutations } from '../../../tests/mocks/gqlMutations';
import { Role } from '../../../generated/graphql';
import { models } from '../../../tests/mocks/mockModels';
import {
  mockValidatePassword,
  mockCreateToken,
  mockHashPassword
} from '../../../tests/mocks/mockAuthFunc';
import { ERROR_MESSAGES } from '../../../constants/errorMessages';

const signUpData = {
  firstName: 'User',
  lastName: 'Test',
  email: 'test@test.com',
  password: 'password'
};

const loginInput = { email: 'member@member.com', password: 'password1' };
const originalEnv = process.env;

describe('user mutations', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.resetAllMocks();
    process.env = originalEnv;
  });
  test('login with correct password', async () => {
    const { mutate } = createTestServer({
      createToken: mockCreateToken,
      validatePassword: mockValidatePassword,
      models
    });

    const res = await mutate({
      mutation: mutations.loginMutation,
      variables: { input: loginInput }
    });
    expect(mockValidatePassword).toHaveBeenCalledWith('password1', 'password');
    expect(getDataFromGQL(res)).toMatchSnapshot();
    expect(models.User.findOne).toHaveBeenCalledWith({
      email: 'member@member.com'
    });
    expect(mockCreateToken).toHaveBeenCalledWith({ id: '1', role: 'MEMBER' });
  });

  test('login with correct password if token is not defined', async () => {
    const { mutate } = createTestServer({
      createToken: mockCreateToken,
      validatePassword: mockValidatePassword,
      models
    });
    // @ts-expect-error: ts do not hanle this mocking case
    mockCreateToken.mockReturnValueOnce(undefined);
    const res = await mutate({
      mutation: mutations.loginMutation,
      variables: { input: loginInput }
    });
    expect(mockValidatePassword).toHaveBeenCalledWith('password1', 'password');
    expect(getErrorMessageFromGQL(res)).toEqual(ERROR_MESSAGES.SIGN_UP_FAILED);
    expect(models.User.findOne).toHaveBeenCalledWith({
      email: loginInput.email
    });
    expect(mockCreateToken).toHaveBeenCalledWith({
      id: '1',
      role: Role.Member
    });
  });

  test('login with incorrect password', async () => {
    // @ts-expect-error: ts do not hanle this mocking case
    mockValidatePassword.mockReturnValueOnce(false);
    const { mutate } = createTestServer({
      createToken: mockCreateToken,
      validatePassword: mockValidatePassword,
      models
    });
    const res = await mutate({
      mutation: mutations.loginMutation,
      variables: { input: loginInput }
    });
    expect(mockValidatePassword).toHaveBeenCalledWith('password1', 'password');
    expect(getErrorMessageFromGQL(res)).toEqual(ERROR_MESSAGES.INCORRECT_CREDS);
  });

  test('login with invalid email', async () => {
    // @ts-expect-error: ts do not hanle this mocking case
    models.User.findOne.mockReturnValueOnce(null);
    const { mutate } = createTestServer({
      createToken: mockCreateToken,
      validatePassword: mockValidatePassword,
      models
    });
    const res = await mutate({
      mutation: mutations.loginMutation,
      variables: { input: loginInput }
    });
    expect(getErrorMessageFromGQL(res)).toEqual(ERROR_MESSAGES.INCORRECT_CREDS);
  });

  test('signUp', async () => {
    // @ts-expect-error: ts do not hanle this mocking case
    models.User.findOne.mockReturnValueOnce(null);
    const { mutate } = createTestServer({
      createToken: mockCreateToken,
      models
    });

    const res = await mutate({
      mutation: mutations.signUpMutation,
      variables: {
        input: {
          ...signUpData
        }
      }
    });
    expect(getErrorMessageFromGQL(res)).toEqual(undefined);
    expect(mockCreateToken).toHaveBeenCalledWith({
      id: '2',
      role: Role.Member
    });
    expect(models.User.createOne).toHaveBeenCalledWith({
      ...signUpData
    });
    expect(getDataFromGQL(res)).toMatchSnapshot();
    expect(getErrorMessageFromGQL(res)).toEqual(undefined);
  });

  test('signUp if user creation returns undefined', async () => {
    const { mutate } = createTestServer({
      createToken: mockCreateToken,
      hashPassword: mockHashPassword,
      models: {
        ...models,
        User: {
          createOne: jest.fn()
        }
      }
    });

    const res = await mutate({
      mutation: mutations.signUpMutation,
      variables: {
        input: {
          ...signUpData
        }
      }
    });

    expect(getErrorMessageFromGQL(res)).toEqual(ERROR_MESSAGES.SIGN_UP_FAILED);
    expect(mockHashPassword).toHaveBeenCalledTimes(0);
    expect(models.User.createOne).toHaveBeenCalledTimes(0);
  });

  test('signUp if token is not defined', async () => {
    // @ts-expect-error: ts do not hanle this mocking case
    models.User.findOne.mockReturnValueOnce(null);
    // @ts-expect-error: ts do not hanle this mocking case
    mockCreateToken.mockReturnValueOnce(undefined);

    const { mutate } = createTestServer({
      createToken: mockCreateToken,
      hashPassword: mockHashPassword,
      models
    });

    const res = await mutate({
      mutation: mutations.signUpMutation,
      variables: {
        input: {
          ...signUpData
        }
      }
    });
    expect(getErrorMessageFromGQL(res)).toEqual(ERROR_MESSAGES.SIGN_UP_FAILED);
  });

  test('signUp in production', async () => {
    const { mutate } = createTestServer({
      createToken: mockCreateToken,
      hashPassword: mockHashPassword,
      models
    });

    process.env.NODE_ENV = 'production';

    const res = await mutate({
      mutation: mutations.signUpMutation,
      variables: {
        input: {
          ...signUpData
        }
      }
    });
    expect(getErrorMessageFromGQL(res)).toEqual(
      ERROR_MESSAGES.SING_UP_UNAVAILABLE
    );
    expect(models.User.findOne).toHaveBeenCalledTimes(0);
    expect(models.User.createOne).toHaveBeenCalledTimes(0);
    expect(mockHashPassword).toHaveBeenCalledTimes(0);
  });
});
