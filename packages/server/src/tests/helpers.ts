import { ApolloServer } from '@apollo/server';
import { resolvers, ResolverContext } from '../resolvers';
const { readFileSync } = require('fs');

const typeDefs = readFileSync(
  require.resolve('../../../shared/schema.graphql')
).toString('utf-8');

const createTestServer = (context: ResolverContext) => {
  const server = new ApolloServer({
    typeDefs,
    resolvers
  });
  async function mutate({
    mutation,
    variables
  }: {
    mutation: string;
    variables: Record<string, string>;
  }) {
    return await server.executeOperation(
      { query: mutation, variables },
      { contextValue: context }
    );
  }
  async function query({
    query,
    variables
  }: {
    query: string;
    variables: Record<string, string>;
  }) {
    return await server.executeOperation(
      { query, variables },
      { contextValue: context }
    );
  }
  return { mutate, query };
};

module.exports = createTestServer;
