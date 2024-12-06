export const mockResponse = 'mock_fetch_response';

export const mockFetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(mockResponse)
  })
);

global.fetch = mockFetch;
