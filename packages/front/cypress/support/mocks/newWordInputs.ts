import { Language, NewWordInput } from '../../../src/generated/graphql';

export const shortOffensiveWord: Record<Language, Partial<NewWordInput>> = {
  [Language.English]: {
    stems: ['sore loser'],
    particle: 'noun',
    name: 'sore loser',
    isOffensive: true,
    defs: [
      {
        examples: [
          {
            text: 'After losing the chess match, Jake refused to shake hands with his opponent and stormed out of the room. Everyone agreed he was being a real sore loser.'
          },
          {
            text: 'Even though Sarah put up a good fight, she accused the judges of being biased when she didn’t win. It was hard not to see her as a sore loser.'
          }
        ],
        def: 'a person who becomes very upset or angry when he or she loses a game, contest, etc.'
      }
    ],
    shortDef: [
      'a person who becomes very upset or angry when he or she loses a game, contest, etc.'
    ]
  },
  [Language.Spanish]: {
    name: 'rápidamente',
    defs: [
      {
        def: 'In a fast or quick manner.',
        examples: [
          {
            text: 'Ella terminó su trabajo rápidamente.',
            translation: 'She finished her work quickly.'
          }
        ]
      }
    ],
    particle: 'adverb',
    isOffensive: true,
    stems: ['rápido'],
    shortDef: ['Quickly.', 'rapidly']
  }
};

export const fullWord: Record<Language, Partial<NewWordInput>> = {
  [Language.English]: {
    name: 'appliance',
    defs: [
      {
        def: 'a machine that is designed to do a particular thing in the home, such as preparing food, heating or cleaning',
        examples: [
          { text: 'electrical/household appliances' },
          { text: 'modern heating appliances of all types' }
        ]
      },
      {
        def: 'information appliance',
        examples: [
          {
            text: 'A growing number of companies are coming up with ways [in 2000] to turn ordinary phones into Internet appliances.'
          },
          {
            text: 'They sell a wide range of domestic appliances—washing machines, dishwashers and so on.'
          }
        ]
      },
      {
        def: 'compliance'
      }
    ],
    particle: 'noun',
    imgUrl:
      'https://www.oxfordlearnersdictionaries.com/media/english/fullsize/k/kit/kitch/kitchen_appliances.png',
    imgDesc: 'kitchen appliences',
    audioUrl:
      'https://media.merriam-webster.com/audio/prons/en/us/mp3/a/applia01.mp3',
    additionalInfo: 'This is very important word',
    transcription: 'ə-ˈplī-ən(t)s',
    isOffensive: false,
    stems: ['appliance', 'appliances'],
    shortDef: [
      'a machine that is designed to do a particular thing in the home, such as preparing food, heating or cleaning',
      'a piece of equipment for adapting a tool or machine to a special purpose : attachment',
      'an instrument or device designed for a particular use or function; specifically : a household or office device (such as a stove, fan, or refrigerator) operated by gas or electric current'
    ]
  },
  [Language.Spanish]: {
    name: 'correr',
    defs: [
      {
        def: 'To move quickly using your feet.',
        examples: [
          {
            text: 'Él puede correr muy rápido.',
            translation: 'He can run very fast.'
          }
        ]
      }
    ],
    particle: 'verb',
    imgUrl: 'https://example.com/images/correr.jpg',
    imgDesc: 'A person running in a park.',
    audioUrl: 'https://example.com/audio/correr.mp3',
    additionalInfo: 'Running is a very complete exercise.',
    transcription: '[koˈreɾ]',
    isOffensive: false,
    stems: ['corro', 'corres', 'corremos'],
    shortDef: ['To run.'],
    alternativeSpelling: ['korrer']
  }
};

