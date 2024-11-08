import { Game } from '../generated/graphql';
import { GameConfigType } from '../types/types';
export const games: GameConfigType[] = [
  {
    name: 'audio',
    desc: 'Type the word that you hear',
    type: Game.Audio
  },
  {
    name: 'select definition',
    desc: 'Match the word and its definition',
    type: Game.SelectDef
  },
  {
    name: 'select word',
    desc: 'Match the definition and the word',
    type: Game.SelectWord
  },
  {
    name: 'type word',
    desc: 'Type the word that has the definition given',
    type: Game.TypeWord
  }
];
