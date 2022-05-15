"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { ApolloServer } = require('apollo-server');
const typeDefs = require('./typedefs');
const resolvers = require('./resolvers');
const { createToken, getUserFromToken } = require('./auth');
const { models, db } = require('./db');
// console.log('user', models.User.findOne());
const server = new ApolloServer({ typeDefs, resolvers, context({ req }) {
        // const user = db.get('user').value()
        const token = req.headers.authorization;
        const user = token ? getUserFromToken(token) : null;
        // console.log('token', createToken({id: "Z2hlvDmLOSRZGebC_Z_aA", role: "ADMIN"}, process.env.JWT_SECTET))
        return { models, db, user, createToken };
    } });
server.listen(4000).then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
})
    .catch((err) => { console.log(err); });
//# sourceMappingURL=app.js.map