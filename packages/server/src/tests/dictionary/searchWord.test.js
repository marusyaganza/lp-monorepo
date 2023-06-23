import { searchWord } from '../../dictionary/searchWord';
import { Language } from '../../generated/graphql';
import { inputSpanish } from '../mocks/dictionaryData';

const mockFetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(inputSpanish)
  })
);
global.fetch = mockFetch;

describe('dictionary searchWord', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  afterAll(() => {
    jest.resetAllMocks();
  });
  test('do not fetch a word if search query is empty', () => {
    searchWord(undefined, Language.English);
    expect(mockFetch).toHaveBeenCalledTimes(0);
  });
  test('fetch a english word', () => {
    searchWord('word1', Language.English);
    expect(mockFetch).toHaveBeenCalledWith(
      'mockEnglishApi/word1?key=mockEnglishKey'
    );
  });
  test('fetch a spanish word', () => {
    searchWord('word1', Language.Spanish);
    expect(mockFetch).toHaveBeenCalledWith(
      'mockSpanishApi/word1?key=mockSpanishKey'
    );
  });
  test('defaults to the english language', () => {
    searchWord('word1');
    expect(mockFetch).toHaveBeenCalledWith(
      'mockEnglishApi/word1?key=mockEnglishKey'
    );
  });
});
