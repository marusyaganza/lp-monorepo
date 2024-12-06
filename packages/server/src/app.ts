require('dotenv').config();
import * as path from 'path';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { loadFilesSync } from '@graphql-tools/load-files';
import { initDB } from './db/initDB';
import { resolvers } from './resolvers';
import { IResolverContext } from './types/types';
import { context } from './context';

const typeDefs = loadFilesSync(
  path.join(__dirname, '../../shared/schema/*.graphql')
);

const server = new ApolloServer<IResolverContext>({
  typeDefs,
  resolvers
});

initDB(async () => {
  const { url } = await startStandaloneServer(server, {
    context,
    listen: { port: 4000 }
  });
  console.log(`🚀 Server ready at ${url}`);
});
