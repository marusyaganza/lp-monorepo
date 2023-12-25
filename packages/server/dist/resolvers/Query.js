"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryResolvers = void 0;
const auth_1 = require("../auth");
const apolloCustomErrors_1 = require("../utils/apolloCustomErrors");
const graphql_1 = require("../generated/graphql");
exports.QueryResolvers = {
    user: async (_, __, { models, user }) => {
        const result = await models.User.findOne({ id: user?.id });
        if (!result) {
            throw new apolloCustomErrors_1.UserInputError(`user is not found`);
        }
        return result;
    },
    games: async (_, __, { games }) => {
        return games;
    },
    words: (0, auth_1.authenticated)(async (_, { input }, { models, user }) => {
        const sortBy = input?.sortBy || 'updatedAt';
        const isReverseOrder = !input?.isReverseOrder && !input?.sortBy ? true : input?.isReverseOrder;
        const words = await models.Word.findManyAndSort({
            ...input,
            user: user?.id,
            sortBy,
            isReverseOrder
        });
        return words;
    }),
    word: (0, auth_1.authenticated)(async (_, { id }, { models, user }) => {
        const word = await models.Word.findOne({
            user: user?.id,
            id
        });
        if (!word) {
            throw new apolloCustomErrors_1.UserInputError(`word with id ${id} is not found`);
        }
        return word;
    }),
    searchWord: (0, auth_1.authenticated)(async (_, { input }, { searchWord }) => {
        const searchResult = await searchWord(input?.search, input?.language);
        return searchResult;
    }),
    game: (0, auth_1.authenticated)(async (_, { input }, { models, user, generateGameData, games }) => {
        const { language = graphql_1.Language.English, gameType, sortBy, isReverseOrder } = input;
        const config = games.find(game => game.type === gameType);
        if (!config) {
            throw new apolloCustomErrors_1.OperationResolutionError(`game not found`);
        }
        const minWords = config?.minWords;
        // @ts-ignore
        const words = await models.Word.findManyAndSort({
            // @ts-ignore
            user: user?.id,
            gameType,
            language,
            sortBy,
            isReverseOrder,
            timesToLearn: config?.timesToLearn
        });
        if (!words) {
            throw new apolloCustomErrors_1.OperationResolutionError(`words not found`);
        }
        if (!minWords || words.length < minWords) {
            throw new apolloCustomErrors_1.OperationResolutionError(`not enough words to start a game. You have ${words.length} word. Words requited for the game: ${minWords}`);
        }
        return generateGameData(gameType, words, config);
    })
};
//# sourceMappingURL=Query.js.map