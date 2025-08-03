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

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should use the provided connection string when passed', async () => {
    const customConnectionString = 'mongodb://custom-db:27017';
    mockConnect.mockResolvedValueOnce({});

    await initDB(customConnectionString);

    expect(mockConnect).toHaveBeenCalledWith(customConnectionString);
  });

  it('should use the default connection string when none is provided', async () => {
    mockConnect.mockResolvedValueOnce({});

    await initDB();

    expect(mockConnect).toHaveBeenCalledWith(
      mockEnv.MONGO_CONNECTION || DEFAULT_MONGO_CONNECTION
    );
  });
});
