const { authenticated, authorized } = require('./auth');
const {
  AuthenticationError,
  UserInputError
} = require('./apollo-custom-errors');

const resolvers = {
  Query: {
    user: async (_, __, { models, user }) => {
      const result = await models.User.findOne({ id: user.id });
      return result;
    },
    words: authenticated(async (_, __, { models, user }) => {
      return await models.Word.findMany({ user: user.id });
    }),
    word: authenticated(async (_, { id }, { models, user }) => {
      const word = await models.Word.findOne({
        user: user.id,
        id
      });
      if (!word) {
        throw new UserInputError(`word with id ${id} is not found`);
      }
      return word;
    })
  },
  Mutation: {
    saveWord: authorized('MEMBER', async (_, { input }, { models, user }) => {
      const word = await models.Word.createOne({ ...input, user: user.id });
      return word;
    }),
    updateWord: authorized('MEMBER', async (_, { input }, { models, user }) => {
      const result = await models.Word.updateOne({ ...input, user: user.id });
      if (!result.ok) {
        throw new UserInputError(`updating word with id ${input.id} failed`);
      }
      const word = await models.Word.findOne({
        user: user.id,
        id: input.id
      });
      return word;
    }),
    deleteWord: authorized('MEMBER', async (_, { id }, { models, user }) => {
      const result = await models.Word.deleteOne({ id, user: user.id });
      if (!result.ok || result.n !== 1) {
        throw new UserInputError(`deleting word with id ${id} failed`);
      }
      return `word with id ${id} was deleted`;
    }),
    signUp: async (_, { input }, { models, createToken }) => {
      const existing = await models.User.findOne({ email: input.email });
      if (existing) {
        throw new AuthenticationError(
          `user with email ${input.email} already exists`
        );
      }
      const role = 'MEMBER';
      const user = await models.User.createOne({ ...input, role });
      const token = createToken(user);
      return { ...user, token };
    },
    login: async (_, { input }, { models, createToken }) => {
      const user = await models.User.findOne({ email: input.email });
      if (user?.password !== input.password) {
        throw new AuthenticationError(`email or password is incorrect`);
      }
      const token = createToken(user);
      return { ...user, token };
    }
  }
};

module.exports = resolvers;
