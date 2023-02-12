const createTestServer = require('./helpers');
const { users } = require('./mocks/data');

const loginData = { email: 'test@test.com', password: 'password' };
const signUpData = {
  firstName: 'User',
  lastName: 'Test',
  email: 'test@test.com',
  password: 'mock_hash_password',
  role: 'MEMBER'
};

const loginMutation = `
  mutation {
    login(input: { email: "member@member.com", password: "password1" }) {
      id
      email
      firstName
      lastName
      token
    }
  }
`;

const signUpMutation = `
  mutation {
    signUp(
      input: {
        firstName: "User"
        lastName: "Test"
        email: "test@test.com"
        password: "password"
      }
    ) {
      id
      email
      firstName
      lastName
      token
    }
  }
`;

const createToken = jest.fn(() => 'token');

describe('mutations', () => {
  test('login with correct password', async () => {
    const validatePassword = jest.fn(() => true);
    const findOne = jest.fn(() => users[0]);
    const { mutate } = createTestServer({
      createToken,
      validatePassword,
      models: {
        User: {
          findOne
        }
      }
    });

    const res = await mutate({ mutation: loginMutation });
    expect(validatePassword).toHaveBeenCalledWith('password1', 'password');
    expect(res).toMatchSnapshot();
    expect(findOne).toHaveBeenCalledWith({ email: 'member@member.com' });
    expect(createToken).toHaveBeenCalledWith({ id: '1', role: 'MEMBER' });
  });

  test('login with incorrect password', async () => {
    const findOne = jest.fn(() => users[0]);
    const validatePassword = jest.fn(() => false);
    const { mutate } = createTestServer({
      createToken,
      validatePassword,
      models: {
        User: {
          findOne
        }
      }
    });
    const res = await mutate({ mutation: loginMutation });
    expect(validatePassword).toHaveBeenCalledWith('password1', 'password');
    expect(res).toMatchSnapshot();
  });

  test('login with invalid email', async () => {
    const findOne = jest.fn(() => null);
    const { mutate } = createTestServer({
      createToken,
      models: {
        User: {
          findOne
        }
      }
    });
    const res = await mutate({ mutation: loginMutation });
    expect(res).toMatchSnapshot();
  });

  test('signUp', async () => {
    const findOne = jest.fn(() => null);
    const hashPassword = jest.fn(pass => `mock_hash_${pass}`);
    const createOne = jest.fn(() => ({ ...loginData, id: '2' }));
    const { mutate } = createTestServer({
      createToken,
      hashPassword,
      models: {
        User: {
          findOne,
          createOne
        }
      }
    });

    const res = await mutate({ mutation: signUpMutation });
    expect(res).toMatchSnapshot();
    expect(findOne).toHaveBeenCalledWith({ email: 'test@test.com' });
    expect(hashPassword).toHaveBeenCalledWith('password');
    expect(createOne).toHaveBeenCalledWith(signUpData);
  });
});
