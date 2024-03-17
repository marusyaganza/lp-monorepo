import { createTestServer } from './helpers';
import { users, words } from './mocks/data';
import { mutations } from './mocks/gqlMutations';
import { testData } from './mocks/dbTestData';
import { Game } from '../generated/graphql';

const signUpData = {
  firstName: 'User',
  lastName: 'Test',
  email: 'test@test.com',
  password: 'password',
  role: 'MEMBER'
};

const gameResultData = [
  {
    id: '1',
    hasError: true,
    gameType: Game.Audio
  },
  {
    id: '2',
    hasError: false,
    gameType: Game.Audio
  },
  {
    id: '3',
    hasError: false,
    gameType: Game.Audio
  }
];

const loginMutation = `
  mutation {
    login(input: { email: "member@member.com", password: "password1" }) {
      id
      email
      firstName
      lastName
      token
    }
  }
`;

const signUpMutation = `
  mutation {
    signUp(
      input: {
        firstName: "User"
        lastName: "Test"
        email: "test@test.com"
        password: "password"
      }
    ) {
      id
      email
      firstName
      lastName
      token
    }
  }
`;

const user = { id: 'userId' };

const findOneWord = jest.fn(() => words[0]);
const createToken = jest.fn(() => 'token');
const validatePassword = jest.fn(() => true);
const hashPassword = jest.fn(pass => `mock_hash_${pass}`);

const findOneUser = jest.fn(() => users[0]);
const createOne = jest.fn(() => ({ ...signUpData, id: '2' }));
const createOneWord = jest.fn(data => ({ ...data, id: '2' }));

const models = {
  Word: {
    createOne: createOneWord,
    findOne: findOneWord
  },
  User: {
    findOne: findOneUser,
    createOne
  }
};

