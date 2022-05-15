import { Http2ServerRequest } from "http2";

const {ApolloServer}  = require('apollo-server');
const typeDefs = require('./typedefs');
const resolvers = require('./resolvers')
const {createToken, getUserFromToken} = require('./auth')
const {models, db} = require('./db')

// console.log('user', models.User.findOne());

const server = new ApolloServer({typeDefs, resolvers,  context({req}: {req: Http2ServerRequest}) {
    // const user = db.get('user').value()
    const token = req.headers.authorization;
    const user = token ? getUserFromToken(token) : null;
    // console.log('token', createToken({id: "Z2hlvDmLOSRZGebC_Z_aA", role: "ADMIN"}, process.env.JWT_SECTET))
    return {models, db, user, createToken}
  }});

server.listen(4000).then(({url}: {url:string}) => {
  console.log(`🚀 Server ready at ${url}`)
})
.catch((err: string) => {console.log(err)});