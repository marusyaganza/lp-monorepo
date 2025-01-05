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
  },
  {
    name: 'PictureWord Blitz',
    desc: 'Identify objects from pictures and type their names to enhance vocabulary skills!',
    type: Game.Image
  },
  {
    name: 'Conjugation Quest',
    desc: 'Master verb conjugations across tenses and languages in fast-paced, interactive challenges!',
    type: Game.Conjugation
  },
  {
    name: 'GenderWord Challenge',
    desc: 'Choose nouns and match their gender. Test linguistic skills in thrilling rounds!',
    type: Game.Gender
  }
];
