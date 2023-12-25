"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const Query_1 = require("./Query");
const Mutation_1 = require("./Mutation");
exports.resolvers = {
    SearchResult: {
        __resolveType(obj) {
            // @ts-ignore
            if (obj?.suggestions) {
                return 'Suggestions';
            }
            // @ts-ignore
            if (obj?.name) {
                return 'DictionaryWord';
            }
            return null;
        }
    },
    Query: Query_1.QueryResolvers,
    Mutation: Mutation_1.MutationResolvers
};
//# sourceMappingURL=index.js.map