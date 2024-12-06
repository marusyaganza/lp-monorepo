import { Language } from '../../generated/graphql';
import { fetchWord } from '../fetchWord/fetchWord';

const mockResponse = 'response';

const mockFetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(mockResponse)
  })
);

// @ts-expect-error: mocking global function
global.fetch = mockFetch;

describe('fetchWord', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  afterAll(() => {
    jest.resetAllMocks();
  });

  test('should not call the API if query is null', async () => {
    const query = null;
    // @ts-expect-error: testing empty query case
    const result = await fetchWord(query, Language.English);
    expect(mockFetch).toHaveBeenCalledTimes(0);
    expect(result).toEqual([]);
  });

  test('should call the right API with English', async () => {
    const query = 'wheel';
    const result = await fetchWord(query, Language.English);
    expect(mockFetch).toHaveBeenCalledWith(
      'mockEnglishApi/wheel?key=mockEnglishKey'
    );
    expect(result).toEqual(mockResponse);
  });

  test('should call the right API with Spanish', async () => {
    const query = 'hola';
    const result = await fetchWord(query, Language.Spanish);
    expect(mockFetch).toHaveBeenCalledWith(
      'mockSpanishApi/hola?key=mockSpanishKey'
    );
    expect(result).toEqual(mockResponse);
  });
});
