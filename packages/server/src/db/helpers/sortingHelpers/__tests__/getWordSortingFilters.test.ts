import { DEFAULT_WORDS_SORT_BY } from '../../../../constants/defaultValues';
import { SortWordsBy } from '../../../../generated/graphql';
import { getWordSortingFilters } from '../sortingHelpers';

describe('getWordSortingFilters', () => {
  it('should return sorting filter by default "UpdatedAt" if sortBy is null', () => {
    const result = getWordSortingFilters(null);
    expect(result).toEqual({ [SortWordsBy.UpdatedAt]: -1 }); // Default sorting for UpdatedAt is descending
  });

  it('should return reverse sorting filter for "UpdatedAt" when isReverseOrder is true', () => {
    const result = getWordSortingFilters(SortWordsBy.UpdatedAt, true);
    expect(result).toEqual({ updatedAt: 1 });
  });

  it('should return sorting filter for a specified "Level" in default order', () => {
    const result = getWordSortingFilters(SortWordsBy.Level);
    expect(result).toEqual({ level: 1 });
  });

  it('should return sorting filter for "Level" in reverse order when isReverseOrder is true', () => {
    const result = getWordSortingFilters(SortWordsBy.Level, true);
    expect(result).toEqual({ level: -1 });
  });

  it('should return sorting filter for a specified "Name" in default order', () => {
    const result = getWordSortingFilters(SortWordsBy.Name);
    expect(result).toEqual({ name: 1 });
  });

  it('should return sorting filter for "Particle" in reverse order when isReverseOrder is true', () => {
    const result = getWordSortingFilters(SortWordsBy.Particle, true);
    expect(result).toEqual({ particle: -1 });
  });

  it('should return sorting filter by default when sortBy is unspecified', () => {
    // @ts-expect-error: testing empty args case
    const result = getWordSortingFilters(undefined);
    expect(result).toEqual({ [DEFAULT_WORDS_SORT_BY]: -1 }); // Default is 'updatedAt' descending
  });
});
