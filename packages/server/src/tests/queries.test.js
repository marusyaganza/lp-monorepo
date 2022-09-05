const gql = require('graphql-tag');
const createTestServer = require('./helpers');
const { words, users } = require('./mocks/data');

const wordQuery = gql`
  {
    words {
      id
      defs
      particle
    }
  }
`;

const userQuery = gql`
  {
    user {
      name
      email
      id
      role
    }
  }
`;

describe('queries', () => {
  test('word', async () => {
    const findMany = jest.fn(() => words);
    const { query } = createTestServer({
      user: { id: '1' },
      models: {
        Word: {
          findMany
        }
      }
    });

    const res = await query({ query: wordQuery });
    expect(res).toMatchSnapshot();
    expect(findMany).toHaveBeenCalledTimes(1);
  });
  test('user', async () => {
    const findOne = jest.fn(() => users[0]);
    const { query } = createTestServer({
      user: users[0],
      models: {
        Word: {
          findOne
        }
      }
    });

    const res = await query({ query: userQuery });
    expect(res).toMatchSnapshot();
  });
});
