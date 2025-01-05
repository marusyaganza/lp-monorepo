import { WordModel } from '../Word';
import { WordTagModel } from '../../WordTag/WordTag';
import {
  connectToDb,
  disconnectFromDb,
  dropDb,
  seedDb,
  baseSnapshotConfig
} from '../../../../tests/helpers';
import { testData } from '../../../../tests/mocks/dbTestData';
import {
  Game,
  Language,
  Score,
  SortWordsBy
} from '../../../../generated/graphql';
import { newWordInputs } from '../../../../tests/mocks/inputs/newWordInputs';
import { usersTestData } from '../../../../tests/mocks/inputs/newUserInput';

const snapshotConfig = {
  createdAt: expect.any(String),
  updatedAt: expect.any(Number),
  spacedRepetition: expect.any(Object),
  ...baseSnapshotConfig
};

const mockUser = { id: '6480560e8cad1841ed6b4011', role: 'MEMBER' };
const mockId = '6480653341e6f90377d19cfb';

let index = 0;

jest.spyOn(global.Date, 'now').mockImplementation(function () {
  return index++;
});

describe('WordModel', () => {
  beforeEach(async () => {
    await connectToDb();
    await dropDb();
  });

  afterEach(async () => {
    await dropDb();
    await disconnectFromDb();
  });

  test('createOne', async () => {
    const result = await WordModel.createOne(
      testData.createWordInput,
      mockUser.id
    );
    expect(result).toMatchSnapshot(snapshotConfig);
  });

  test('findById', async () => {
    const word = await WordModel.createOne(
      testData.createWordInput,
      mockUser.id
    );
    await WordModel.createOne(testData.createWordInput, mockId);
    // @ts-expect-error: testing possible empty args
    const result = await WordModel.findById(word.id, mockUser.id);
    expect(result).toMatchSnapshot(snapshotConfig);
  });

  test('findOne', async () => {
    const word = await WordModel.createOne(
      testData.createWordInput,
      mockUser.id
    );
    await WordModel.createOne(testData.createWordInput, mockId);
    const result = await WordModel.findOne(
      {
        uuid: word?.uuid
      },
      mockUser.id
    );
    const result2 = await WordModel.findOne(
      {
        name: testData.createWordInput.name
      },
      mockUser.id
    );
    expect(result).not.toBeNull();
    expect(result2).not.toBeNull();
    expect(result?.id).toEqual(result2?.id);
    expect(result?.user).toEqual(result2?.user);
    expect(result).toMatchSnapshot(snapshotConfig);
  });

  test('findOne should return undefined if user id is not provided', async () => {
    const word = await WordModel.createOne(
      testData.createWordInput,
      mockUser.id
    );
    const result = await WordModel.findOne(
      {
        uuid: word?.uuid
      },
      mockId
    );
    // @ts-expect-error: testing empty args case
    const result2 = await WordModel.findOne({
      uuid: testData.createWordInput.uuid
    });
    expect(result).toBeUndefined();
    expect(result2).toBeUndefined();
  });

  test('findManyAndPaginate', async () => {
    await WordModel.createOne(testData.createWordInput, mockUser.id);
    await WordModel.createOne(testData.createWordInput2, mockUser.id);
    await WordModel.createOne(testData.createWordInput, mockId);

    // @ts-expect-error: testing empty args case
    const resultForUnknowUser = await WordModel.findManyAndPaginate({});
    const result = await WordModel.findManyAndPaginate({}, mockUser.id);
    expect(result.words).toHaveLength(2);
    expect(resultForUnknowUser.words).toHaveLength(0);
  });

  test('findManyAndPaginate with reverse order', async () => {
    await WordModel.createOne(testData.createWordInput, mockUser.id);
    await WordModel.createOne(testData.createWordInput2, mockUser.id);
    await WordModel.createOne(testData.createWordInput, mockId);

    // @ts-expect-error: testing empty args case
    const resultForUnknowUser = await WordModel.findManyAndPaginate({});
    const result = await WordModel.findManyAndPaginate(
      {
        isReverseOrder: true
      },
      mockUser.id
    );

    expect(result.words).toHaveLength(2);

    const index = result.words.findIndex(
      item => item?.uuid === testData.createWordInput.uuid
    );
    expect(index).toEqual(0);
    expect(resultForUnknowUser.words).toHaveLength(0);
  });

  test('findManyAndPaginate by name, level, and date', async () => {
    await WordModel.createOne(testData.createWordInput, mockUser.id);
    await WordModel.createOne(testData.createWordInput2, mockUser.id);
    await WordModel.createOne(testData.createWordInput, mockId);

    const resultByName = await WordModel.findManyAndPaginate(
      {
        sortBy: SortWordsBy.Name
      },
      mockUser.id
    );
    expect(resultByName.words).toHaveLength(2);
    const indexByName = resultByName.words.findIndex(
      item => item?.uuid === testData.createWordInput.uuid
    );
    expect(indexByName).toEqual(0);

    const resultByLevel = await WordModel.findManyAndPaginate(
      {
        sortBy: SortWordsBy.Level
      },
      mockUser.id
    );
    expect(resultByLevel.words).toHaveLength(2);
    const indexByLevel = resultByName.words.findIndex(
      item => item?.uuid === testData.createWordInput.uuid
    );
    expect(indexByLevel).toEqual(0);

    const resultByDate = await WordModel.findManyAndPaginate(
      {
        sortBy: SortWordsBy.UpdatedAt
      },
      mockUser.id
    );
    expect(resultByDate.words).toHaveLength(2);
    const indexByDate = resultByName.words.findIndex(
      item => item?.uuid === testData.createWordInput.uuid
    );
    expect(indexByDate).toEqual(0);
  });

  test('updateOne', async () => {
    const word = await WordModel.createOne(
      testData.createWordInput,
      mockUser.id
    );
    const word2 = await WordModel.createOne(
      testData.createWordInput2,
      mockUser.id
    );

    await WordModel.createOne(testData.createWordInput, mockId);

    const result = await WordModel.updateOne(
      {
        ...testData.updateWordInput,
        // @ts-expect-error: testing possible empty args
        id: word.id
      },
      mockUser.id
    );

    expect(result.ok).toBe(true);
    expect(result.value).toMatchSnapshot(snapshotConfig);
    // @ts-expect-error: testing possible empty args
    const searchTResult = await WordModel.findById(word.id, mockUser.id);

    expect(result.value).toEqual(searchTResult);

    // @ts-expect-error: testing empty args case
    const resultForUnknowUser = await WordModel.updateOne({
      ...testData.updateWordInput,
      // @ts-expect-error: testing possible empty args
      id: word2.id
    });
    expect(resultForUnknowUser).toEqual({ ok: false });

    const resultWithImmutableProps = await WordModel.updateOne(
      {
        ...testData.updateWordInput2,
        // @ts-expect-error: testing possible empty args
        id: word2.id
      },
      mockUser.id
    );
    // @ts-expect-error: testing possible empty args
    expect(resultWithImmutableProps?.value?.name).toEqual(word2.name);
    // @ts-expect-error: testing possible empty args
    expect(resultWithImmutableProps?.value?.uuid).toEqual(word2.uuid);

    const tag = await WordTagModel.createOne(
      testData.createTagInput,
      mockUser.id
    );

    const resultWithValidTag = await WordModel.updateOne(
      {
        // @ts-expect-error: testing possible empty args
        tags: [tag.id, mockId],
        // @ts-expect-error: testing possible empty args
        id: word2.id
      },
      mockUser.id
    );
    // @ts-expect-error: testing possible empty args
    expect(resultWithValidTag.value.tags[0].toString()).toContain(tag.id);
    // @ts-expect-error: testing possible empty args
    expect(resultWithValidTag.value.tags.length).toBe(1);
    expect(resultWithValidTag.ok).toBe(true);
  });

  test('deleteOne', async () => {
    const word = await WordModel.createOne(
      testData.createWordInput,
      mockUser.id
    );
    await WordModel.createOne(testData.createWordInput2, mockUser.id);
    await WordModel.createOne(testData.createWordInput, mockId);
    // @ts-expect-error: testing possible empty args
    const result = await WordModel.deleteOne(word.id, mockUser.id);
    expect(result).toEqual({ ok: true });
    // @ts-expect-error: testing possible empty args
    const searchTResult = await WordModel.findById(word.id, mockUser.id);
    expect(searchTResult).toBeNull();
    const wordsResult = await WordModel.findManyAndPaginate({}, mockUser.id);
    expect(wordsResult.words).toHaveLength(1);
    // @ts-expect-error: testing empty args case
    const resultForUnknowUser = await WordModel.deleteOne(word.id);
    expect(resultForUnknowUser).toEqual({ ok: false });
  });

  test('findVerbs', async () => {
    const data = await seedDb({
      words: [...newWordInputs[Language.Spanish]],
      users: usersTestData
    });
    // @ts-expect-error: args can be empty
    const result = await WordModel.findVerbs(data.users[0]);
    const verbs = ['correr', 'pensar'];
    verbs.forEach((verb, i) => {
      expect(result[i].name).toEqual(verb);
    });
    // @ts-expect-error: testing empty args case
    const resultForUnknowUser = await WordModel.findVerbs();
    expect(resultForUnknowUser).toEqual([]);
  });

  test('updateStatistics', async () => {
    const data = await seedDb({
      words: [...newWordInputs[Language.Spanish]],
      users: usersTestData
    });
    // @ts-expect-error: args can be empty
    const statistics = data.words.map((word, i) => ({
      id: word,
      hasError: i % 2 === 0,
      score: Score.Hard,
      gameType: Game.Audio
    }));
    // @ts-expect-error: args can be empty
    const result = await WordModel.updateStatistics(statistics, data.users[0]);
    expect(result).toEqual({ ok: true });
  });
});
