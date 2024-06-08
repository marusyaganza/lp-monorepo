import { WordTagModel } from '../../db/models/WordTag';
import { WordModel } from '../../db/models/Word';

import { connectToDb, disconnectFromDb, dropDb } from '../helpers';
import { testData } from '../mocks/dbTestData';

const snapshotConfig = {
  id: expect.any(String),
  _id: expect.any(Object)
};

const mockUser = { id: '6480560e8cad1841ed6b4011', role: 'MEMBER' };
const mockId = '6480653341e6f90377d19cfb';

describe('WordTagModel', () => {
  beforeEach(async () => {
    await connectToDb();
    await dropDb();
  });

  afterEach(async () => {
    await dropDb();
    await disconnectFromDb();
  });

  test('createOne', async () => {
    const result = await WordTagModel.createOne({
      ...testData.createTagInput,
      user: mockUser.id
    });
    expect(result).toMatchSnapshot(snapshotConfig);
  });

  test('findOne', async () => {
    const word = await WordTagModel.createOne({
      ...testData.createTagInput,
      user: mockUser.id
    });
    await WordTagModel.createOne({
      ...testData.createTagInput,
      user: mockId
    });
    const result = await WordTagModel.findOne({
      id: word.id,
      user: mockUser.id
    });
    const result2 = await WordTagModel.findOne({
      uuid: testData.createTagInput.uuid,
      user: mockUser.id
    });
    expect(result2).not.toBeNull();
    expect(result.id).toEqual(result2.id);
    expect(result.user).toEqual(result2.user);
    expect(result).toMatchSnapshot(snapshotConfig);
  });

  test('findOne should return null if user id is not provided', async () => {
    const word = await WordTagModel.createOne({
      ...testData.createTagInput,
      user: mockUser.id
    });
    const result = await WordTagModel.findOne({
      id: word.id
    });
    const result2 = await WordTagModel.findOne({
      uuid: testData.createTagInput.uuid
    });
    expect(result).toBeNull();
    expect(result2).toBeNull();
  });

  test('findMany', async () => {
    await WordTagModel.createOne({
      ...testData.createTagInput,
      user: mockUser.id
    });
    await WordTagModel.createOne({
      ...testData.createTagInput2,
      user: mockUser.id
    });
    await WordTagModel.createOne({
      ...testData.createTagInput,
      user: mockId
    });

    const resultForUnknowUser = await WordTagModel.findMany({});
    const result = await WordTagModel.findMany({ user: mockUser.id });
    expect(result).toHaveLength(2);
    expect(resultForUnknowUser).toHaveLength(0);
  });

  test('updateOne', async () => {
    const tag = await WordTagModel.createOne({
      ...testData.createTagInput,
      user: mockUser.id
    });
    const tag2 = await WordTagModel.createOne({
      ...testData.createTagInput2,
      user: mockUser.id
    });

    const result = await WordTagModel.updateOne({
      ...testData.updateTagInput,
      user: mockUser.id,
      id: tag.id
    });

    expect(result.ok).toBe(true);
    expect(result.value).toMatchSnapshot(snapshotConfig);

    const searchTResult = await WordTagModel.findOne({
      id: tag.id,
      user: mockUser.id
    });

    expect(result.value).toEqual(searchTResult);

    const resultForUnknowUser = await WordTagModel.updateOne({
      ...testData.updateTagInput,
      id: tag2.id
    });
    expect(resultForUnknowUser).toEqual({ ok: false, value: null });

    const resultWithImmutableProps = await WordTagModel.updateOne({
      ...testData.updateWordInput2,
      user: mockUser.id,
      id: tag2.id
    });

    expect(resultWithImmutableProps.value.name).toEqual(tag2.name);
    expect(resultWithImmutableProps.value.uuid).toEqual(tag2.uuid);
  });

  test('deleteOne', async () => {
    const tag = await WordTagModel.createOne({
      ...testData.createTagInput,
      user: mockUser.id
    });
    await WordTagModel.createOne({
      ...testData.createTagInput2,
      user: mockUser.id
    });
    await WordTagModel.createOne({
      ...testData.createTagInput,
      user: mockUser.id
    });

    const wordWithTag = await WordModel.createOne({
      ...testData.createWordInput,
      tags: [tag.id],
      user: mockUser.id
    });

    expect(wordWithTag.tags.length).toEqual(1);

    const result = await WordTagModel.deleteOne({
      id: tag.id,
      user: mockUser.id
    });

    const wordAfter = await WordModel.findOne({
      user: mockUser.id,
      id: wordWithTag.id
    });

    expect(result).toMatchObject({ ok: true, value: tag });
    expect(wordAfter.tags).toEqual([]);
    const searchTResult = await WordTagModel.findOne({
      id: tag.id,
      user: mockUser.id
    });
    const tags = await WordTagModel.findMany({ user: mockUser.id });
    expect(tags).toHaveLength(2);
    expect(searchTResult).toBeNull();

    const existingTags = await WordTagModel.findMany({ user: mockUser.id });

    const resultForUnknowUser = await WordTagModel.deleteOne({
      id: tag.id
    });
    expect(resultForUnknowUser).toEqual({ ok: false });

    const resultForUnixistingTag = await WordTagModel.deleteOne({
      id: mockId
    });

    expect(resultForUnixistingTag).toEqual({ ok: false });
    expect(existingTags).toHaveLength(2);
  });
});
