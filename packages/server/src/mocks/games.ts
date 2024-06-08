import { Game, Language } from '../generated/graphql';
import { GameConfigType } from 'db/schema/Game';
export const games: GameConfigType[] = [
  // {
  //   name: 'flash cards',
  //   desc: 'Check if you can recall your words',
  //   imgUrl: 'flash_cards',
  //   id: 'flash_cards'
  // },
  {
    name: 'WordEcho',
    desc: 'Listen, Type, Master. Sharpen language skills through auditory engagement.',
    id: 'audio',
    type: Game.Audio,
    wordsPerGame: 6,
    minWords: 1,
    optionsPerGame: 0,
    timesToLearn: 5,
    orderNum: 0,
    languages: [Language.English, Language.Spanish]
  },
  {
    name: 'LexiSense',
    desc: 'Define & Conquer.Match words with their meanings intuitively.',
    id: 'select_definition',
    type: Game.SelectDef,
    wordsPerGame: 6,
    minWords: 1,
    optionsPerGame: 6,
    timesToLearn: 5,
    orderNum: 1,
    languages: [Language.English, Language.Spanish]
  },
  {
    name: 'Definify: Match & Learn',
    desc: 'Associate definitions with the right words. A captivating word puzzle adventure!',
    id: 'select_word',
    type: Game.SelectWord,
    wordsPerGame: 6,
    minWords: 1,
    optionsPerGame: 6,
    timesToLearn: 5,
    orderNum: 2,
    languages: [Language.English, Language.Spanish]
  },
  {
    name: 'WordRecall: Define & Type',
    desc: 'Type words matching given definitions. Boost vocabulary in engaging rounds!',
    id: 'type_word',
    type: Game.TypeWord,
    wordsPerGame: 6,
    minWords: 1,
    optionsPerGame: 0,
    timesToLearn: 5,
    orderNum: 3,
    languages: [Language.English, Language.Spanish]
  },
  {
    name: 'Conjugation',
    desc: 'Conjugate verbs!',
    id: 'conjugation',
    type: Game.Conjugation,
    wordsPerGame: 2,
    minWords: 1,
    optionsPerGame: 0,
    timesToLearn: 5,
    orderNum: 4,
    languages: [Language.Spanish]
  }
  // {
  //   name: 'find all definitions',
  //   desc: 'Match the word and all its definitions',
  //   imgUrl: 'find_defs',
  //   id: 'select_defs'
  // }
];
