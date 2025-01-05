import { connect } from 'mongoose';
import { initDB } from '../initDB';
import { mockEnv } from '../../tests/mocks/mockEnv';
import { DEFAULT_MONGO_CONNECTION } from '../../constants/defaultValues';

jest.mock('mongoose', () => {
  const originalModule = jest.requireActual('mongoose');
  return {
    __esModule: true,
    ...originalModule,
    connect: jest.fn()
  };
});

describe('initDB', () => {
  const mockConnect = connect as jest.Mock;
  const mockCb = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call the callback when connection is successful', async () => {
    // Simulate successful connection
    mockConnect.mockResolvedValueOnce({});

    await initDB(mockCb);
    expect(mockCb).toHaveBeenCalled();
  });

  it('should not call the callback when connection fails', async () => {
    const mockError = new Error('Connection failed');
    mockConnect.mockRejectedValueOnce(mockError);
    await initDB(mockCb);
    expect(mockCb).not.toHaveBeenCalled();
  });

  it('should use the provided connection string when passed', async () => {
    const customConnectionString = 'mongodb://custom-db:27017';
    mockConnect.mockResolvedValueOnce({});

    await initDB(mockCb, customConnectionString);

    expect(mockConnect).toHaveBeenCalledWith(customConnectionString);
    expect(mockCb).toHaveBeenCalled();
  });

  it('should use the default connection string when none is provided', async () => {
    mockConnect.mockResolvedValueOnce({});

    await initDB(mockCb);

    expect(mockConnect).toHaveBeenCalledWith(
      mockEnv.MONGO_CONNECTION || DEFAULT_MONGO_CONNECTION
    );
    expect(mockCb).toHaveBeenCalled();
  });
});
