import { calculatePaginationValues } from '../general';
import { WORDS_PER_PAGE } from '../../../../constants/defaultValues';

describe('calculatePaginationValues', () => {
  it('should calculate correct pagination values with all parameters provided', () => {
    const result = calculatePaginationValues(20, 2, 100);
    expect(result).toEqual({
      limit: 20,
      skip: 20, // (2 - 1) * 20
      hasNext: true,
      page: 2
    });
  });

  it('should use default limit when initialLimit is null or undefined', () => {
    const result = calculatePaginationValues(null, 1, 50);
    expect(result).toEqual({
      limit: WORDS_PER_PAGE,
      skip: 0, // (1 - 1) * 10 (WORDS_PER_PAGE)
      hasNext: true,
      page: 1
    });
  });

  it('should default to page 1 when pageNum is null or undefined', () => {
    const result = calculatePaginationValues(15, null, 30);
    expect(result).toEqual({
      limit: 15,
      skip: 0, // (1 - 1) * 15
      hasNext: true,
      page: 1
    });
  });

  it('should correctly calculate when no more pages are available (hasNext = false)', () => {
    const result = calculatePaginationValues(20, 5, 90);
    expect(result).toEqual({
      limit: 20,
      skip: 80, // (5 - 1) * 20
      hasNext: false, // 90 - (5 * 20) <= 0
      page: 5
    });
  });

  it('should return 0 skip when pageNum is negative', () => {
    const result = calculatePaginationValues(10, -1, 50);
    expect(result).toEqual({
      limit: 10,
      skip: 0, // (-1 -> 1) (1 - 1) * 10
      hasNext: true,
      page: 1 // Math.abs(-1) -> 1
    });
  });

  it('should return correct values when count is 0', () => {
    const result = calculatePaginationValues(10, 1, 0);
    expect(result).toEqual({
      limit: 10,
      skip: 0,
      hasNext: false,
      page: 1
    });
  });
});
