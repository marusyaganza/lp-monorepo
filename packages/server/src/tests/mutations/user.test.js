import { createTestServer, getErrorMessageFromGQL } from '../helpers';
import { mutations } from '../mocks/gqlMutations';
import { Role } from '../../generated/graphql';
import { models } from '../mocks/models';
import {
  validatePassword,
  createToken,
  hashPassword
} from '../mocks/mockAuthFunc';

const signUpData = {
  firstName: 'User',
  lastName: 'Test',
  email: 'test@test.com',
  password: 'password'
};

const loginInput = { email: 'member@member.com', password: 'password1' };

describe('user mutations', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  afterAll(() => {
    jest.resetAllMocks();
  });
  test('login with correct password', async () => {
    const { mutate } = createTestServer({
      createToken,
      validatePassword,
      models
    });

    const res = await mutate({
      mutation: mutations.loginMutation,
      variables: { input: loginInput }
    });
    expect(validatePassword).toHaveBeenCalledWith('password1', 'password');
    expect(res).toMatchSnapshot();
    expect(models.User.findOne).toHaveBeenCalledWith({
      email: 'member@member.com'
    });
    expect(createToken).toHaveBeenCalledWith({ id: '1', role: 'MEMBER' });
  });

  test('login with correct password if token is not defined', async () => {
    const { mutate } = createTestServer({
      createToken,
      validatePassword,
      models
    });
    createToken.mockReturnValueOnce(undefined);
    const res = await mutate({
      mutation: mutations.loginMutation,
      variables: { input: loginInput }
    });
    expect(validatePassword).toHaveBeenCalledWith('password1', 'password');
    expect(getErrorMessageFromGQL(res)).toEqual('sign up operation failed');
    expect(models.User.findOne).toHaveBeenCalledWith({
      email: loginInput.email
    });
    expect(createToken).toHaveBeenCalledWith({ id: '1', role: Role.Member });
  });

  test('login with incorrect password', async () => {
    validatePassword.mockReturnValueOnce(false);
    const { mutate } = createTestServer({
      createToken,
      validatePassword,
      models
    });
    const res = await mutate({
      mutation: mutations.loginMutation,
      variables: { input: loginInput }
    });
    expect(validatePassword).toHaveBeenCalledWith('password1', 'password');
    expect(getErrorMessageFromGQL(res)).toEqual(
      'email or password is incorrect'
    );
  });

  test('login with invalid email', async () => {
    models.User.findOne.mockReturnValueOnce(null);
    const { mutate } = createTestServer({
      createToken,
      validatePassword,
      models
    });
    const res = await mutate({
      mutation: mutations.loginMutation,
      variables: { input: loginInput }
    });
    expect(getErrorMessageFromGQL(res)).toEqual(
      'email or password is incorrect'
    );
  });

  test('signUp', async () => {
    models.User.findOne.mockReturnValueOnce(null);
    const { mutate } = createTestServer({
      createToken,
      hashPassword,
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
    expect(res).toMatchSnapshot();
    expect(models.User.findOne).toHaveBeenCalledWith({
      email: signUpData.email
    });
    expect(hashPassword).toHaveBeenCalledWith(signUpData.password);
    expect(models.User.createOne).toHaveBeenCalledWith({
      ...signUpData,
      role: Role.Member,
      password: 'mock_hash_password'
    });
  });

  test('signUp if email is already taken', async () => {
    const { mutate } = createTestServer({
      createToken,
      hashPassword,
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
    expect(getErrorMessageFromGQL(res)).toEqual(
      'user with email test@test.com already exists'
    );
    expect(models.User.findOne).toHaveBeenCalledWith({
      email: signUpData.email
    });
    expect(hashPassword).toHaveBeenCalledTimes(0);
    expect(models.User.createOne).toHaveBeenCalledTimes(0);
  });

  test('signUp if token is not defined', async () => {
    models.User.findOne.mockReturnValueOnce(null);
    createToken.mockReturnValueOnce(undefined);

    const { mutate } = createTestServer({
      createToken,
      hashPassword,
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
    expect(getErrorMessageFromGQL(res)).toEqual('sign up operation failed');
    expect(models.User.findOne).toHaveBeenCalledWith({
      email: signUpData.email
    });
  });

  test('signUp if hashing password fails', async () => {
    models.User.findOne.mockReturnValueOnce(null);
    hashPassword.mockResolvedValue(undefined);

    const { mutate } = createTestServer({
      createToken,
      hashPassword,
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
    expect(getErrorMessageFromGQL(res)).toEqual('sign up operation failed');
    expect(models.User.findOne).toHaveBeenCalledWith({
      email: signUpData.email
    });
    expect(hashPassword).toHaveBeenCalledWith('password');
    expect(models.User.createOne).toHaveBeenCalledTimes(0);
  });

  test('signUp if user creation fails', async () => {
    models.User.findOne.mockReturnValueOnce(null);
    models.User.createOne.mockReturnValueOnce(null);

    const { mutate } = createTestServer({
      createToken,
      hashPassword,
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
    expect(getErrorMessageFromGQL(res)).toEqual('sign up operation failed');
    expect(models.User.findOne).toHaveBeenCalledWith({
      email: signUpData.email
    });
    expect(hashPassword).toHaveBeenCalledWith(signUpData.password);
  });

  test('signUp in production', async () => {
    const { mutate } = createTestServer({
      createToken,
      hashPassword,
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
      'sign up operation is not available now. Sorry for inconvenience'
    );
    expect(models.User.findOne).toHaveBeenCalledTimes(0);
    expect(models.User.createOne).toHaveBeenCalledTimes(0);
    expect(hashPassword).toHaveBeenCalledTimes(0);
  });
});
