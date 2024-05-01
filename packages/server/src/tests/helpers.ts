import { ApolloServer } from '@apollo/server';
import { resolvers, ResolverContext } from '../resolvers';
import { readFileSync } from 'fs';
import { connect, connection } from 'mongoose';

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

export async function connectToDb() {
  try {
    await connect('mongodb://localhost:27017/test');
  } catch (err) {
    console.error('mongoose err, make sure you run the DB', err);
  }
}

export async function disconnectFromDb() {
  try {
    await connection.close();
  } catch (err) {
    console.error('mongoose close connection error', err);
  }
}

export async function dropDb() {
  try {
    await connection.db.dropDatabase();
  } catch (err) {
    console.error('mongoose drop db error', err);
  }
}

export const dbSnapshotConfig = {
  createdAt: expect.any(String),
  id: expect.any(String),
  _id: expect.any(Object)
};
