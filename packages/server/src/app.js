const {gql, ApolloServer}  = require('apollo-server');
const typeDefs = require('./typedefs');
const resolvers = require('./resolvers')
const {models, db} = require('./db')

// console.log('user', models.User.findOne());

const server = new ApolloServer({typeDefs, resolvers,  context() {
    // const user = db.get('user').value()
    return {models, db}
  }});

server.listen(4000)
.then(() => {
    console.log('on port 4000')
})
.catch((err) => {console.log(err)});