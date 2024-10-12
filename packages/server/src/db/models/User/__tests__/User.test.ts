import { UserModel } from '../User';
import {
  connectToDb,
  disconnectFromDb,
  dropDb,
  baseSnapshotConfig
} from '../../../../tests/helpers';

const snapshotConfig = {
  ...baseSnapshotConfig,
  createdAt: expect.any(String)
};

const createUserInput = {
  email: 'test@test.com',
  password: 'password1',
  firstName: 'Test',
  lastName: 'User1',
  primaryLanguage: 'English',
  role: 'MEMBER'
};

describe('User', () => {
  beforeEach(async () => {
    await connectToDb();
    await dropDb();
  });

  afterEach(async () => {
    await dropDb();
    await disconnectFromDb();
  });

  test('createOne', async () => {
    const result = await UserModel.createOne(createUserInput);
    expect(result).toMatchSnapshot(snapshotConfig);
  });

  test('findOne', async () => {
    const user = await UserModel.createOne(createUserInput);
    const result = await UserModel.findOne({
      email: createUserInput.email
    });
    const result2 = await UserModel.findOne({ id: user?.id });
    expect(result2).not.toBeNull();
    expect(result).toMatchSnapshot(snapshotConfig);
  });
});
