import { UserModel } from '../db/models/User';
import { connectToDb, disconnectFromDb, dropDb } from './helpers';
import { testData } from './mocks/dbTestData';

const snapshotConfig = {
  createdAt: expect.any(String),
  id: expect.any(String),
  _id: expect.any(Object)
};

describe('User', () => {
  beforeAll(async () => {
    await connectToDb();
    await dropDb();
  });

  afterEach(async () => {
    await dropDb();
  });

  afterAll(async () => {
    await disconnectFromDb();
  });

  test('createOne', async () => {
    const result = await UserModel.createOne(testData.createUserInput);
    expect(result).toMatchSnapshot(snapshotConfig);
  });

  test('findOne', async () => {
    const user = await UserModel.createOne(testData.createUserInput);
    const result = await UserModel.findOne({
      email: testData.createUserInput.email
    });
    const result2 = await UserModel.findOne({ id: user.id });
    expect(result2).not.toBeNull();
    expect(result).toMatchSnapshot(snapshotConfig);
  });
  test('findMany', async () => {
    await UserModel.createOne(testData.createUserInput);
    await UserModel.createOne(testData.createUserInput);
    const result = await UserModel.findMany({ role: 'MEMBER' });
    expect(result).toHaveLength(2);
  });

  test('updateOne', async () => {
    const user = await UserModel.createOne(testData.createUserInput);
    const result = await UserModel.updateOne({
      ...testData.updateUserInput,
      id: user.id
    });
    expect(result.ok).toBe(true);
    const searchTResult = await UserModel.findOne({ id: user.id });
    expect(result.value).toEqual(searchTResult);
    expect(searchTResult).toMatchSnapshot(snapshotConfig);
  });

  test('deleteOne', async () => {
    const user1 = await UserModel.createOne(testData.createUserInput);
    await UserModel.createOne(testData.createUserInput);
    const result = await UserModel.deleteOne({ id: user1.id });
    expect(result).toEqual({ ok: true });
    const searchTResult = await UserModel.findOne({ id: user1.id });
    expect(searchTResult).toBeNull();
  });

  test('deleteOne if user does not exist', async () => {
    const user1 = await UserModel.createOne(testData.createUserInput);
    await UserModel.createOne(testData.createUserInput);
    const result = await UserModel.deleteOne({ email: 'test77@test.com' });
    expect(result).toEqual({ ok: false });
    const searchTResult = await UserModel.findOne({ id: user1.id });
    expect(searchTResult).not.toBe(null);
  });
});
