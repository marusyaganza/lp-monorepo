const gql = require('graphql-tag')
const createTestServer = require('./helpers');
const {words, users} = require('./mocks/data');

const loginData = {email: 'test@test.com', password: 'password'};
const signUpData = {name: 'User', email: 'test@test.com', password: 'password', role: 'MEMBER'};

const loginMutation = gql`
mutation {
    login(input: {email: "member@member.com", password: "password"}) {
        id
        email
        name
        token
  }
}
`
const signUpMutation = gql`
mutation {
    signUp(input: {name: "User", email: "test@test.com", password: "password"}) {
        id
        email
        name
        token
  }
}
`

const createToken = jest.fn(() => 'token');

describe('mutations', () => {
  test('login with correct password', async () => {
    const findOne = jest.fn(() => users[0])
    const {mutate} = createTestServer({
    createToken,
      models: {
        User: {
          findOne,
        }
      }
    })

    const res = await mutate({mutation: loginMutation})
    expect(res).toMatchSnapshot();
    expect(findOne).toHaveBeenCalledWith({email: "member@member.com"});
    expect(createToken).toHaveBeenCalledWith(users[0]);
  });

  test('login with incorrect password', async () => {
    const findOne = jest.fn(() => null)
    const {mutate} = createTestServer({
    createToken,
      models: {
        User: {
          findOne,
        }
      }
    })

    const res = await mutate({mutation: loginMutation})
    expect(res).toMatchSnapshot();
  });
  
  test('signUp', async () => {
    const findOne = jest.fn(() => null);
    const createOne = jest.fn(() => ({...loginData, id: '2'}))
    const {mutate} = createTestServer({
    createToken,
      models: {
        User: {
          findOne,
          createOne,
        }
      }
    })

    const res = await mutate({mutation: signUpMutation})
    expect(res).toMatchSnapshot();
    expect(findOne).toHaveBeenCalledWith({email: "test@test.com"});
    expect(createOne).toHaveBeenCalledWith(signUpData);
  });
})