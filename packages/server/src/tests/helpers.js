const { ApolloServer } = require('apollo-server');
const { createTestClient } = require('apollo-server-testing');
const typeDefs = require('../typedefs');
const resolvers = require('../resolvers');

const createTestServer = context => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    mockEntireSchema: false,
    mocks: true,
    context: () => context
  });
  return createTestClient(server);
};

module.exports = createTestServer;
