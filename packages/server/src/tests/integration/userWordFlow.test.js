import {
  createTestServer,
  connectToDb,
  dropDb,
  seedDb,
  disconnectFromDb,
  getErrorMessageFromGQL,
  getDataFromGQL
} from '../helpers';
import bcrypt from 'bcryptjs';

import { models } from '../../db/models';
import { testData } from '../mocks/dbTestData';
import { wordsQuery, userQuery, wordByIdQuery } from '../mocks/gqlQueries';
import { generateGameData } from '../../generateGameData';
import { mutations } from '../mocks/gqlMutations';
import {
  createToken,
  getUserFromToken,
  hashPassword,
  validatePassword
} from '../../auth';
import { ERROR_MESSAGES } from '../../constants/errorMessages';

const userCreateInput = {
  email: 'test2@test.com',
  password: 'password',
  firstName: 'User',
  lastName: 'Test'
};

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

const snapshotConfig = {
  id: expect.any(String)
};

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
    const { id, role } = getDataFromGQL(res).signUp;
    createdUser = { id, role };
    expect(getErrorMessageFromGQL(res)).toEqual(undefined);
    expect(getDataFromGQL(res).signUp).toMatchSnapshot(snapshotConfig);
  });

  test('can login with correct password', async () => {
    bcrypt.compare.mockReturnValueOnce(true);
    const res = await mutate({
      mutation: mutations.loginMutation,
      variables: {
        input: {
          email: userCreateInput.email,
          password: userCreateInput.password
        }
      }
    });
    expect(getErrorMessageFromGQL(res)).toEqual(undefined);
    expect(getDataFromGQL(res).login).toMatchSnapshot();
  });

  test('cannot login with incorrect password', async () => {
    const res = await mutate({
      mutation: mutations.loginMutation,
      variables: { input: { email: 'test@test.com', password: 'password!' } }
    });
    expect(getErrorMessageFromGQL(res)).toEqual(ERROR_MESSAGES.INCORRECT_CREDS);
  });

  test('cannot login with invalid email', async () => {
    const res = await mutate({
      mutation: mutations.loginMutation,
      variables: { input: { email: 'test2test.com', password: 'password' } }
    });
    expect(getErrorMessageFromGQL(res)).toEqual(ERROR_MESSAGES.INCORRECT_CREDS);
  });

  test('cannot get the words list if user record in DB does not exist', async () => {
    const { query } = createTestServer({ ...serverContext, user: mockUser });
    const res = await query({ query: wordsQuery });
    expect(getErrorMessageFromGQL(res)).toEqual(
      ERROR_MESSAGES.NOT_AUTHENTICATED
    );
  });

  test('can get the words list', async () => {
    const { query } = createTestServer({ ...serverContext, user: createdUser });
    const res = await query({ query: wordsQuery });
    expect(getErrorMessageFromGQL(res)).toEqual(undefined);
    expect(getDataFromGQL(res).wordsPerPage).toMatchSnapshot();
  });

  test('can get see the information about his/her account', async () => {
    const { query } = createTestServer({
      ...serverContext,
      user: createdUser
    });
    const res = await query({ query: userQuery });
    expect(getErrorMessageFromGQL(res)).toEqual(undefined);
    expect(getDataFromGQL(res)).toMatchSnapshot();
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
    addedWordId = getDataFromGQL(res).saveWord.id;
    expect(getDataFromGQL(res).saveWord).toMatchSnapshot(snapshotConfig);
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
    expect(getErrorMessageFromGQL(res)).toEqual(ERROR_MESSAGES.NOT_AUTHORIZED);
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
    const result = getDataFromGQL(res).wordsPerPage;
    expect(result.words.length).toBe(2);
    expect(getErrorMessageFromGQL(res)).toEqual(undefined);
    expect(result.hasNext).toEqual(false);
    expect(result.wordsCount).toBe(2);
    const words = result.words;
    const firstWordIndex = words.findIndex(w => w.id === addedWordId);
    expect(firstWordIndex).toBe(1);
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
    expect(getDataFromGQL(res).wordsPerPage.words.length).toBe(2);
    const words = getDataFromGQL(res).wordsPerPage.words;
    const firstWordIndex = words.findIndex(w => w.id === addedWordId);
    expect(firstWordIndex).toBe(0);
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
    expect(getErrorMessageFromGQL(res)).toEqual(undefined);
    expect(getDataFromGQL(res)).toMatchSnapshot();
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
    expect(getErrorMessageFromGQL(res)).toBeDefined();
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
    expect(getErrorMessageFromGQL(res)).toEqual(undefined);
    expect(getDataFromGQL(res).word).toMatchSnapshot(snapshotConfig);
  });

  test('can delete a word', async () => {
    const { mutate, query } = createTestServer({
      ...serverContext,
      user: createdUser
    });
    const res = await mutate({
      mutation: mutations.deleteWordMutation,
      variables: { deleteWordId: addedWordId }
    });
    expect(getErrorMessageFromGQL(res)).toEqual(undefined);
    expect(getDataFromGQL(res).deleteWord).toBe(
      `word with id ${addedWordId} was deleted`
    );
    const words = await query({
      query: wordsQuery,
      variables: { input: { isReverseOrder: true } }
    });
    expect(getDataFromGQL(words).wordsPerPage.words.length).toBe(1);
  });
});
