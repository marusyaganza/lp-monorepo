import { Game, Language } from '../../../src/generated/graphql';

export const DEFAULT_GAMES_SETTINGS = {
  [Game.Audio]: {
    wordsPerGame: 6,
    minWords: 1,
    optionsPerGame: 0,
    timesToLearn: 5,
    orderNum: 0,
    languages: [Language.English, Language.Spanish]
  },
  [Game.TypeWord]: {
    wordsPerGame: 6,
    minWords: 1,
    optionsPerGame: 0,
    timesToLearn: 5,
    orderNum: 1,
    languages: [Language.English, Language.Spanish]
  },
  [Game.SelectDef]: {
    wordsPerGame: 6,
    minWords: 1,
    optionsPerGame: 6,
    timesToLearn: 5,
    orderNum: 2,
    languages: [Language.English, Language.Spanish]
  },
  [Game.SelectWord]: {
    wordsPerGame: 6,
    minWords: 1,
    optionsPerGame: 6,
    timesToLearn: 5,
    orderNum: 3,
    languages: [Language.English, Language.Spanish]
  },
  [Game.Image]: {
    wordsPerGame: 6,
    minWords: 1,
    optionsPerGame: 0,
    timesToLearn: 5,
    orderNum: 4,
    languages: [Language.English, Language.Spanish]
  },
  [Game.Conjugation]: {
    wordsPerGame: 2,
    minWords: 1,
    optionsPerGame: 0,
    timesToLearn: 5,
    orderNum: 5,
    languages: [Language.Spanish]
  },
  [Game.Gender]: {
    wordsPerGame: 5,
    minWords: 1,
    optionsPerGame: 0,
    timesToLearn: 5,
    orderNum: 6,
    languages: [Language.Spanish]
  }
};
