import { WordTagModel } from '../WordTag';
import { WordModel } from '../../Word/Word';

import {
  connectToDb,
  disconnectFromDb,
  dropDb,
  baseSnapshotConfig
} from '../../../../tests/helpers';
import { testData } from '../../../../tests/mocks/dbTestData';

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
    const result = await WordTagModel.createOne(
      testData.createTagInput,
      mockUser.id
    );
    expect(result).toMatchSnapshot(baseSnapshotConfig);
  });

  test('findOne', async () => {
    const tag = await WordTagModel.createOne(
      testData.createTagInput,
      mockUser.id
    );
    const id = tag?.id as string;
    await WordTagModel.createOne(testData.createTagInput, mockId);
    const result = await WordTagModel.findOne(
      {
        id
      },
      mockUser.id
    );
    const result2 = await WordTagModel.findOne(
      {
        text: testData.createTagInput.text
      },
      mockUser.id
    );
    expect(result2).not.toBeNull();
    // @ts-expect-error: testing possible empty args
    expect(result.id).toEqual(result2.id);
    // @ts-expect-error: testing possible empty args
    expect(result.user).toEqual(result2.user);
    expect(result).toMatchSnapshot(baseSnapshotConfig);
  });

  test('findOne should return null if user id is not provided', async () => {
    const tag = await WordTagModel.createOne(
      testData.createTagInput,
      mockUser.id
    );
    const id = tag?.id as string;

    // @ts-expect-error: testing empty args case
    const result = await WordTagModel.findOne({
      id
    });
    // @ts-expect-error: testing empty args case
    const result2 = await WordTagModel.findOne({
      uuid: testData.createTagInput.uuid
    });
    expect(result).toBeNull();
    expect(result2).toBeNull();
  });

  test('findMany', async () => {
    await WordTagModel.createOne(testData.createTagInput, mockUser.id);
    await WordTagModel.createOne(testData.createTagInput2, mockUser.id);
    await WordTagModel.createOne(testData.createTagInput, mockId);

    // @ts-expect-error: testing empty args case
    const resultForUnknowUser = await WordTagModel.findMany({});
    const result = await WordTagModel.findMany({}, mockUser.id);
    expect(result).toHaveLength(2);
    expect(resultForUnknowUser).toHaveLength(0);
  });

  test('updateOne', async () => {
    const tag = await WordTagModel.createOne(
      testData.createTagInput,
      mockUser.id
    );
    const id = tag?.id as string;

    const tag2 = await WordTagModel.createOne(
      testData.createTagInput2,
      mockUser.id
    );

    const result = await WordTagModel.updateOne(
      {
        ...testData.updateTagInput,
        id
      },
      mockUser.id
    );

    expect(result.ok).toBe(true);
    expect(result.value).toMatchSnapshot(baseSnapshotConfig);

    const searchTResult = await WordTagModel.findOne(
      {
        id
      },
      mockUser.id
    );

    expect(result.value).toEqual(searchTResult);

    // @ts-expect-error: testing empty args case
    const resultForUnknowUser = await WordTagModel.updateOne({
      ...testData.updateTagInput,
      id: tag2?.id
    });
    expect(resultForUnknowUser).toEqual({ ok: false, value: undefined });
  });

  test('deleteOne', async () => {
    const tag = await WordTagModel.createOne(
      testData.createTagInput,
      mockUser.id
    );
    const id = tag?.id as string;
    await WordTagModel.createOne(testData.createTagInput2, mockUser.id);
    await WordTagModel.createOne(testData.createTagInput, mockId);

    const wordWithTag = await WordModel.createOne(
      {
        ...testData.createWordInput,
        tags: [id]
      },
      mockUser.id
    );

    expect(wordWithTag?.tags?.length).toEqual(1);
    const wordWithTagId = wordWithTag?.id as string;

    const result = await WordTagModel.deleteOne(id, mockUser.id);

    const wordAfter = await WordModel.findById(wordWithTagId, mockUser.id);

    expect(result).toMatchObject({ ok: true, value: tag });
    expect(wordAfter?.tags).toEqual([]);
    const searchResult = await WordTagModel.findOne(
      {
        id
      },
      mockUser.id
    );
    const tags = await WordTagModel.findMany({}, mockUser.id);
    expect(tags).toHaveLength(1);
    expect(searchResult).toBeNull();

    const existingTags = await WordTagModel.findMany({}, mockUser.id);

    // @ts-expect-error: testing empty args case
    const resultForUnknowUser = await WordTagModel.deleteOne(tag.id);
    expect(resultForUnknowUser).toEqual({ ok: false, value: null });

    // @ts-expect-error: testing empty args case
    const resultForUnexistingTag = await WordTagModel.deleteOne(mockId);

    expect(resultForUnexistingTag).toEqual({ ok: false, value: null });
    expect(existingTags).toHaveLength(1);
  });
});
