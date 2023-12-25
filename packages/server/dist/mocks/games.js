"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.games = void 0;
const graphql_1 = require("../generated/graphql");
exports.games = [
    // {
    //   name: 'flash cards',
    //   desc: 'Check if you can recall your words',
    //   imgUrl: 'flash_cards',
    //   id: 'flash_cards'
    // },
    {
        name: 'WordEcho',
        desc: 'Listen, Type, Master. Sharpen language skills through auditory engagement.',
        imgUrl: 'audio',
        id: 'audio',
        type: graphql_1.Game.Audio,
        wordsPerGame: 6,
        minWords: 1,
        optionsPerGame: 0,
        timesToLearn: 5
    },
    {
        name: 'LexiSense',
        desc: 'Define & Conquer.Match words with their meanings intuitively.',
        imgUrl: 'select_definition',
        id: 'select_definition',
        type: graphql_1.Game.SelectDef,
        wordsPerGame: 6,
        minWords: 1,
        optionsPerGame: 6,
        timesToLearn: 5
    },
    {
        name: 'Definify: Match & Learn',
        desc: 'Associate definitions with the right words. A captivating word puzzle adventure!',
        imgUrl: 'select_word',
        id: 'select_word',
        type: graphql_1.Game.SelectWord,
        wordsPerGame: 6,
        minWords: 1,
        optionsPerGame: 6,
        timesToLearn: 5
    },
    {
        name: 'WordRecall: Define & Type',
        desc: 'Type words matching given definitions. Boost vocabulary in engaging rounds!',
        imgUrl: 'type_word',
        id: 'type_word',
        type: graphql_1.Game.TypeWord,
        wordsPerGame: 6,
        minWords: 1,
        optionsPerGame: 0,
        timesToLearn: 5
    }
    // {
    //   name: 'find all definitions',
    //   desc: 'Match the word and all its definitions',
    //   imgUrl: 'find_defs',
    //   id: 'select_defs'
    // }
];
//# sourceMappingURL=games.js.map