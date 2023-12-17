import { Word, Level, Language } from '../generated/graphql';
import egalitarianImg from './egalitarian.svg';

export const words: Word[] = [
  {
    uuid: '74046e79-e4c9-4b52-ac96-cb7ae98fb601',
    id: 'mockid',
    name: 'egalitarian',
    imgUrl: egalitarianImg,
    isOffensive: false,
    language: Language.English,
    defs: [
      {
        def: 'a person who believes that everyone is equal and should have the same rights and opportunities',
        examples: [{ text: 'He described himself as ‘an <i>egalitarian</i>’.' }]
      },
      {
        def: 'aiming for equal wealth, status, etc., for all people',
        examples: [
          { text: 'He is a committed <i>egalitarian</i>' },
          {
            text: 'Even in the <i>egalitarian</i> Nordic country, Marin felt hergender and age sometimes received too much emphasis. Kostya Manenkov And Karl Ritter, USA TODAY, 21 Aug. 2022'
          }
        ]
      }
    ],
    particle: 'noun',
    level: Level.C1,
    stems: ['egalitarian', 'egalitarianism', 'egalitarians'],
    audioUrl:
      'https://www.oxfordlearnersdictionaries.com/media/english/uk_pron/e/ega/egali/egalitarian__gb_1.mp3',
    transcription: 'iˌɡælɪˈteəriən',
    user: '0',
    shortDef: ['aiming for equal wealth, status, etc., for all people'],
    createdAt: '1571213104370'
  },
  {
    uuid: '74046e79-e4c9-4b52-ac96-cb7ae98fb601',
    id: 'mockid',
    name: 'pussy',
    isOffensive: true,
    language: Language.English,
    defs: [
      {
        def: '<i>informal + offensive</i> a woman\u0027s sex organs <i>also</i> sexual intercourse with a woman'
      }
    ],
    particle: 'noun',
    level: Level.C1,
    stems: ['pussy', 'pussies'],
    transcription: '\u02c8p\u028asi',
    user: '0',
    createdAt: '1571213104370',
    shortDef: [
      'a cat or kitten : pussycat\u2014used especially by children or when talking to children'
    ]
  },
  {
    uuid: 'mockUuid',
    id: 'mockid',
    name: 'wheel',
    isOffensive: false,
    language: Language.English,
    defs: [
      {
        def: 'made on a potter\u0027s wheel ',
        examples: [{ text: '<i>wheel-thrown</i> pottery' }]
      },
      {
        def: 'rotifer'
      }
    ],
    particle: 'noun',
    level: Level.A1,
    stems: ['pussy', 'pussies'],
    transcription: '\u02c8p\u028asi',
    user: '0',
    createdAt: '1571213104370',
    shortDef: [
      'a circular frame of hard material that may be solid, partly solid, or spoked and that is capable of turning on an axle',
      'a contrivance or apparatus having as its principal part a wheel: such as',
      'a chiefly medieval instrument of torture designed for mutilating a victim (as by stretching or disjointing)'
    ]
  }
];

export const spanishWords: Word[] = [
  {
    audioUrl: 'mock_audio_endpoint/es/me/mp3/i/idiom01sp.mp3',
    defs: [
      {
        def: 'language',
        examples: [
          { text: 'el idioma ingl\u00e9s', translation: 'the English language' }
        ]
      }
    ],
    isOffensive: false,
    language: Language.Spanish,
    name: 'idioma',
    particle: 'masculine noun',
    stems: ['idioma'],
    transcription: 'idioma',
    shortDef: ['language'],
    uuid: 'mockUuid2',
    id: 'mockId',
    user: '0',
    createdAt: '1571213104370'
  }
];

