import { seedDB } from '../seedDB';
import { GAMES } from '../../constants/games';
import { Game } from '../schema/Game';

jest.mock('../schema/Game', () => {
  const originalModule = jest.requireActual('../schema/Game');
  return {
    __esModule: true,
    ...originalModule,
    Game: {
      insertMany: jest.fn(),
      countDocuments: jest.fn()
    }
  };
});

const originalEnv = process.env;

describe('seedDB', () => {
  const mockCountDocuments = Game.countDocuments as jest.Mock;
  const mockInsertMany = Game.insertMany as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    process.env = { ...originalEnv };
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  it('should not insert games in production', async () => {
    process.env.NODE_ENV = 'production';
    mockCountDocuments.mockResolvedValueOnce(0);
    await seedDB();
    expect(mockCountDocuments).toHaveBeenCalledTimes(1);
    expect(mockInsertMany).toHaveBeenCalledTimes(0);
  });

  it('should not insert more games if they already exist', async () => {
    process.env.NODE_ENV = 'development';
    mockCountDocuments.mockResolvedValueOnce(5);
    await seedDB();
    expect(mockCountDocuments).toHaveBeenCalledTimes(1);
    expect(mockInsertMany).toHaveBeenCalledTimes(0);
  });

  it('should insert more games if they do not exist', async () => {
    process.env.NODE_ENV = 'development';
    mockCountDocuments.mockResolvedValueOnce(0);
    await seedDB();
    expect(mockCountDocuments).toHaveBeenCalledTimes(1);
    expect(mockInsertMany).toHaveBeenCalledWith(GAMES);
  });
});
