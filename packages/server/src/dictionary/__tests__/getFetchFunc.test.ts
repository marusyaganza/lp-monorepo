import { getFetchFunc } from '../fetchWord';

describe('getFetchFunc', () => {
  // Mock modules
  const mockFetchWordFn = 'mockFetchWordFn';
  const fetchWordFn = 'fetchWordFn';

  // Mock dynamic imports
  jest.mock('../fetchWord/mockFetchWord/mockFetchWord', () => ({
    mockFetchWord: 'mockFetchWordFn'
  }));

  jest.mock('../fetchWord/fetchWord', () => ({
    fetchWord: 'fetchWordFn'
  }));

  const originalEnv = process.env;

  // Before each test, restore process.env to its original state
  beforeEach(() => {
    jest.clearAllMocks();
    process.env = { ...originalEnv }; // Reset environment variables before each test
  });

  afterAll(() => {
    process.env = originalEnv; // Restore original process.env after all tests
  });

  it('should return mockFetchWord when USE_MOCKS is true and NODE_ENV is not production', async () => {
    process.env.USE_MOCKS = 'true';
    process.env.NODE_ENV = 'development';

    const fetchFunc = await getFetchFunc();

    // Check if the correct function was returned
    expect(fetchFunc).toBe(mockFetchWordFn);
  });

  it('should return fetchWord when USE_MOCKS is not true', async () => {
    process.env.USE_MOCKS = 'false';
    process.env.NODE_ENV = 'development';

    const fetchFunc = await getFetchFunc();

    // Check if the correct function was returned
    expect(fetchFunc).toBe(fetchWordFn);
  });

  it('should return fetchWord when NODE_ENV is production, even if USE_MOCKS is true', async () => {
    process.env.USE_MOCKS = 'true';
    process.env.NODE_ENV = 'production';

    const fetchFunc = await getFetchFunc();

    // Check if the correct function was returned
    expect(fetchFunc).toBe(fetchWordFn);
  });

  it('should return fetchWord when neither USE_MOCKS nor NODE_ENV is set', async () => {
    process.env.USE_MOCKS = undefined;
    process.env.NODE_ENV = undefined;

    const fetchFunc = await getFetchFunc();

    // Check if the correct function was returned
    expect(fetchFunc).toBe(fetchWordFn);
  });
});
