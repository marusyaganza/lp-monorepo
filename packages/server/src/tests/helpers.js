const { ApolloServer } = require('@apollo/server');
const typeDefs = require('../typedefs');
const resolvers = require('../resolvers');

const createTestServer = context => {
  const server = new ApolloServer({
    typeDefs,
    resolvers
  });
  async function mutate({ mutation, variables }) {
    return await server.executeOperation(
      { query: mutation, variables },
      { contextValue: context }
    );
  }
  async function query({ query, variables }) {
    return await server.executeOperation(
      { query, variables },
      { contextValue: context }
    );
  }
  return { mutate, query };
};

module.exports = createTestServer;
