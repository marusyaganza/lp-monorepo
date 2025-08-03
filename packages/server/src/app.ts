require('dotenv').config();

import express from 'express';
import cors from 'cors';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { loadFilesSync } from '@graphql-tools/load-files';
import path from 'path';

import { initDB } from './db/initDB';
import { resolvers } from './resolvers';
import { context } from './context';

const typeDefs = loadFilesSync(
  path.join(__dirname, '../../shared/schema/*.graphql')
);

const server = new ApolloServer({
  typeDefs,
  resolvers
});

async function startServer() {
  await initDB();
  await server.start();
  const app = express();

  const allowedOrigin = process.env.FE_URL;
  app.use(
    cors({
      origin: allowedOrigin,
      credentials: true
    })
  );

  app.use(express.json());

  app.use('/graphql', expressMiddleware(server, { context }));

  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
  });
}

startServer();
