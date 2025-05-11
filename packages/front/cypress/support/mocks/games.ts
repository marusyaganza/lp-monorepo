import { Game, Language } from '../../../src/generated/graphql';

export const games = [
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
    id: 'select_def',
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
    name: 'PictureWord Blitz',
    desc: 'Identify objects from pictures and type their names to enhance vocabulary skills!',
    id: 'image',
    type: Game.Image,
    wordsPerGame: 6,
    minWords: 1,
    optionsPerGame: 0,
    timesToLearn: 5,
    orderNum: 4,
    languages: [Language.English, Language.Spanish]
  },
  {
    name: 'VoiceWord Challenge',
    desc: 'Speak words from clues and images. Sharpen your vocabulary and speaking skills fast!',
    id: 'speaking',
    type: Game.Speaking,
    orderNum: 5,
    languages: [Language.English, Language.Spanish]
  },
  {
    name: 'Conjugation Quest',
    desc: 'Master verb conjugations across tenses and languages in fast-paced, interactive challenges!',
    id: 'conjugate',
    type: Game.Conjugation,
    wordsPerGame: 2,
    minWords: 1,
    optionsPerGame: 0,
    timesToLearn: 5,
    orderNum: 5,
    languages: [Language.Spanish]
  },
  {
    name: 'GenderWord Challenge',
    desc: 'Choose nouns and match their gender. Test linguistic skills in thrilling rounds!',
    id: 'gender',
    type: Game.Gender,
    wordsPerGame: 5,
    minWords: 1,
    optionsPerGame: 0,
    timesToLearn: 5,
    orderNum: 6,
    languages: [Language.Spanish]
  }
];
