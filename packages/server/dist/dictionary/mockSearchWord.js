"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mockSearchWord = exports.mockFetchWord = void 0;
const egalitarian_1 = require("./mocks/egalitarian");
const rubber_1 = require("./mocks/rubber");
const pussy_1 = require("./mocks/pussy");
const heart_1 = require("./mocks/heart");
const wheel_1 = require("./mocks/wheel");
const idioma_1 = require("./mocks/idioma");
const hola_1 = require("./mocks/hola");
const fowl_1 = require("./mocks/fowl");
const caerse_1 = require("./mocks/caerse");
const murther_1 = require("./mocks/murther");
const voluminous_1 = require("./mocks/voluminous");
const graphql_1 = require("../generated/graphql");
const formatData_1 = require("./formatData");
const mockWords = {
    egalitarian: egalitarian_1.default,
    rubber: rubber_1.default,
    pussy: pussy_1.default,
    heart: heart_1.default,
    wheel: wheel_1.default,
    voluminous: voluminous_1.default,
    fowl: fowl_1.default,
    murther: murther_1.default,
    notFound: []
};
const mockSpanishWords = {
    idioma: idioma_1.default,
    hola: hola_1.default,
    caerse: caerse_1.default
};
const mockSuggestions = {
    [graphql_1.Language.English]: [
        'Mocking is enabled. You can query words from the list: egalitarian, rubber, pussy, heart, wheel, voluminous, fowl, murther, or notFound to receive an empty array as a result'
    ],
    [graphql_1.Language.Spanish]: [
        'Mocking is enabled. You can query words from the list: idioma, hola, caerse'
    ]
};
async function mockFetchWord(query, language = graphql_1.Language.English) {
    let result = [];
    if (!query) {
        return [];
    }
    const mock = language === graphql_1.Language.Spanish ? mockSpanishWords : mockWords;
    // @ts-ignore
    result = mock[query];
    if (result) {
        return result;
    }
    return mockSuggestions[language];
}
exports.mockFetchWord = mockFetchWord;
async function mockSearchWord(query, language) {
    const words = await mockFetchWord(query, language);
    // @ts-ignore
    return (0, formatData_1.formatData)(words);
}
exports.mockSearchWord = mockSearchWord;
//# sourceMappingURL=mockSearchWord.js.map