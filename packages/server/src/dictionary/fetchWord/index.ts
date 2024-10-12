export async function getFetchFunc() {
  let fetchFunc;
  if (
    process.env.USE_MOCKS === 'true' &&
    process.env.NODE_ENV !== 'production'
  ) {
    const mockFetchModule = await import('./mockFetchWord/mockFetchWord');
    fetchFunc = mockFetchModule.mockFetchWord;
  } else {
    const fetchModule = await import('./fetchWord');
    fetchFunc = fetchModule.fetchWord;
  }
  return fetchFunc;
}
