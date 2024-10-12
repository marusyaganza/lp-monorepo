import { getSearchFilter } from '../sortingHelpers';

describe('getSearchFilter', () => {
  it('should return an empty filter when searchQuery is null', () => {
    const result = getSearchFilter(null);
    expect(result).toEqual({});
  });

  it('should return an empty filter when searchQuery is undefined', () => {
    const result = getSearchFilter(undefined);
    expect(result).toEqual({});
  });

  it('should return a filter with $or condition when searchQuery is provided', () => {
    const searchQuery = 'example';
    const result = getSearchFilter(searchQuery);

    expect(result).toEqual({
      $or: [
        { name: { $regex: new RegExp(searchQuery, 'i') } },
        { 'defs.def': { $regex: new RegExp(searchQuery, 'i') } },
        { alternativeSpelling: { $regex: new RegExp(searchQuery, 'i') } },
        { stems: { $regex: new RegExp(searchQuery, 'i') } }
      ]
    });
  });

  it('should handle special characters in the searchQuery', () => {
    const input = 'example?*';
    const searchQuery = 'example';
    const result = getSearchFilter(input);

    expect(result).toEqual({
      $or: [
        { name: { $regex: new RegExp(searchQuery, 'i') } },
        { 'defs.def': { $regex: new RegExp(searchQuery, 'i') } },
        { alternativeSpelling: { $regex: new RegExp(searchQuery, 'i') } },
        { stems: { $regex: new RegExp(searchQuery, 'i') } }
      ]
    });
  });

  it('should return a case-insensitive regex for the searchQuery', () => {
    const searchQuery = 'Example';
    const result = getSearchFilter(searchQuery);

    expect(result).toEqual({
      $or: [
        { name: { $regex: new RegExp(searchQuery, 'i') } },
        { 'defs.def': { $regex: new RegExp(searchQuery, 'i') } },
        { alternativeSpelling: { $regex: new RegExp(searchQuery, 'i') } },
        { stems: { $regex: new RegExp(searchQuery, 'i') } }
      ]
    });
  });
});