describe('mutations', () => {
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

    const res = await mutate({ mutation: loginMutation });
    expect(validatePassword).toHaveBeenCalledWith('password1', 'password');
    expect(res).toMatchSnapshot();
    expect(findOneUser).toHaveBeenCalledWith({ email: 'member@member.com' });
    expect(createToken).toHaveBeenCalledWith({ id: '1', role: 'MEMBER' });
  });

  test('login with correct password if token is not defined', async () => {
    const { mutate } = createTestServer({
      createToken,
      validatePassword,
      models
    });
    createToken.mockReturnValueOnce(undefined);
    const res = await mutate({ mutation: loginMutation });
    expect(validatePassword).toHaveBeenCalledWith('password1', 'password');
    expect(res).toMatchSnapshot();
    expect(findOneUser).toHaveBeenCalledWith({ email: 'member@member.com' });
    expect(createToken).toHaveBeenCalledWith({ id: '1', role: 'MEMBER' });
  });

  test('login with incorrect password', async () => {
    validatePassword.mockReturnValueOnce(false);
    const { mutate } = createTestServer({
      createToken,
      validatePassword,
      models
    });
    const res = await mutate({ mutation: loginMutation });
    expect(validatePassword).toHaveBeenCalledWith('password1', 'password');
    expect(res).toMatchSnapshot();
  });

  test('login with invalid email', async () => {
    findOneUser.mockReturnValueOnce(null);
    const { mutate } = createTestServer({
      createToken,
      validatePassword,
      models
    });
    const res = await mutate({ mutation: loginMutation });
    expect(res).toMatchSnapshot();
  });

  test('signUp', async () => {
    findOneUser.mockReturnValueOnce(null);
    const { mutate } = createTestServer({
      createToken,
      hashPassword,
      models
    });

    const res = await mutate({
      mutation: signUpMutation,
      variables: {
        input: {
          ...signUpData
        }
      }
    });
    expect(res).toMatchSnapshot();
    expect(findOneUser).toHaveBeenCalledWith({ email: 'test@test.com' });
    expect(hashPassword).toHaveBeenCalledWith('password');
    expect(createOne).toHaveBeenCalledWith({
      ...signUpData,
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
      mutation: signUpMutation,
      variables: {
        input: {
          ...signUpData
        }
      }
    });
    expect(res).toMatchSnapshot();
    expect(findOneUser).toHaveBeenCalledWith({ email: 'test@test.com' });
    expect(hashPassword).toHaveBeenCalledTimes(0);
    expect(createOne).toHaveBeenCalledTimes(0);
  });

  test('signUp if token is not defined', async () => {
    findOneUser.mockReturnValueOnce(null);
    createToken.mockReturnValueOnce(undefined);

    const { mutate } = createTestServer({
      createToken,
      hashPassword,
      models
    });

    const res = await mutate({
      mutation: signUpMutation,
      variables: {
        input: {
          ...signUpData
        }
      }
    });
    expect(res).toMatchSnapshot();
    expect(findOneUser).toHaveBeenCalledWith({ email: 'test@test.com' });
  });

  test('signUp if hashing password fails', async () => {
    findOneUser.mockReturnValueOnce(null);
    hashPassword.mockResolvedValue(undefined);

    const { mutate } = createTestServer({
      createToken,
      hashPassword,
      models
    });

    const res = await mutate({
      mutation: signUpMutation,
      variables: {
        input: {
          ...signUpData
        }
      }
    });
    expect(res).toMatchSnapshot();
    expect(findOneUser).toHaveBeenCalledWith({ email: 'test@test.com' });
    expect(hashPassword).toHaveBeenCalledWith('password');
    expect(createOne).toHaveBeenCalledTimes(0);
  });

  test('signUp if user creation fails', async () => {
    findOneUser.mockReturnValueOnce(null);
    createOne.mockReturnValueOnce(undefined);

    const { mutate } = createTestServer({
      createToken,
      hashPassword,
      models
    });

    const res = await mutate({
      mutation: signUpMutation,
      variables: {
        input: {
          ...signUpData
        }
      }
    });
    expect(res).toMatchSnapshot();
    expect(findOneUser).toHaveBeenCalledWith({ email: 'test@test.com' });
    expect(hashPassword).toHaveBeenCalledWith('password');
  });

  test('delete word', async () => {
    const deleteOne = jest.fn(() => ({ ok: true }));
    const { mutate } = createTestServer({
      user,
      models: {
        ...models,
        Word: {
          deleteOne
        }
      }
    });

    const res = await mutate({
      mutation: mutations.deleteWordMutation,
      variables: {
        deleteWordId: 'deleteWordId'
      }
    });
    expect(res).toMatchSnapshot();
    expect(deleteOne).toHaveBeenCalledWith({
      id: 'deleteWordId',
      user: 'userId'
    });
  });

  test('delete word if operation fails', async () => {
    const deleteOne = jest.fn(() => ({ ok: false }));
    const { mutate } = createTestServer({
      user,
      models: {
        ...models,
        Word: {
          deleteOne
        }
      }
    });

    const res = await mutate({
      mutation: mutations.deleteWordMutation,
      variables: {
        deleteWordId: 'deleteWordId'
      }
    });
    expect(res).toMatchSnapshot();
    expect(deleteOne).toHaveBeenCalledWith({
      id: 'deleteWordId',
      user: 'userId'
    });
  });

  test('delete word if operation result is undefined', async () => {
    const deleteOne = jest.fn();
    const { mutate } = createTestServer({
      user,
      models: {
        ...models,
        Word: {
          deleteOne
        }
      }
    });

    const res = await mutate({
      mutation: mutations.deleteWordMutation,
      variables: {
        deleteWordId: 'deleteWordId'
      }
    });
    expect(res).toMatchSnapshot();
    expect(deleteOne).toHaveBeenCalledWith({
      id: 'deleteWordId',
      user: 'userId'
    });
  });

  test('delete word if user is not defined', async () => {
    const deleteOne = jest.fn(() => ({ ok: true }));
    const { mutate } = createTestServer({
      models: {
        ...models,
        Word: {
          deleteOne
        }
      }
    });

    const res = await mutate({
      mutation: mutations.deleteWordMutation,
      variables: {
        deleteWordId: 'deleteWordId'
      }
    });
    expect(res).toMatchSnapshot();
    expect(deleteOne).toHaveBeenCalledTimes(0);
  });

  test('delete word if user is not found', async () => {
    findOneUser.mockReturnValueOnce(null);
    const deleteOne = jest.fn(() => ({ ok: true }));
    const { mutate } = createTestServer({
      user,
      models: {
        ...models,
        Word: {
          deleteOne
        }
      }
    });

    const res = await mutate({
      mutation: mutations.deleteWordMutation,
      variables: {
        deleteWordId: 'deleteWordId'
      }
    });
    expect(res).toMatchSnapshot();
    expect(deleteOne).toHaveBeenCalledTimes(0);
  });

  test('create word', async () => {
    findOneWord.mockReturnValueOnce(null);
    const { mutate } = createTestServer({
      user,
      models
    });

    const res = await mutate({
      mutation: mutations.saveWordMutation,
      variables: {
        input: {
          ...testData.createWordInput
        }
      }
    });
    expect(res.body.singleResult.errors).not.toBeDefined();
    expect(createOneWord).toHaveBeenCalledWith({
      ...testData.createWordInput,
      user: 'userId'
    });
  });

  test('not create word if user is not defined', async () => {
    const { mutate } = createTestServer({
      models
    });

    const res = await mutate({
      mutation: mutations.saveWordMutation,
      variables: {
        input: {
          ...testData.createWordInput
        }
      }
    });
    expect(res).toMatchSnapshot();
    expect(findOneUser).toHaveBeenCalledTimes(0);
    expect(createOneWord).toHaveBeenCalledTimes(0);
  });

  test('create not create word if user is not found', async () => {
    findOneUser.mockReturnValueOnce(null);
    const { mutate } = createTestServer({
      user,
      models
    });

    const res = await mutate({
      mutation: mutations.saveWordMutation,
      variables: {
        input: {
          ...testData.createWordInput
        }
      }
    });
    expect(res).toMatchSnapshot();
    expect(createOneWord).toHaveBeenCalledTimes(0);
  });

  test('create word if word exists', async () => {
    findOneWord.mockReturnValueOnce(testData.createWordInput);
    const { mutate } = createTestServer({
      user,
      models
    });

    const res = await mutate({
      mutation: mutations.saveWordMutation,
      variables: {
        input: {
          ...testData.createWordInput
        }
      }
    });
    expect(res).toMatchSnapshot();
    expect(createOneWord).toHaveBeenCalledTimes(0);
  });

  test('update word', async () => {
    const updateOne = jest.fn(() => ({
      ok: true,
      value: { ...testData.createWordInput2, user: 'mockUserId' }
    }));
    const { mutate } = createTestServer({
      user,
      models: {
        ...models,
        Word: {
          updateOne
        }
      }
    });

    const res = await mutate({
      mutation: mutations.updateWordMutation,
      variables: {
        input: { ...testData.updateWordInput, id: '1' }
      }
    });
    expect(res).toMatchSnapshot();
    expect(updateOne).toHaveBeenCalledWith({
      ...testData.updateWordInput,
      id: '1',
      user: 'userId'
    });
  });

  test('update word if operation fails', async () => {
    const updateOne = jest.fn(() => ({ ok: false }));
    const { mutate } = createTestServer({
      user,
      models: {
        ...models,
        Word: {
          updateOne
        }
      }
    });

    const res = await mutate({
      mutation: mutations.updateWordMutation,
      variables: {
        input: { ...testData.updateWordInput, id: '1' }
      }
    });
    expect(res).toMatchSnapshot();
    expect(updateOne).toHaveBeenCalledWith({
      ...testData.updateWordInput,
      id: '1',
      user: 'userId'
    });
  });

  test('update word if operation result is undefined', async () => {
    const updateOne = jest.fn();
    const { mutate } = createTestServer({
      user,
      models: {
        ...models,
        Word: {
          updateOne
        }
      }
    });

    const res = await mutate({
      mutation: mutations.updateWordMutation,
      variables: {
        input: { ...testData.updateWordInput, id: '1' }
      }
    });
    expect(res).toMatchSnapshot();
    expect(updateOne).toHaveBeenCalledWith({
      ...testData.updateWordInput,
      id: '1',
      user: 'userId'
    });
  });

  test('update word if user is not defined', async () => {
    const updateOne = jest.fn(() => ({ ok: true }));
    const { mutate } = createTestServer({
      models: {
        ...models,
        Word: {
          updateOne
        }
      }
    });

    const res = await mutate({
      mutation: mutations.updateWordMutation,
      variables: {
        input: { ...testData.updateWordInput, id: '1' }
      }
    });
    expect(res).toMatchSnapshot();
    expect(updateOne).toHaveBeenCalledTimes(0);
  });

  test('safe game result', async () => {
    const updateStatistics = jest.fn(() => ({ ok: true }));
    const { mutate } = createTestServer({
      user,
      models: {
        ...models,
        Word: {
          updateStatistics
        }
      }
    });

    const res = await mutate({
      mutation: mutations.saveGameResultMutation,
      variables: {
        input: gameResultData
      }
    });
    expect(res).toMatchSnapshot();
    expect(updateStatistics).toHaveBeenCalledWith(gameResultData, user.id);
  });

  test('safe game result if operation failed', async () => {
    const updateStatistics = jest.fn(() => ({ ok: false }));
    const { mutate } = createTestServer({
      user,
      models: {
        ...models,
        Word: {
          updateStatistics
        }
      }
    });

    const res = await mutate({
      mutation: mutations.saveGameResultMutation,
      variables: {
        input: gameResultData
      }
    });
    expect(res).toMatchSnapshot();
    expect(updateStatistics).toHaveBeenCalledWith(gameResultData, user.id);
  });

  test('safe game result if operation result is undefined', async () => {
    const updateStatistics = jest.fn();
    const { mutate } = createTestServer({
      user,
      models: {
        ...models,
        Word: {
          updateStatistics
        }
      }
    });

    const res = await mutate({
      mutation: mutations.saveGameResultMutation,
      variables: {
        input: gameResultData
      }
    });
    expect(res).toMatchSnapshot();
    expect(updateStatistics).toHaveBeenCalledWith(gameResultData, user.id);
  });

  test('safe game result if user is not defined', async () => {
    const updateStatistics = jest.fn();
    const { mutate } = createTestServer({
      models: {
        ...models,
        Word: {
          updateStatistics
        }
      }
    });

    const res = await mutate({
      mutation: mutations.saveGameResultMutation,
      variables: {
        input: gameResultData
      }
    });
    expect(res).toMatchSnapshot();
    expect(updateStatistics).toHaveBeenCalledTimes(0);
  });

  test('safe game result if user does not exist', async () => {
    findOneUser.mockResolvedValueOnce(undefined);
    const updateStatistics = jest.fn();
    const { mutate } = createTestServer({
      user,
      models: {
        ...models,
        Word: {
          updateStatistics
        }
      }
    });

    const res = await mutate({
      mutation: mutations.saveGameResultMutation,
      variables: {
        input: gameResultData
      }
    });
    expect(res).toMatchSnapshot();
    expect(updateStatistics).toHaveBeenCalledTimes(0);
  });
});
