import { Game, Language, SettingsByGame } from '../generated/graphql';

export const DEFAULT_GAMES_SETTINGS: SettingsByGame = {
  [Game.Audio]: {
    wordsPerGame: 6,
    minWords: 1,
    optionsPerGame: 0,
    timesToLearn: 5,
    languages: [Language.English, Language.Spanish]
  },
  [Game.Image]: {
    wordsPerGame: 6,
    minWords: 1,
    optionsPerGame: 0,
    timesToLearn: 5,
    languages: [Language.English, Language.Spanish]
  },
  [Game.Speaking]: {
    wordsPerGame: 6,
    minWords: 1,
    optionsPerGame: 0,
    timesToLearn: 5,
    languages: [Language.English, Language.Spanish]
  },
  [Game.TypeWord]: {
    wordsPerGame: 6,
    minWords: 1,
    optionsPerGame: 0,
    timesToLearn: 5,
    languages: [Language.English, Language.Spanish]
  },
  [Game.SelectDef]: {
    wordsPerGame: 6,
    minWords: 1,
    optionsPerGame: 6,
    timesToLearn: 5,
    languages: [Language.English, Language.Spanish]
  },
  [Game.SelectWord]: {
    wordsPerGame: 6,
    minWords: 1,
    optionsPerGame: 6,
    timesToLearn: 5,
    languages: [Language.English, Language.Spanish]
  },
  [Game.Conjugation]: {
    wordsPerGame: 2,
    minWords: 1,
    optionsPerGame: 0,
    timesToLearn: 5,
    languages: [Language.Spanish]
  },
  [Game.Gender]: {
    wordsPerGame: 6,
    minWords: 1,
    optionsPerGame: 0,
    timesToLearn: 5,
    languages: [Language.Spanish]
  }
};
