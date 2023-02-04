const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const { initDb } = require('./db/mongo/initDB');
const typeDefs = require('./typedefs');
const resolvers = require('./resolvers');
const { createToken, getUserFromToken } = require('./auth');

// TODO add a mechanism for switching between mock db and dev db
// Uncomment this to use mock db
// const { models, db } = require('./db');

initDb(async models => {
  const server = new ApolloServer({
    typeDefs,
    resolvers
  });
  const { url } = await startStandaloneServer(server, {
    context({ req }) {
      const token = req?.headers?.authorization?.split(' ')[1];
      const user = token ? getUserFromToken(token) : null;
      return { models, user, createToken };
    },
    listen: { port: 4000 }
  });
  console.log(`🚀 Server ready at ${url}`);
});
