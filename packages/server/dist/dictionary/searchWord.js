"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchWord = exports.fetchWord = void 0;
const graphql_1 = require("../generated/graphql");
const formatData_1 = require("./formatData");
const { DICTIONARY_API_URI, DICTIONARY_API_KEY, DICTIONARY_SPANISH_API_KEY, DICTIONARY_SPANISH_API_URI, DICTIONARY_THESAURUS_URI, DICTIONARY_THESAURUS_KEY } = process.env;
const API = {
    spanish: {
        key: DICTIONARY_SPANISH_API_KEY,
        uri: DICTIONARY_SPANISH_API_URI
    },
    collegiate: {
        key: DICTIONARY_API_KEY,
        uri: DICTIONARY_API_URI
    },
    thesaurus: {
        key: DICTIONARY_THESAURUS_KEY,
        uri: DICTIONARY_THESAURUS_URI
    }
};
var Dictionary;
(function (Dictionary) {
    Dictionary["COLLEGIATE"] = "collegiate";
    Dictionary["SPANISH"] = "spanish";
})(Dictionary || (Dictionary = {}));
const DICTIONARIES = {
    [graphql_1.Language.Spanish]: Dictionary.SPANISH,
    [graphql_1.Language.English]: Dictionary.COLLEGIATE
};
async function fetchWord(query, dictionary) {
    let result = [];
    if (!query) {
        return [];
    }
    const uri = `${API[dictionary].uri}/${query}?key=${API[dictionary].key}`;
    await fetch(uri)
        .then(res => res.json())
        .then(res => {
        result = res;
    })
        .catch(err => {
        console.error('dictionary fetch error', err);
    });
    return result;
}
exports.fetchWord = fetchWord;
async function searchWord(query, language = graphql_1.Language.English) {
    const words = await fetchWord(query, DICTIONARIES[language]);
    // @ts-ignore
    return (0, formatData_1.formatData)(words);
}
exports.searchWord = searchWord;
//# sourceMappingURL=searchWord.js.map