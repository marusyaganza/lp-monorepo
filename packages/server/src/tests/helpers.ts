import { ApolloServer } from '@apollo/server';
import { resolvers, ResolverContext } from '../resolvers';
import { readFileSync } from 'fs';
import { games } from './mocks/games';
import { connect, connection } from 'mongoose';
import { Language } from '../generated/graphql';

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

export async function seedDb() {
  const mockUser = {
    email: 'default@test.com',
    password: 'password1',
    firstName: 'Default',
    lastName: 'User'
  };

  const mockWord = {
    particle: 'noun',
    language: Language.English,
    name: 'default word',
    shortDef: ['default word shortDef'],
    user: '6480560e8cad1841ed6b4011',
    createdAt: 1716739789226,
    defs: [
      {
        def: 'default word def'
      }
    ]
  };
  try {
    const usersCollection = await connection.db.createCollection('users');
    await usersCollection.insertOne(mockUser);
    const gamesCollection = await connection.db.createCollection('games');
    await gamesCollection.insertMany(games);
    const wordsCollection = await connection.db.createCollection('words');
    await wordsCollection.insertOne(mockWord);
  } catch (err) {
    console.error('mongoose seed db error', err);
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

export function getErrorMessageFromGQL(result) {
  return result?.body?.singleResult?.errors?.[0]?.message;
}