export const wordWithTag: Record<Language, Partial<NewWordInput>> = {
  [Language.English]: {
    name: 'icky',
    defs: [
      {
        def: 'offensive to the senses or sensibilities distasteful',
        examples: [
          {
            text: 'put off by her icky triteness',
            translation: null
          },
          {
            text: 'It was the fat kid. “Those hamburgers,” he said. “They were just icky."',
            translation: null
          }
        ]
      }
    ],
    particle: 'adjective',
    audioUrl:
      'https://media.merriam-webster.com/audio/prons/en/us/mp3/i/icky0001.mp3',
    transcription: 'ˈi-kē',
    isOffensive: false,
    stems: ['ickier', 'ickiest', 'ickiness', 'ickinesses', 'icky'],
    shortDef: ['offensive to the senses or sensibilities : distasteful'],
    alternativeSpelling: [],
    tags: ['Tag1']
  },
  [Language.Spanish]: {
    name: 'grande',
    defs: [
      {
        def: 'Of large size or magnitude.',
        examples: [
          {
            text: 'La casa es muy grande.',
            translation: 'The house is very big.'
          }
        ]
      }
    ],
    particle: 'adjective',
    imgUrl: 'https://example.com/images/grande.jpg',
    imgDesc: 'A large house in the countryside.',
    audioUrl: 'https://example.com/audio/grande.mp3',
    additionalInfo: 'Used to describe physical size.',
    transcription: '[ˈɡɾan.de]',
    stems: ['grandes'],
    shortDef: ['Big, large.'],
    alternativeSpelling: [],
    tags: ['Etiqueta2']
  }
};

export const minNewWord: Record<Language, Partial<NewWordInput>> = {
  [Language.English]: {
    name: 'fall short',
    particle: 'phrase',
    defs: [
      {
        def: 'to fail to reach the standard that you expected or need',
        examples: [{ text: "Taylor's solution falls short of the mark." }]
      }
    ],
    shortDef: ['to fail to meet expectations']
  },
  [Language.Spanish]: {
    name: 'felicidad',
    defs: [
      {
        def: 'The state of being happy or content.'
      }
    ],
    particle: 'noun',
    shortDef: ['Happiness.']
  }
};
// : Record<
//   Language,
//   Omit<NewWordInput, 'language'>
// >
export const wordWithAltSpelling = {
  [Language.English]: {
    name: 'long haul',
    defs: [
      {
        def: 'a long\ndistance',
        examples: [
          {
            text: 'The\nvast majority of\nnew companies fail over the long haul.'
          }
        ]
      }
    ],
    particle: 'noun',
    audioUrl:
      'https://media.merriam-webster.com/audio/prons/en/us/mp3/w/wheel001.mp3',
    transcription: 'long haul',
    imgUrl: 'https://cdn.langeek.co/photo/49478/original/airplane?type=jpeg',
    isOffensive: false,
    stems: ['long haul'],
    shortDef: ['a long distance'],
    alternativeSpelling: ['long-haul']
  },
  [Language.Spanish]: {
    name: 'cacahuate',
    audioUrl:
      'https://media.merriam-webster.com/audio/prons/es/me/mp3/i/idiom01sp.mp3',
    defs: [
      {
        def: 'a low-branching widely\ncultivated annual herb (Arachis hypogaea) of\nthe legume family with showy yellow flowers having a peduncle which elongates and bends into the soil where the ovary ripens into a pod containing one to three oily edible seeds',
        examples: [
          {
            text: 'Los\nmás comunes son la soja,\nmaíz, canola y cacahuate.',
            translation:
              'The most common are soybeans, corn, canola and peanut.'
          }
        ]
      }
    ],
    particle: 'noun',
    imgUrl: 'https://cdn.langeek.co/photo/14641/original/peanut?type=jpeg',
    shortDef: ['Peanut.'],
    alternativeSpelling: ['cacahuete']
  }
};

export const correctDefs = {
  [Language.English]: {
    defs: [
      {
        def: 'a long distance',
        examples: [
          {
            text: 'The vast majority of new companies fail over the long haul.'
          }
        ]
      }
    ]
  },
  [Language.Spanish]: {
    defs: [
      {
        def: 'a low-branching widely cultivated annual herb (Arachis hypogaea) of the legume family with showy yellow flowers having a peduncle which elongates and bends into the soil where the ovary ripens into a pod containing one to three oily edible seeds',
        examples: [
          {
            text: 'Los más comunes son la soja, maíz, canola y cacahuate.',
            translation:
              'The most common are soybeans, corn, canola and peanut.'
          }
        ]
      }
    ]
  }
};
