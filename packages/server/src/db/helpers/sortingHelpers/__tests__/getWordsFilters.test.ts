import { DEFAULT_LANGUAGE } from '../../../../constants/defaultValues';
import { Language } from '../../../../generated/graphql';
import { getWordsFilters, NO_TAGS_ID } from '../sortingHelpers';

describe('getWordsFilters', () => {
  const user = 'testUser';

  it('should return minimal filter with default language if no filter is provided', () => {
    const result = getWordsFilters(null, user);
    expect(result).toEqual({ user, language: DEFAULT_LANGUAGE });
  });

  it('should apply language filter when language is provided', () => {
    const filter = { language: Language.English };
    const result = getWordsFilters(filter, user);
    expect(result).toEqual({ user, language: 'ENGLISH' });
  });

  it('should apply search filter when searchQuery is provided', () => {
    const filter = { searchQuery: 'example' };
    const result = getWordsFilters(filter, user);
    expect(result).toEqual({
      user,
      language: DEFAULT_LANGUAGE,
      $or: [
        { name: { $regex: new RegExp('example', 'i') } },
        { 'defs.def': { $regex: new RegExp('example', 'i') } },
        { alternativeSpelling: { $regex: new RegExp('example', 'i') } },
        { stems: { $regex: new RegExp('example', 'i') } }
      ]
    });
  });

  it('should apply tags filter when tags are provided', () => {
    const filter = { tags: ['tag1', 'tag2'] };
    const result = getWordsFilters(filter, user);
    expect(result).toEqual({
      user,
      language: DEFAULT_LANGUAGE,
      $and: [{ tags: 'tag1' }, { tags: 'tag2' }]
    });
  });

  it('should apply no-tags filter when NO_TAGS_ID is present in tags', () => {
    const filter = { tags: [NO_TAGS_ID] };
    const result = getWordsFilters(filter, user);
    expect(result).toEqual({
      user,
      language: DEFAULT_LANGUAGE,
      $or: [{ tags: [] }, { tags: null }]
    });
  });

  it('should combine search, tags, and language filters correctly', () => {
    const filter = {
      searchQuery: 'test',
      tags: ['tag1'],
      language: Language.English
    };
    const result = getWordsFilters(filter, user);
    expect(result).toEqual({
      user,
      language: 'ENGLISH',
      $or: [
        { name: { $regex: new RegExp('test', 'i') } },
        { 'defs.def': { $regex: new RegExp('test', 'i') } },
        { alternativeSpelling: { $regex: new RegExp('test', 'i') } },
        { stems: { $regex: new RegExp('test', 'i') } }
      ],
      $and: [{ tags: 'tag1' }]
    });
  });

  it('should return minimal filter with default language if filter is undefined', () => {
    const result = getWordsFilters(undefined, user);
    expect(result).toEqual({ user, language: DEFAULT_LANGUAGE });
  });
});