export const wheel: any[] = [
  {
    uuid: '4e2c10d5-173d-4401-9b21-08e8a8656431',
    transcription: 'ˈ(h)wēl',
    stems: ['wheel', 'wheelless', 'wheels'],
    particle: 'noun',
    name: 'wheel',
    isOffensive: false,
    imgUrl: 'https://merriam-webster.com/assets/mw/static/art/dict/wheel.gif',
    defs: [
      {
        examples: null,
        def: 'a circular frame of hard material that may be solid, partly solid, or spoked and that is capable of turning on an axle',
        __typename: 'WordDefinition'
      },
      {
        examples: [
          {
            text: '… drivers are expected to keep their hands on the <i>wheel</i> and remain attentive …',
            translation: null,
            __typename: 'DefExample'
          }
        ],
        def: 'see also behind the wheel',
        __typename: 'WordDefinition'
      },
      {
        examples: null,
        def: 'a recurring course, development, or action cycle',
        __typename: 'WordDefinition'
      },
      {
        examples: null,
        def: 'something (such as a round, flat cheese) resembling a wheel in shape',
        __typename: 'WordDefinition'
      },
      {
        examples: null,
        def: 'a rotation or turn usually about an axis or center',
        __typename: 'WordDefinition'
      },
      {
        examples: [
          {
            text: 'a big <i>wheel</i>',
            translation: null,
            __typename: 'DefExample'
          }
        ],
        def: 'a person of importance especially in an organization',
        __typename: 'WordDefinition'
      },
      {
        examples: null,
        def: 'the refrain or burden of a song',
        __typename: 'WordDefinition'
      },
      {
        examples: null,
        def: 'a sports league',
        __typename: 'WordDefinition'
      },
      {
        examples: null,
        def: 'a wheeled vehicle',
        __typename: 'WordDefinition'
      },
      {
        examples: null,
        def: 'legs',
        __typename: 'WordDefinition'
      }
    ],
    audioUrl:
      'https://media.merriam-webster.com/audio/prons/en/us/mp3/w/wheel001.mp3',
    additionalInfo: null,
    imgDesc:
      'wheel 1: <i>1</i> hub, <i>2</i> spoke, <i>3</i> felly, <i>4</i> tire',
    shortDef: [
      'a circular frame of hard material that may be solid, partly solid, or spoked and that is capable of turning on an axle',
      'a contrivance or apparatus having as its principal part a wheel: such as',
      'a chiefly medieval instrument of torture designed for mutilating a victim (as by stretching or disjointing)'
    ],
    language: 'ENGLISH'
  },
  {
    uuid: '4f3397ab-ab4b-467a-be85-f22253666a84',
    transcription: 'wheel',
    stems: [
      'wheel',
      'wheel and deal',
      'wheeled',
      'wheeled and dealed',
      'wheeling',
      'wheeling and dealing',
      'wheels',
      'wheels and deals'
    ],
    particle: 'verb',
    name: 'wheel',
    isOffensive: false,
    imgUrl: null,
    defs: [
      {
        examples: null,
        def: 'to turn on or as if on an axis revolve',
        __typename: 'WordDefinition'
      },
      {
        examples: [
          {
            text: 'the battalion would have <i>wheeled</i> to the flank',
            translation: null,
            __typename: 'DefExample'
          },
          {
            text: 'her mind will <i>wheel</i> around to the other extreme',
            translation: null,
            __typename: 'DefExample'
          },
          {
            text: '<i>wheeled</i> to face her opponent',
            translation: null,
            __typename: 'DefExample'
          }
        ],
        def: 'to change direction as if revolving on a pivot',
        __typename: 'WordDefinition'
      },
      {
        examples: [
          {
            text: 'birds in <i>wheeling</i> flight',
            translation: null,
            __typename: 'DefExample'
          },
          {
            text: 'valleys where young cotton <i>wheeled</i> slowly in fanlike rows',
            translation: null,
            __typename: 'DefExample'
          }
        ],
        def: 'to move or extend in a circle or curve',
        __typename: 'WordDefinition'
      },
      {
        examples: null,
        def: 'to travel on or as if on wheels or in a wheeled vehicle',
        __typename: 'WordDefinition'
      },
      {
        examples: null,
        def: 'to cause to turn on or as if on an axis rotate',
        __typename: 'WordDefinition'
      },
      {
        examples: [
          {
            text: '<i>wheeled</i> the patient back to his room',
            translation: null,
            __typename: 'DefExample'
          },
          {
            text: '<i>wheeled</i> the car into the driveway',
            translation: null,
            __typename: 'DefExample'
          },
          {
            text: '<i>wheel</i> in the experts',
            translation: null,
            __typename: 'DefExample'
          }
        ],
        def: 'to convey or move on or as if on wheels or in a wheeled vehicle',
        __typename: 'WordDefinition'
      },
      {
        examples: null,
        def: 'to cause to change direction as if revolving on a pivot',
        __typename: 'WordDefinition'
      },
      {
        examples: null,
        def: 'to make or perform in a circle or curve',
        __typename: 'WordDefinition'
      }
    ],
    audioUrl: null,
    additionalInfo: null,
    imgDesc: null,
    shortDef: [
      'to turn on or as if on an axis : revolve',
      'to change direction as if revolving on a pivot',
      'to move or extend in a circle or curve'
    ],
    language: 'ENGLISH'
  },
  {
    uuid: 'f65dcde8-88b5-4710-8b1a-7d9d0ff1445e',
    transcription: 'wheel and axle',
    stems: ['wheel and axle', 'wheel and axles'],
    particle: 'noun',
    name: 'wheel and axle',
    isOffensive: false,
    imgUrl: null,
    defs: [
      {
        examples: null,
        def: 'a mechanical device consisting of a grooved wheel turned by a cord or chain with a rigidly attached axle (as for winding up a weight) together with the supporting standards',
        __typename: 'WordDefinition'
      }
    ],
    audioUrl: null,
    additionalInfo: null,
    imgDesc: null,
    shortDef: [
      'a mechanical device consisting of a grooved wheel turned by a cord or chain with a rigidly attached axle (as for winding up a weight) together with the supporting standards'
    ],
    language: 'ENGLISH'
  },
  {
    uuid: 'e8b9c004-544f-4a1e-8014-3fffa6221c48',
    transcription: 'wheel animal',
    stems: ['wheel animal', 'wheel animals'],
    particle: 'noun',
    name: 'wheel animal',
    isOffensive: false,
    imgUrl: null,
    defs: [
      {
        examples: null,
        def: 'rotifer',
        __typename: 'WordDefinition'
      }
    ],
    audioUrl: null,
    additionalInfo: null,
    imgDesc: null,
    shortDef: ['rotifer'],
    language: 'ENGLISH'
  },
  {
    uuid: 'f9b7c27b-9126-4e0b-8668-162f034a3fed',
    transcription: 'wheel bug',
    stems: ['wheel bug', 'wheel bugs'],
    particle: 'noun',
    name: 'wheel bug',
    isOffensive: false,
    imgUrl: null,
    defs: [
      {
        examples: null,
        def: 'a large North American assassin bug (<i>Arilus cristatus</i>) that has a high serrated crest on its prothorax and preys on insects',
        __typename: 'WordDefinition'
      }
    ],
    audioUrl: null,
    additionalInfo: null,
    imgDesc: null,
    shortDef: [
      'a large North American assassin bug (Arilus cristatus) that has a high serrated crest on its prothorax and preys on insects'
    ],
    language: 'ENGLISH'
  },
  {
    uuid: '3919d4f6-4c50-4063-8162-9b10d1863754',
    transcription: 'wheel lock',
    stems: ['wheel lock', 'wheel locks'],
    particle: 'noun',
    name: 'wheel lock',
    isOffensive: false,
    imgUrl: null,
    defs: [
      {
        examples: null,
        def: "a gun's lock for a muzzle-loading firearm in which sparks are struck from a flint or a piece of pyrite by a revolving wheel",
        __typename: 'WordDefinition'
      }
    ],
    audioUrl: null,
    additionalInfo: null,
    imgDesc: null,
    shortDef: [
      "a gun's lock for a muzzle-loading firearm in which sparks are struck from a flint or a piece of pyrite by a revolving wheel"
    ],
    language: 'ENGLISH'
  },
  {
    uuid: 'b4b2f01c-7e82-45e0-98b9-1c9ab3052385',
    transcription: 'ˈ(h)wēl-ˌthrōn',
    stems: ['wheel-thrown'],
    particle: 'adjective',
    name: 'wheel-thrown',
    isOffensive: false,
    imgUrl: null,
    defs: [
      {
        examples: [
          {
            text: '<i>wheel-thrown</i> pottery',
            translation: null,
            __typename: 'DefExample'
          }
        ],
        def: "made on a potter's wheel",
        __typename: 'WordDefinition'
      }
    ],
    audioUrl:
      'https://media.merriam-webster.com/audio/prons/en/us/mp3/number/9wheel01.mp3',
    additionalInfo: null,
    imgDesc: null,
    shortDef: ["made on a potter's wheel"],
    language: 'ENGLISH'
  },
  {
    uuid: '7a24789d-967d-48c1-9a7b-fd939605cc0e',
    transcription: 'wheel clamp',
    stems: ['wheel clamp'],
    particle: 'noun',
    name: 'wheel clamp',
    isOffensive: false,
    imgUrl: null,
    defs: [
      {
        examples: null,
        def: 'an object that the police lock onto one of the wheels of a car so that the car cannot be moved',
        __typename: 'WordDefinition'
      }
    ],
    audioUrl: null,
    additionalInfo: null,
    imgDesc: null,
    shortDef: [
      'an object that the police lock onto one of the wheels of a car so that the car cannot be moved'
    ],
    language: 'ENGLISH'
  },
  {
    uuid: '241b01e5-1c2e-4341-b4c2-581991bd00bc',
    transcription: 'ˈȯl-ˈwēl',
    stems: ['all-wheel'],
    particle: 'adjective',
    name: 'all-wheel',
    isOffensive: false,
    imgUrl: null,
    defs: [
      {
        examples: [
          {
            text: '<i>all-wheel</i> drive',
            translation: null,
            __typename: 'DefExample'
          }
        ],
        def: 'acting especially independently on or by means of all four wheels of an automotive vehicle',
        __typename: 'WordDefinition'
      }
    ],
    audioUrl:
      'https://media.merriam-webster.com/audio/prons/en/us/mp3/a/all_w01v.mp3',
    additionalInfo: null,
    imgDesc: null,
    shortDef: [
      'acting especially independently on or by means of all four wheels of an automotive vehicle'
    ],
    language: 'ENGLISH'
  },
  {
    uuid: '9f50a700-36ae-4e7e-96ee-8ee0357aff95',
    transcription: 'ˈȯl-ˈwēl-',
    stems: ['all-wheel drive'],
    particle: 'noun',
    name: 'all-wheel drive',
    isOffensive: false,
    imgUrl: null,
    defs: [
      {
        examples: null,
        def: 'an automobile drive mechanism that acts on all four wheels of the vehicle',
        __typename: 'WordDefinition'
      }
    ],
    audioUrl:
      'https://media.merriam-webster.com/audio/prons/en/us/mp3/a/all_w01v.mp3',
    additionalInfo: null,
    imgDesc: null,
    shortDef: [
      'an automobile drive mechanism that acts on all four wheels of the vehicle'
    ],
    language: 'ENGLISH'
  }
];
