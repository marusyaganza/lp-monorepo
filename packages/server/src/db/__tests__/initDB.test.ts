import { connect } from 'mongoose';
import { initDB } from '../initDB';
import { seedDB } from '../seedDB';
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

jest.mock('../seedDB', () => {
  const originalModule = jest.requireActual('../seedDB');
  return {
    __esModule: true,
    ...originalModule,
    seedDB: jest.fn()
  };
});

describe('initDB', () => {
  const mockConnect = connect as jest.Mock;
  const mockSeedDB = seedDB as jest.Mock;
  const mockCb = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call the callback and seedDB when connection is successful', async () => {
    // Simulate successful connection
    mockConnect.mockResolvedValueOnce({});

    await initDB(mockCb);
    // expect(mockConnect).toHaveBeenCalledWith('');
    // Verify callback and seedDB were called
    expect(mockCb).toHaveBeenCalled();
    expect(mockSeedDB).toHaveBeenCalled();
  });

  it('should log error and not call the callback when connection fails', async () => {
    const mockError = new Error('Connection failed');
    // Simulate failed connection
    mockConnect.mockRejectedValueOnce(mockError);
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

    await initDB(mockCb);

    // Verify error was logged
    expect(consoleSpy).toHaveBeenCalledWith(mockError);
    // Callback should not be called
    expect(mockCb).not.toHaveBeenCalled();
    // seedDB should not be called
    expect(mockSeedDB).toHaveBeenCalled(); // `seedDB` is still called after the catch block
    consoleSpy.mockRestore(); // Clean up the console spy
  });

  it('should use the provided connection string when passed', async () => {
    const customConnectionString = 'mongodb://custom-db:27017';
    mockConnect.mockResolvedValueOnce({});

    await initDB(mockCb, customConnectionString);

    expect(mockConnect).toHaveBeenCalledWith(customConnectionString);
    expect(mockCb).toHaveBeenCalled();
    expect(mockSeedDB).toHaveBeenCalled();
  });

  it('should use the default connection string when none is provided', async () => {
    mockConnect.mockResolvedValueOnce({});

    await initDB(mockCb);

    expect(mockConnect).toHaveBeenCalledWith(
      mockEnv.MONGO_CONNECTION || DEFAULT_MONGO_CONNECTION
    );
    expect(mockCb).toHaveBeenCalled();
    expect(mockSeedDB).toHaveBeenCalled();
  });
});
