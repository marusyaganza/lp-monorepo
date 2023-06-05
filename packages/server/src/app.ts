import 'graphql-import-node';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { initDB } from './db/mongoose/initDB';
import { resolvers, ResolverContext } from './resolvers';
import {
  createToken,
  getUserFromToken,
  hashPassword,
  validatePassword
} from './auth';
import { ModelsType } from 'db';
const typeDefs = require('../../shared/schema.graphql');
// TODO add a mechanism for switching between mock db and dev db
// Uncomment this to use mock db
// const { models, db } = require('./db');

const server = new ApolloServer({
  typeDefs,
  resolvers
});

initDB(async (models: ModelsType) => {
  const { url } = await startStandaloneServer(server, {
    context: async function ({ req }): Promise<ResolverContext> {
      const token = req?.headers?.authorization?.split(' ').pop();
      const user = token ? getUserFromToken(token) : undefined;
      return { models, user, createToken, validatePassword, hashPassword };
    },
    listen: { port: 4000 }
  });
  console.log(`🚀 Server ready at ${url}`);
});
