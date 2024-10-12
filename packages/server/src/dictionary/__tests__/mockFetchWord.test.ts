import { Language } from '../../generated/graphql';
import { mockFetchWord } from '../fetchWord/mockFetchWord/mockFetchWord';
import wheelWord from '../fetchWord/mockFetchWord/mocks/ENGLISH/wheel';
import holaWord from '../fetchWord/mockFetchWord/mocks/SPANISH/hola';

describe('mockFetchWord', () => {
  test('should return [] if query is not provided', async () => {
    const query = null;
    // @ts-expect-error: testing empty query case
    const result = await mockFetchWord(query, Language.English);
    // expect(mockFetch).toHaveBeenCalledTimes(0);
    expect(result).toEqual([]);
  });

  test('should return the right English word', async () => {
    const query = 'wheel';
    const result = await mockFetchWord(query, Language.English);
    expect(result).toEqual(wheelWord);
  });

  test('should return the right Spanish word', async () => {
    const query = 'hola';
    const result = await mockFetchWord(query, Language.Spanish);
    expect(result).toEqual(holaWord);
  });
});
