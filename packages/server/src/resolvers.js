const { authenticated, authorized } = require('./auth');
const { AuthenticationError } = require('apollo-server');

const resolvers = {
  Query: {
    user(_, __, { models, user }) {
      return user;
    },
    words: authenticated((_, __, { models, user }) => {
      return models.Word.findMany({ user: user.id });
    })
  },
  Mutation: {
    saveWord: authorized('ADMIN', (_, { input }, { models, user }) => {
      const word = models.Word.createOne({ ...input });
      return word;
    }),
    signUp(_, { input }, { models, createToken }) {
      const existing = models.User.findOne({ email: input.email });
      if (existing) {
        throw new AuthenticationError(
          `user with email ${input.email} already exists`
        );
      }
      const role = 'MEMBER';
      const user = models.User.createOne({ ...input, role });
      const token = createToken(user);
      return { ...user, token };
    },
    login(_, { input }, { models, createToken }) {
      const user = models.User.findOne({ email: input.email });
      if (user?.password !== input.password) {
        throw new AuthenticationError(`email or password is incorrect`);
      }
      const token = createToken(user);
      return { ...user, token };
    }
  }
};

module.exports = resolvers;
