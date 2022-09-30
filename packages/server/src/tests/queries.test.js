const gql = require('graphql-tag');
const createTestServer = require('./helpers');
const { words, users } = require('./mocks/data');
const wordsQuery = gql`
  {
    words {
      id
      name
      defs {
        def
      }
      particle
      audioUrl
      transcription
      isOffensive
      level
    }
  }
`;

const wordByIdQuery = gql`
  query Query($wordId: ID!) {
    word(id: $wordId) {
      id
      name
      defs {
        def
        examples
      }
      particle
      imgUrl
      audioUrl
      additionalInfo
      transcription
      user
      isOffensive
      stems
      level
    }
  }
`;

const userQuery = gql`
  {
    user {
      firstName
      lastName
      email
      id
      role
    }
  }
`;

describe('queries', () => {
  test('words', async () => {
    const findMany = jest.fn(() => words);
    const { query } = createTestServer({
      user: { id: '1' },
      models: {
        Word: {
          findMany
        }
      }
    });

    const res = await query({ query: wordsQuery });
    expect(res).toMatchSnapshot();
    expect(findMany).toHaveBeenCalledTimes(1);
  });

  test('word by id', async () => {
    const findOne = jest.fn(() => words[0]);
    const { query } = createTestServer({
      user: { id: '1' },
      models: {
        Word: {
          findOne
        }
      }
    });

    const res = await query({
      query: wordByIdQuery,
      variables: { wordId: 'mockid' }
    });
    expect(res).toMatchSnapshot();
    expect(findOne).toHaveBeenCalledTimes(1);
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
