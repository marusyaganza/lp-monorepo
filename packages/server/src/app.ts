import 'graphql-import-node';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { initDB } from './db/initDB';
import { resolvers, ResolverContext } from './resolvers';
import {
  createToken,
  getUserFromToken,
  hashPassword,
  validatePassword
} from './auth';
import { generateGameData } from './utils/generateGameData';
import { games } from './mocks/games';
import { ModelsType } from './db/models';
import { searchWord } from './dictionary';

const typeDefs = require('../../shared/schema.graphql');

const server = new ApolloServer({
  typeDefs,
  resolvers
});

initDB(async (models: ModelsType) => {
  const { url } = await startStandaloneServer(server, {
    context: async function ({ req }): Promise<ResolverContext> {
      const token = req?.headers?.authorization?.split(' ').pop();
      const user = token ? getUserFromToken(token) : undefined;
      return {
        models,
        user,
        createToken,
        validatePassword,
        hashPassword,
        searchWord,
        games,
        generateGameData
      };
    },
    listen: { port: 4000 }
  });
  console.log(`🚀 Server ready at ${url}`);
});
