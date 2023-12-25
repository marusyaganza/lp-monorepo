"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateGameData = exports.insertAnswer = exports.generateOptions = exports.prepareDef = exports.getExamples = exports.generateRandomNumber = void 0;
const graphql_1 = require("../generated/graphql");
const apolloCustomErrors_1 = require("./apolloCustomErrors");
const madeUpWord_1 = require("../mocks/madeUpWord");
const tasks = {
    [graphql_1.Game.Audio]: "Type the word that you've heard",
    [graphql_1.Game.SelectDef]: 'Select a definition that means ',
    [graphql_1.Game.SelectWord]: 'Select a word that means ',
    [graphql_1.Game.TypeWord]: 'Type a word that means '
};
function generateRandomNumber(limit) {
    return Math.floor(Math.random() * limit);
}
exports.generateRandomNumber = generateRandomNumber;
function getExamples(defs) {
    if (!Array.isArray(defs)) {
        return;
    }
    return defs
        .reduce((acc, curr) => {
        const examples = curr?.examples;
        if (examples && Array.isArray(examples)) {
            return acc?.concat(examples);
        }
        return acc;
    }, [])
        ?.filter(Boolean);
}
exports.getExamples = getExamples;
/**Replaces word's `name` in `def` with `[...]` block
 * required to exclude the answer from the question
 */
function prepareDef(def, name) {
    if (!def || !name) {
        return '';
    }
    const replacement = ' [...] ';
    const word = name.toLocaleLowerCase();
    let result = def.replaceAll(new RegExp(` ${word} `, 'gi'), replacement);
    if (result.toLocaleLowerCase().startsWith(`${word} `)) {
        result = result.replace(new RegExp(`${word} `, 'i'), replacement).trim();
    }
    if (result.toLocaleLowerCase().endsWith(` ${word}`)) {
        result = result.replace(new RegExp(` ${word}`, 'i'), replacement).trim();
    }
    return result;
}
exports.prepareDef = prepareDef;
function generateOptions(data, count, currentWordId, language) {
    const moreOptions = madeUpWord_1.madeUphWords[language];
    let optCandidates = data.filter(word => word.id !== currentWordId);
    const result = [];
    if (optCandidates.length + moreOptions.length < count) {
        throw new apolloCustomErrors_1.OperationResolutionError(`Not enough words to generate options.`);
    }
    if (optCandidates.length < count) {
        const opts = moreOptions.slice(0, count - optCandidates.length);
        optCandidates = [...optCandidates, ...opts];
    }
    const randomIndexes = [];
    do {
        const randomIndex = generateRandomNumber(optCandidates.length);
        const randomWord = optCandidates[randomIndex];
        if (randomWord &&
            randomWord?.id !== currentWordId &&
            !randomIndexes.includes(randomIndex)) {
            randomIndexes.push(randomIndex);
            result.push(randomWord);
        }
    } while (result.length < count);
    return result;
}
exports.generateOptions = generateOptions;
function insertAnswer(data, answer) {
    const result = [...data];
    const randomIndex = generateRandomNumber(data.length + 1);
    result.splice(randomIndex, 0, answer);
    return result;
}
exports.insertAnswer = insertAnswer;
// @ts-ignore
const generateGameData = (gameType, data, config) => {
    let questions;
    const { optionsPerGame, wordsPerGame, minWords } = config;
    let wordsCandidates = data;
    if (gameType === graphql_1.Game.Audio) {
        wordsCandidates = data.filter(word => word.audioUrl);
    }
    if (wordsCandidates.length < minWords) {
        throw new apolloCustomErrors_1.OperationResolutionError(`Not enough words to start a game. You have ${wordsCandidates.length} words${gameType === graphql_1.Game.Audio ? ' with audio' : ''}. Words requited for the game: ${minWords}`);
    }
    //TODO uncomment this if I decide to implement find def game with words with single defs only
    // if (gameType === Game.SelectDef) {
    //   wordsCandidates = data.filter(word => word.shortDef.length === 1);
    // }
    const words = wordsCandidates.slice(0, wordsPerGame);
    if (gameType === graphql_1.Game.TypeWord) {
        questions = words.map(word => {
            const { name, shortDef, id, audioUrl, imgUrl, defs } = word;
            const examples = getExamples(defs);
            const question = shortDef.map(def => prepareDef(def, name));
            return {
                answer: name,
                wordId: id,
                question,
                additionalInfo: {
                    audioUrl,
                    imgUrl,
                    examples
                }
            };
        });
    }
    if (gameType === graphql_1.Game.Audio) {
        questions = words.map(word => {
            const { name, audioUrl, id, defs, imgUrl, shortDef } = word;
            const examples = getExamples(defs);
            return {
                answer: name,
                question: [audioUrl],
                wordId: id,
                additionalInfo: {
                    imgUrl,
                    examples,
                    shortDef: `<b>${name} means</b> ${shortDef[0]}`
                }
            };
        });
    }
    //TODO create 'find all defs' game to train the words with multiple definitions
    if (gameType === graphql_1.Game.SelectDef) {
        questions = words.map(word => {
            const { name, shortDef, id, audioUrl, language, defs, imgUrl } = word;
            const opts = generateOptions(data, optionsPerGame - 1, id, language);
            const options = opts.map(opt => prepareDef(opt?.shortDef?.[0], name));
            const answer = prepareDef(shortDef[0], name);
            const examples = getExamples(defs);
            return {
                //TODO: filter the words so only ones with single definition will remain
                answer,
                question: [name],
                wordId: id,
                options: insertAnswer(options, answer),
                additionalInfo: {
                    audioUrl,
                    examples,
                    imgUrl
                }
            };
        });
    }
    if (gameType === graphql_1.Game.SelectWord) {
        questions = words.map(word => {
            const { name, shortDef, id, audioUrl, language, defs, imgUrl } = word;
            const opts = generateOptions(data, optionsPerGame - 1, id, language);
            const options = opts.map(opt => opt.name);
            const answer = name;
            const examples = getExamples(defs);
            const question = shortDef.map(def => prepareDef(def, name));
            return {
                answer,
                question,
                wordId: id,
                // @ts-ignore
                options: insertAnswer(options, answer),
                additionalInfo: {
                    audioUrl,
                    examples,
                    imgUrl
                }
            };
        });
    }
    return {
        task: tasks[config.type],
        type: gameType,
        questions
    };
};
exports.generateGameData = generateGameData;
//# sourceMappingURL=generateGameData.js.map