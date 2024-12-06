import {
  connectToDb,
  disconnectFromDb,
  dropDb,
  seedDb
} from '../../../../tests/helpers/testDBUtils';
import { usersTestData } from '../../../../tests/mocks/inputs/newUserInput';
import { newTagInputs } from '../../../../tests/mocks/inputs/newTagInputs';
import { filterTags } from '../general';
import { Language } from '../../../../generated/graphql';

describe('filterTags', () => {
  let data;
  beforeEach(async () => {
    await connectToDb();
    await dropDb();
    data = await seedDb({
      tags: [...newTagInputs[Language.English]],
      users: usersTestData
    });
  });

  afterEach(async () => {
    await dropDb();
    await disconnectFromDb();
  });

  it('should sort out nonexistent tags', async () => {
    const nonexistentTags = ['mockId1', 'mockId2'];
    const validTags = data.tags.map(t => t.toString());
    const tags = [...validTags, ...nonexistentTags];

    const result = await filterTags({
      tags,
      language: Language.English,
      user: data.users[0]
    });
    expect(result).toEqual(validTags);
  });

  it('should keep all the valid tags', async () => {
    const dbTags = data.tags.map(t => t.toString());
    const result = await filterTags({
      tags: dbTags,
      language: Language.English,
      user: data.users[0]
    });
    expect(result).toEqual(dbTags);
  });

  it('should return [] if all tags are invalid', async () => {
    const nonexistentTags = ['mockId1', 'mockId2'];
    const result = await filterTags({
      tags: nonexistentTags,
      language: Language.English,
      user: data.users[0]
    });
    expect(result).toEqual([]);
  });
});
