import { ApolloServer } from '@apollo/server';
import { resolvers, ResolverContext } from '../resolvers';
const { readFileSync } = require('fs');
const { MongoClient } = require('mongodb');

const typeDefs = readFileSync(
  require.resolve('../../../shared/schema.graphql')
).toString('utf-8');

export const createTestServer = (context: ResolverContext) => {
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

export const initDb = async () => {
  let _db;
  let client;
  try {
    client = new MongoClient('mongodb://localhost:27017', {
      useUnifiedTopology: true
    });
    await client.connect();
    _db = await client.db('test-db');
  } catch (err) {
    console.log('mongo err, make sure you run the DB', err);
  }
  return _db;
};

// module.exports = createTestServer;
