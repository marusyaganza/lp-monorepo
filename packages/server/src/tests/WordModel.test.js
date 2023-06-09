import { WordModel } from '../db/models/Word';
import { connectToDb, disconnectFromDb, dropDb } from './helpers';
import { testData } from './mocks/dbTestData';

const snapshotConfig = {
  createdAt: expect.any(String),
  id: expect.any(String),
  _id: expect.any(Object)
};

const mockUser = { id: '6480560e8cad1841ed6b4011', role: 'MEMBER' };
const mockId = '6480653341e6f90377d19cfb';

describe('WordModel', () => {
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
    const result = await WordModel.createOne({
      ...testData.createWordInput,
      user: mockUser.id
    });
    expect(result).toMatchSnapshot(snapshotConfig);
  });

  test('findOne', async () => {
    const word = await WordModel.createOne({
      ...testData.createWordInput,
      user: mockUser.id
    });
    await WordModel.createOne({
      ...testData.createWordInput,
      user: mockId
    });
    const result = await WordModel.findOne({
      id: word.id,
      user: mockUser.id
    });
    const result2 = await WordModel.findOne({
      uuid: testData.createWordInput.uuid,
      user: mockUser.id
    });
    expect(result2).not.toBeNull();
    expect(result.id).toEqual(result2.id);
    expect(result.user).toEqual(result2.user);
    expect(result).toMatchSnapshot(snapshotConfig);
  });

  test('findOne should return null if user id is not provided', async () => {
    const word = await WordModel.createOne({
      ...testData.createWordInput,
      user: mockUser.id
    });
    const result = await WordModel.findOne({
      id: word.id
    });
    const result2 = await WordModel.findOne({
      uuid: testData.createWordInput.uuid
    });
    expect(result).toBeNull();
    expect(result2).toBeNull();
  });

  test('findMany', async () => {
    await WordModel.createOne({
      ...testData.createWordInput,
      user: mockUser.id
    });
    await WordModel.createOne({
      ...testData.createWordInput2,
      user: mockUser.id
    });
    await WordModel.createOne({
      ...testData.createWordInput,
      user: mockId
    });

    const resultForUnknowUser = await WordModel.findMany({});
    const result = await WordModel.findMany({ user: mockUser.id });
    expect(result).toHaveLength(2);
    expect(resultForUnknowUser).toHaveLength(0);
  });

  test('updateOne', async () => {
    const word = await WordModel.createOne({
      ...testData.createWordInput,
      user: mockUser.id
    });
    const word2 = await WordModel.createOne({
      ...testData.createWordInput2,
      user: mockUser.id
    });

    const result = await WordModel.updateOne({
      ...testData.updateWordInput,
      user: mockUser.id,
      id: word.id
    });

    expect(result.ok).toBe(true);
    expect(result.value).toMatchSnapshot(snapshotConfig);

    const searchTResult = await WordModel.findOne({
      id: word.id,
      user: mockUser.id
    });

    expect(result.value).toEqual(searchTResult);

    const resultForUnknowUser = await WordModel.updateOne({
      ...testData.updateWordInput,
      id: word2.id
    });
    expect(resultForUnknowUser).toEqual({ ok: false, value: null });

    const resultWithImmutableProps = await WordModel.updateOne({
      ...testData.updateWordInput2,
      user: mockUser.id,
      id: word2.id
    });

    expect(resultWithImmutableProps.value.name).toEqual(word2.name);
    expect(resultWithImmutableProps.value.uuid).toEqual(word2.uuid);
  });

  test('deleteOne', async () => {
    const word = await WordModel.createOne({
      ...testData.createWordInput,
      user: mockUser.id
    });
    await WordModel.createOne({
      ...testData.createWordInput2,
      user: mockUser.id
    });
    await WordModel.createOne({
      ...testData.createWordInput,
      user: mockUser.id
    });
    const result = await WordModel.deleteOne({
      id: word.id,
      user: mockUser.id
    });
    expect(result).toEqual({ ok: true });
    const searchTResult = await WordModel.findOne({
      id: word.id,
      user: mockUser.id
    });
    const words = await WordModel.findMany({ user: mockUser.id });
    expect(words).toHaveLength(2);
    expect(searchTResult).toBeNull();

    const resultForUnknowUser = await WordModel.deleteOne({
      id: word.id
    });
    expect(resultForUnknowUser).toEqual({ ok: false });
  });
});
