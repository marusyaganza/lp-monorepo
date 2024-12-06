import { ApolloServer } from '@apollo/server';
import { resolvers } from '../../resolvers';
import { loadFilesSync } from '@graphql-tools/load-files';
import * as path from 'path';

const typeDefs = loadFilesSync(
  path.join(__dirname, '../../../../shared/schema/*.graphql')
);

export function createTestServer(context) {
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
}
