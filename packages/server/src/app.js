const { ApolloServer } = require('apollo-server');
const { initDb } = require('./db/mongo');
const typeDefs = require('./typedefs');
const resolvers = require('./resolvers');
const { createToken, getUserFromToken } = require('./auth');
const { models, db } = require('./db');

initDb();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context({ req }) {
    const token = req.headers.authorization.split(' ')[1];
    const user = token ? getUserFromToken(token) : null;
    return { models, db, user, createToken };
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
