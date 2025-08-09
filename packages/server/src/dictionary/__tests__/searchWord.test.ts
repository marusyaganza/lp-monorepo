import { searchWord } from '../searchWord';
import mockEnglishResponse from '../fetchWord/mockFetchWord/mocks/ENGLISH/murther';
import mockSpanishResponse from '../fetchWord/mockFetchWord/mocks/SPANISH/hola';
import { Language } from '../../generated/graphql';

const spanishResult = [
  {
    audioUrl: 'mock_audio_endpoint/es/me/mp3/h/hola001sp.mp3',
    conjugation: null,
    defs: [{ def: 'hello!, hi!' }],
    imgDesc: null,
    imgUrl: undefined,
    isOffensive: false,
    language: 'SPANISH',
    name: 'hola',
    particle: 'interjection',
    shortDef: ['hello!, hi!'],
    stems: ['hola'],
    transcription: 'hola',
    uuid: '2c2d7545-9a6d-411a-8bf0-5de583a8a203'
  }
];

const englishResult = [
  {
    audioUrl: 'mock_audio_endpoint/en/us/mp3/m/murthe01.mp3',
    conjugation: null,
    defs: [{ def: 'chiefly dialectal variant of <i>murder</i>' }],
    imgDesc: null,
    imgUrl: undefined,
    isOffensive: false,
    language: 'ENGLISH',
    name: 'murther',
    particle: 'noun',
    shortDef: ['chiefly dialectal variant of <i>murder</i>'],
    stems: ['murder', 'murther', 'murthered', 'murthering', 'murthers'],
    transcription: 'ˈmər-t͟hər',
    uuid: '87f2219c-6fcb-4390-9e2a-427384ef13a3'
  }
];

const mockFetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({})
  })
);

// @ts-expect-error: mocking global function
global.fetch = mockFetch;
const originalEnv = process.env;

describe('searchWord', () => {
  afterEach(() => {
    jest.clearAllMocks();
    process.env = originalEnv;
  });
  afterAll(() => {
    jest.resetAllMocks();
    process.env = originalEnv;
  });

  test('should use mock fetch if mocks are enabled with English', async () => {
    const result = await searchWord('murther', Language.English);
    expect(mockFetch).toHaveBeenCalledTimes(0);
    expect(result).toEqual(englishResult);
  });

  test('should use mock fetch if mocks are enabled with Spanish', async () => {
    const result = await searchWord('hola', Language.Spanish);
    expect(mockFetch).toHaveBeenCalledTimes(0);
    expect(result).toEqual(spanishResult);
  });

  test('should fetch word using correct API in production with Spanish', async () => {
    process.env.NODE_ENV = 'production';
    process.env.USE_MOCKS = 'false';
    mockFetch.mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockSpanishResponse)
      })
    );
    const result = await searchWord('hola', Language.Spanish);
    expect(mockFetch).toHaveBeenCalledWith(
      'mockSpanishApi/hola?key=mockSpanishKey'
    );
    expect(result).toEqual(spanishResult);
  });

  test('should fetch word using correct API in production with English', async () => {
    process.env.NODE_ENV = 'production';
    process.env.USE_MOCKS = 'false';
    mockFetch.mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockEnglishResponse)
      })
    );
    const result = await searchWord('murther', Language.English);
    expect(mockFetch).toHaveBeenCalledWith(
      'mockEnglishApi/murther?key=mockEnglishKey'
    );
    expect(result).toEqual(englishResult);
  });

  test('should fetch word using correct API if mocks are disabled with English', async () => {
    process.env.USE_MOCKS = undefined;
    process.env.NODE_ENV = 'test';
    mockFetch.mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockEnglishResponse)
      })
    );
    const result = await searchWord('murther', Language.English);
    expect(mockFetch).toHaveBeenCalledWith(
      'mockEnglishApi/murther?key=mockEnglishKey'
    );
    expect(result).toEqual(englishResult);
  });

  test('should fetch word using correct API if mocks are disabled with Spanish', async () => {
    process.env.USE_MOCKS = undefined;
    process.env.NODE_ENV = 'test';
    mockFetch.mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockSpanishResponse)
      })
    );
    const result = await searchWord('hola', Language.Spanish);
    expect(mockFetch).toHaveBeenCalledWith(
      'mockSpanishApi/hola?key=mockSpanishKey'
    );
    expect(result).toEqual(spanishResult);
  });
});
