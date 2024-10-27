import { Game, GameConfig } from '../generated/graphql';
export const games: Partial<GameConfig>[] = [
  // {
  //   name: 'flash cards',
  //   desc: 'Check if you can recall your words',
  //   id: 'flash_cards'
  // },
  {
    name: 'audio',
    desc: 'Type the word that you hear',
    id: 'audio',
    type: Game.Audio,
    wordsPerGame: 6,
    optionsPerGame: 0
  },
  {
    name: 'select definition',
    desc: 'Match the word and its definition',
    id: 'select_definition',
    type: Game.SelectDef,
    wordsPerGame: 6,
    optionsPerGame: 6
  },
  {
    name: 'select word',
    desc: 'Match the definition and the word',
    id: 'select_word',
    type: Game.SelectWord,
    wordsPerGame: 6,
    optionsPerGame: 6
  },
  {
    name: 'type word',
    desc: 'Type the word that has the definition given',
    id: 'type_word',
    type: Game.TypeWord,
    wordsPerGame: 6,
    optionsPerGame: 0
  }
  // {
  //   name: 'find all definitions',
  //   desc: 'Match the word and all its definitions',
  //   id: 'select_defs'
  // }
];
