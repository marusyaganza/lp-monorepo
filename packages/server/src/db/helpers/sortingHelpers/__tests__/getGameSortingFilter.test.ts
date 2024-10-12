import { Game, SortBy } from '../../../../generated/graphql';
import { getGameSortingFilter } from '../sortingHelpers';

describe('getGameSortingFilter', () => {
  it('should return natural sorting filter when no sortBy is provided', () => {
    expect(getGameSortingFilter(Game.Audio)).toEqual({ $natural: 1 });
    expect(getGameSortingFilter(Game.Audio, null, true)).toEqual({
      $natural: -1
    });
  });

  it('should return correct sorting filter for a specified sortBy without reverse order', () => {
    const result = getGameSortingFilter(Game.SelectWord, SortBy.SuccessRate);
    expect(result).toEqual({ 'statistics.SELECT_WORD.successRate': 1 });
  });

  it('should return correct sorting filter for a specified sortBy with reverse order', () => {
    const result = getGameSortingFilter(
      Game.SelectDef,
      SortBy.LastTimePracticed,
      true
    );
    expect(result).toEqual({ 'statistics.SELECT_DEF.lastTimePracticed': -1 });
  });

  it('should sort ErrorCount with highest errors first by default (reverse order)', () => {
    const result = getGameSortingFilter(Game.Conjugation, SortBy.ErrorCount);
    expect(result).toEqual({ 'statistics.CONJUGATION.errorCount': -1 });
  });

  it('should sort ErrorCount with lowest errors first when reverse order is true', () => {
    const result = getGameSortingFilter(Game.TypeWord, SortBy.ErrorCount, true);
    expect(result).toEqual({ 'statistics.TYPE_WORD.errorCount': 1 });
  });
});
