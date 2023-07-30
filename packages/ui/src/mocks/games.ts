import { Game, GameConfig } from '../generated/graphql';
export const games: GameConfig[] = [
  // {
  //   name: 'flash cards',
  //   desc: 'Check if you can recall your words',
  //   imgUrl: 'flash_cards',
  //   id: 'flash_cards'
  // },
  {
    name: 'audio',
    desc: 'Type the word that you hear',
    imgUrl: 'audio',
    id: 'audio',
    type: Game.Audio,
    wordsPerGame: 6,
    optionsPerGame: 0
  },
  {
    name: 'select definition',
    desc: 'Match the word and its definition',
    imgUrl: 'select_definition',
    id: 'select_definition',
    type: Game.SelectDef,
    wordsPerGame: 6,
    optionsPerGame: 6
  },
  {
    name: 'select word',
    desc: 'Match the definition and the word',
    imgUrl: 'select_word',
    id: 'select_word',
    type: Game.SelectWord,
    wordsPerGame: 6,
    optionsPerGame: 6
  },
  {
    name: 'type word',
    desc: 'Type the word that has the definition given',
    imgUrl: 'type_word',
    id: 'type_word',
    type: Game.TypeWord,
    wordsPerGame: 6,
    optionsPerGame: 0
  }
  // {
  //   name: 'find all definitions',
  //   desc: 'Match the word and all its definitions',
  //   imgUrl: 'find_defs',
  //   id: 'select_defs'
  // }
];
