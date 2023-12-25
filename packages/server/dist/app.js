"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
require("graphql-import-node");
const server_1 = require("@apollo/server");
const standalone_1 = require("@apollo/server/standalone");
const initDB_1 = require("./db/initDB");
const resolvers_1 = require("./resolvers");
const auth_1 = require("./auth");
const generateGameData_1 = require("./utils/generateGameData");
const games_1 = require("./mocks/games");
const dictionary_1 = require("./dictionary");
const typeDefs = require('./schema.graphql');
const server = new server_1.ApolloServer({
    typeDefs,
    resolvers: resolvers_1.resolvers
});
(0, initDB_1.initDB)(async (models) => {
    // @ts-ignore
    const { url } = await (0, standalone_1.startStandaloneServer)(server, {
        context: async function ({ req }) {
            const token = req?.headers?.authorization?.split(' ').pop();
            const user = token ? (0, auth_1.getUserFromToken)(token) : undefined;
            return {
                models,
                user,
                createToken: auth_1.createToken,
                validatePassword: auth_1.validatePassword,
                hashPassword: auth_1.hashPassword,
                searchWord: dictionary_1.searchWord,
                games: games_1.games,
                generateGameData: generateGameData_1.generateGameData
            };
        },
        listen: { port: 4000 }
    });
    console.log(`🚀 Server ready at ${url}`);
});
//# sourceMappingURL=app.js.map