import { getTagsFilter, NO_TAGS_ID } from '../sortingHelpers';

describe('getTagsFilter', () => {
  it('should return empty object when tags are undefined', () => {
    const result = getTagsFilter();
    expect(result).toEqual({});
  });

  it('should return empty object when tags are null', () => {
    const result = getTagsFilter(null);
    expect(result).toEqual({});
  });

  it('should return empty object when tags array is empty', () => {
    const result = getTagsFilter([]);
    expect(result).toEqual({});
  });

  it('should return filter for no tags when NO_TAGS_ID is present', () => {
    const result = getTagsFilter([NO_TAGS_ID]);
    expect(result).toEqual({
      $or: [{ tags: [] }, { tags: null }]
    });
  });

  it('should return filter with one tag', () => {
    const result = getTagsFilter(['tag1']);
    expect(result).toEqual({
      $and: [{ tags: 'tag1' }]
    });
  });

  it('should return filter with multiple tags', () => {
    const result = getTagsFilter(['tag1', 'tag2', 'tag3']);
    expect(result).toEqual({
      $and: [{ tags: 'tag1' }, { tags: 'tag2' }, { tags: 'tag3' }]
    });
  });

  it('should handle null and valid tag combination', () => {
    const result = getTagsFilter([null, 'tag1']);
    expect(result).toEqual({
      $and: [{ tags: null }, { tags: 'tag1' }]
    });
  });
});
