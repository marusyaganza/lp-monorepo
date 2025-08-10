import { Game } from '../generated/graphql';
import { GameConfigType } from '../types/types';
export const games: GameConfigType[] = [
  {
    name: 'audio',
    desc: 'Type the word that you hear',
    type: Game.Audio,
    wordsToPractice: 1
  },
  {
    name: 'select definition',
    desc: 'Match the word and its definition',
    type: Game.SelectDef,
    wordsToPractice: 1
  },
  {
    name: 'select word',
    desc: 'Match the definition and the word',
    type: Game.SelectWord,
    wordsToPractice: 2
  },
  {
    name: 'type word',
    desc: 'Type the word that has the definition given',
    type: Game.TypeWord,
    wordsToPractice: 1
  },
  {
    name: 'PictureWord Blitz',
    desc: 'Identify objects from pictures and type their names to enhance vocabulary skills!',
    type: Game.Image,
    wordsToPractice: 65
  },
  {
    name: 'Conjugation Quest',
    desc: 'Master verb conjugations across tenses and languages in fast-paced, interactive challenges!',
    type: Game.Conjugation,
    wordsToPractice: 100
  },
  {
    name: 'GenderWord Challenge',
    desc: 'Choose nouns and match their gender. Test linguistic skills in thrilling rounds!',
    type: Game.Gender,
    wordsToPractice: 12
  },
  {
    name: 'VoiceWord Challenge',
    desc: 'Speak words from clues and images. Sharpen your vocabulary and speaking skills fast!',
    type: Game.Speaking,
    wordsToPractice: 1
  }
];
