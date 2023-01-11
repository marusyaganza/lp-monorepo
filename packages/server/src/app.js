const { ApolloServer } = require('apollo-server');
const { initDb } = require('./db/mongo/initDB');
const typeDefs = require('./typedefs');
const resolvers = require('./resolvers');
const { createToken, getUserFromToken } = require('./auth');

// TODO add a mechanism for switching between mock db and dev db
// Uncomment this to use mock db
// const { models, db } = require('./db');

initDb(models => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context({ req }) {
      const token = req?.headers?.authorization?.split(' ')[1];
      const user = token ? getUserFromToken(token) : null;
      return { models, user, createToken };
    }
  });
  server
    .listen(4000)
    .then(({ url }) => {
      console.log(`🚀 Server ready at ${url}`);
    })
    .catch(err => {
      console.log(err);
    });
});
