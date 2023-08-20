import { Game, GameConfig } from '../generated/graphql';
export const games: GameConfig[] = [
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
    type: Game.Audio,
    wordsPerGame: 6,
    minWords: 1,
    optionsPerGame: 0
  },
  {
    name: 'LexiSense',
    desc: 'Define & Conquer.Match words with their meanings intuitively.',
    imgUrl: 'select_definition',
    id: 'select_definition',
    type: Game.SelectDef,
    wordsPerGame: 6,
    minWords: 1,
    optionsPerGame: 6
  },
  {
    name: 'Definify: Match & Learn',
    desc: 'Associate definitions with the right words. A captivating word puzzle adventure!',
    imgUrl: 'select_word',
    id: 'select_word',
    type: Game.SelectWord,
    wordsPerGame: 6,
    minWords: 1,
    optionsPerGame: 6
  },
  {
    name: 'WordRecall: Define & Type',
    desc: 'Type words matching given definitions. Boost vocabulary in engaging rounds!',
    imgUrl: 'type_word',
    id: 'type_word',
    type: Game.TypeWord,
    wordsPerGame: 6,
    minWords: 1,
    optionsPerGame: 0
  }
  // {
  //   name: 'find all definitions',
  //   desc: 'Match the word and all its definitions',
  //   imgUrl: 'find_defs',
  //   id: 'select_defs'
  // }
];
