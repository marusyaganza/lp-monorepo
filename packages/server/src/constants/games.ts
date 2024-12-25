import { Game, GameConfig, Language } from '../generated/graphql';
export const GAMES: GameConfig[] = [
  {
    name: 'WordEcho',
    id: 'audio',
    desc: 'Listen, Type, Master. Sharpen language skills through auditory engagement.',
    type: Game.Audio,
    orderNum: 0,
    languages: [Language.English, Language.Spanish]
  },
  {
    name: 'LexiSense',
    desc: 'Define & Conquer.Match words with their meanings intuitively.',
    id: 'select_definition',
    type: Game.SelectDef,
    orderNum: 1,
    languages: [Language.English, Language.Spanish]
  },
  {
    name: 'Definify: Match & Learn',
    desc: 'Associate definitions with the right words. A captivating word puzzle adventure!',
    id: 'select_word',
    type: Game.SelectWord,
    orderNum: 2,
    languages: [Language.English, Language.Spanish]
  },
  {
    name: 'WordRecall: Define & Type',
    desc: 'Type words matching given definitions. Boost vocabulary in engaging rounds!',
    id: 'type_word',
    type: Game.TypeWord,
    orderNum: 3,
    languages: [Language.English, Language.Spanish]
  },
  {
    name: 'Conjugation Quest',
    desc: 'Master verb conjugations across tenses and languages in fast-paced, interactive challenges!',
    id: 'conjugation',
    type: Game.Conjugation,
    orderNum: 4,
    languages: [Language.Spanish]
  },
  {
    name: 'GenderWord Challenge',
    desc: 'Choose nouns and match their gender. Test linguistic skills in thrilling rounds!',
    id: 'gender',
    type: Game.Gender,
    orderNum: 5,
    languages: [Language.Spanish]
  }
];
