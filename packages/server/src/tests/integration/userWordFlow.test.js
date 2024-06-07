import {
  createTestServer,
  connectToDb,
  dropDb,
  seedDb,
  disconnectFromDb,
  getErrorMessageFromGQL
} from '../helpers';
import { models } from '../../db/models';
import { testData } from '../mocks/dbTestData';
import { wordsQuery, userQuery, wordByIdQuery } from '../mocks/gqlQueries';
import { generateGameData } from '../../utils/generateGameData';
import { mutations } from '../mocks/gqlMutations';
import {
  createToken,
  getUserFromToken,
  hashPassword,
  validatePassword
} from '../../auth';

const userCreateInput = {
  email: 'test2@test.com',
  password: 'password',
  firstName: 'User',
  lastName: 'Test'
};

jest.mock('bcryptjs', () => {
  return {
    hash: jest.fn(str => str),
    compare: jest.fn((sample1, sample2) => sample1 === sample2),
    genSalt: jest.fn(() => 10)
  };
});

jest.mock('jsonwebtoken', () => {
  return {
    sign: jest.fn(() => `mock_token`),
    verify: jest.fn(() => 'user')
  };
});

const serverContext = {
  createToken,
  getUserFromToken,
  hashPassword,
  validatePassword,
  generateGameData,
  models
};

const { mutate } = createTestServer(serverContext);
const mockUser = { id: '6480560e8cad1841ed6b4011', role: 'MEMBER' };

/**
 * User can sign up
 * review his/her account infromation
 * review his/her words
 * add words
 * review his/her words
 * update a word
 * delete a word
 */

//TODO add test to check if unauthenticated user cannot perform auth operations
describe('User', () => {
  let addedWordId;
  let addedUserId;
  let createdUser;

  beforeAll(async () => {
    await connectToDb();
    await dropDb();
    await seedDb();
  });

  afterAll(async () => {
    await disconnectFromDb();
    jest.clearAllMocks();
  });

  test('can sign up', async () => {
    const res = await mutate({
      mutation: mutations.signUpMutation,
      variables: {
        input: userCreateInput
      }
    });
    const { id, role } = res.body.singleResult.data.signUp;
    createdUser = { id, role };
    res.body.singleResult.data.signUp.id = 'mock_id';
    expect(res).toMatchSnapshot();
  });

  test('can login with correct password', async () => {
    const res = await mutate({
      mutation: mutations.loginMutation,
      variables: {
        input: {
          email: userCreateInput.email,
          password: userCreateInput.password
        }
      }
    });
    expect(res).toMatchSnapshot();
  });

  test('cannot login with incorrect password', async () => {
    const res = await mutate({
      mutation: mutations.loginMutation,
      variables: { input: { email: 'test@test.com', password: 'password!' } }
    });
    expect(getErrorMessageFromGQL(res)).toEqual(
      'email or password is incorrect'
    );
  });

  test('cannot login with invalid email', async () => {
    const res = await mutate({
      mutation: mutations.loginMutation,
      variables: { input: { email: 'test2test.com', password: 'password' } }
    });
    expect(getErrorMessageFromGQL(res)).toEqual(
      'email or password is incorrect'
    );
  });

  test('cannot get the words list if user record in DB does not exist', async () => {
    const { query } = createTestServer({ ...serverContext, user: mockUser });
    const res = await query({ query: wordsQuery });
    expect(getErrorMessageFromGQL(res)).toEqual(
      'Login to perform this operation'
    );
  });

  test('can get the words list', async () => {
    const { query } = createTestServer({ ...serverContext, user: createdUser });
    const res = await query({ query: wordsQuery });
    expect(res).toMatchSnapshot();
  });

  test('can get see the information about his/her account', async () => {
    const { query } = createTestServer({
      ...serverContext,
      user: { id: addedUserId, role: 'MEMBER' }
    });
    const res = await query({ query: userQuery });
    expect(res).toMatchSnapshot();
  });

  test('can save a word', async () => {
    const { mutate } = createTestServer({
      ...serverContext,
      user: createdUser
    });
    const res = await mutate({
      mutation: mutations.saveWordMutation,
      variables: { input: testData.createWordInput }
    });
    addedWordId = res.body.singleResult.data.saveWord.id;
    // TODO: find a way to avoid this
    res.body.singleResult.data.saveWord.id = 'mockId';
    res.body.singleResult.data.saveWord.user = 'mockUser';
    expect(res).toMatchSnapshot();
  });

  test('nonexistent user cannot save a word', async () => {
    const { mutate } = createTestServer({
      ...serverContext,
      user: mockUser
    });
    const res = await mutate({
      mutation: mutations.saveWordMutation,
      variables: { input: testData.createWordInput }
    });
    expect(getErrorMessageFromGQL(res)).toEqual(
      'You do not have permission to perform this operation'
    );
  });

  test('can save more words and view all of them', async () => {
    const { mutate, query } = createTestServer({
      ...serverContext,
      user: createdUser
    });
    await mutate({
      mutation: mutations.saveWordMutation,
      variables: { input: testData.createWordInput2 }
    });
    const res = await query({ query: wordsQuery });
    expect(res).toMatchSnapshot();
  });

  test('can save more words and view all of them in reverse order', async () => {
    const { mutate, query } = createTestServer({
      ...serverContext,
      user: createdUser
    });
    await mutate({
      mutation: mutations.saveWordMutation,
      variables: { input: testData.createWordInput2 }
    });
    const res = await query({
      query: wordsQuery,
      variables: { input: { isReverseOrder: true } }
    });
    expect(res).toMatchSnapshot();
  });

  test('cannot save a word with the same uuid', async () => {
    const { mutate } = createTestServer({
      ...serverContext,
      user: createdUser
    });
    const res = await mutate({
      mutation: mutations.saveWordMutation,
      variables: { input: testData.createWordInput }
    });
    expect(getErrorMessageFromGQL(res)).toEqual(
      'word with uuid 74046e79-e4c9-4b52-ac96-cb7ae98fb601 is already added'
    );
  });

  test('can update a word', async () => {
    const { mutate } = createTestServer({
      ...serverContext,
      user: createdUser
    });
    const res = await mutate({
      mutation: mutations.updateWordMutation,
      variables: { input: { ...testData.updateWordInput, id: addedWordId } }
    });
    res.body.singleResult.data.updateWord.user = 'mockUser';
    expect(res).toMatchSnapshot();
  });

  test('cannot update immutable properties of a word', async () => {
    const { mutate } = createTestServer({
      ...serverContext,
      user: createdUser
    });
    const res = await mutate({
      mutation: mutations.updateWordMutation,
      variables: { input: { ...testData.updateWordInput2, id: addedWordId } }
    });
    expect(res.body.singleResult.errors).toBeDefined();
  });

  test('can find a word by id', async () => {
    const { query } = createTestServer({
      ...serverContext,
      user: createdUser
    });
    const res = await query({
      query: wordByIdQuery,
      variables: { wordId: addedWordId }
    });
    res.body.singleResult.data.word.user = 'mockUser';
    expect(res).toMatchSnapshot();
  });

  test('can delete a word', async () => {
    const { mutate } = createTestServer({
      ...serverContext,
      user: createdUser
    });
    const res = await mutate({
      mutation: mutations.deleteWordMutation,
      variables: { deleteWordId: addedWordId }
    });
    expect(res.body.singleResult.data.deleteWord).toBe(
      `word with id ${addedWordId} was deleted`
    );
  });
});
