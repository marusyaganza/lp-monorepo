// import { Language } from '../../../src/generated/graphql';

import { Language, NewWordInput } from '../../../src/generated/graphql';

export const simpleSearchResult: Record<Language, Partial<NewWordInput>> = {
  [Language.English]: {
    transcription: 'və-ˈlü-mə-nəs',
    stems: ['voluminous', 'voluminously', 'voluminousness', 'voluminousnesses'],
    particle: 'adjective',
    name: 'voluminous',
    isOffensive: false,
    defs: [
      {
        examples: [
          {
            text: 'trying to keep track of <i>voluminous</i> slips of paper'
          }
        ],
        def: 'numerous'
      },
      {
        examples: [
          {
            text: 'a <i>voluminous</i> correspondent'
          }
        ],
        def: 'writing or speaking much or at great length'
      },
      {
        def: 'consisting of many folds, coils, or convolutions winding'
      }
    ],
    audioUrl:
      'https://media.merriam-webster.com/audio/prons/en/us/mp3/v/volumi02.mp3',
    shortDef: [
      'having or marked by great volume or bulk : large; also : full',
      'numerous',
      'filling or capable of filling a large volume or several volumes'
    ]
  },
  [Language.Spanish]: {
    transcription: 'hola',
    stems: ['hola'],
    particle: 'interjection',
    name: 'hola',
    defs: [
      {
        def: 'hello!, hi!'
      }
    ],
    audioUrl:
      'https://media.merriam-webster.com/audio/prons/es/me/mp3/h/hola001sp.mp3',
    shortDef: ['hello!, hi!']
  }
};
