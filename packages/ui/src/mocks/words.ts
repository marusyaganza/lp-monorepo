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
        examples: [
          { text: 'He described himself as ‘an {it}egalitarian{/it}’.' }
        ]
      },
      {
        def: 'aiming for equal wealth, status, etc., for all people',
        examples: [
          { text: 'He is a committed {it}egalitarian{/it}' },
          {
            text: 'Even in the {it}egalitarian{/it} Nordic country, Marin felt hergender and age sometimes received too much emphasis. Kostya Manenkov And Karl Ritter, USA TODAY, 21 Aug. 2022'
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
        def: '{it}informal + offensive{/it} {bc} a woman\u0027s sex organs {it}also{/it} {bc} sexual intercourse with a woman'
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
        def: '{bc}made on a potter\u0027s wheel ',
        examples: [{ text: '{wi}wheel-thrown{/wi} pottery' }]
      },
      {
        def: '{bc}{sx|rotifer||}'
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
        def: 'def1',
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

export const wheel: Word[] = [
  {
    uuid: '4e2c10d5-173d-4401-9b21-08e8a8656431',
    transcription: 'ˈ(h)wēl',
    stems: ['wheel', 'wheelless', 'wheels'],
    particle: 'noun',
    name: 'wheel',
    isOffensive: false,
    language: Language.English,
    imgUrl: 'https://merriam-webster.com/assets/mw/static/art/dict/wheel.gif',
    defs: [
      {
        examples: null,
        def: '{bc}a circular frame of hard material that may be solid, partly solid, or spoked and that is capable of turning on an axle',
        __typename: 'WordDefinition'
      },
      {
        examples: [
          {
            text: '… drivers are expected to keep their hands on the {wi}wheel{/wi} and remain attentive …'
          }
        ],
        def: ' {dx}see also {dxt|behind the wheel|behind the wheel|}{/dx}',
        __typename: 'WordDefinition'
      },
      {
        examples: null,
        def: '{bc}a recurring course, development, or action {bc}{sx|cycle||}',
        __typename: 'WordDefinition'
      },
      {
        examples: null,
        def: '{bc}something (such as a round, flat cheese) resembling a wheel in shape',
        __typename: 'WordDefinition'
      },
      {
        examples: null,
        def: '{bc}a rotation or turn usually about an axis or center',
        __typename: 'WordDefinition'
      },
      {
        examples: [{ text: 'a big {wi}wheel{/wi}' }],
        def: '{bc}a person of importance especially in an organization ',
        __typename: 'WordDefinition'
      },
      {
        examples: null,
        def: '{bc}the refrain or burden of a song',
        __typename: 'WordDefinition'
      },
      {
        examples: null,
        def: '{bc}a sports league',
        __typename: 'WordDefinition'
      },
      {
        examples: null,
        def: '{bc}a wheeled vehicle',
        __typename: 'WordDefinition'
      },
      {
        examples: null,
        def: '{bc}{sx|legs||}',
        __typename: 'WordDefinition'
      }
    ],
    audioUrl:
      'https://media.merriam-webster.com/audio/prons/en/us/mp3/w/wheel001.mp3',
    additionalInfo: null,
    imgDesc:
      'wheel 1: {it}1{/it} hub, {it}2{/it} spoke, {it}3{/it} felly, {it}4{/it} tire',
    id: 'mockId',
    user: '0',
    createdAt: '1571213104370',
    shortDef: [
      'a circular frame of hard material that may be solid, partly solid, or spoked and that is capable of turning on an axle',
      'a contrivance or apparatus having as its principal part a wheel: such as',
      'a chiefly medieval instrument of torture designed for mutilating a victim (as by stretching or disjointing)'
    ]
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
    language: Language.English,
    defs: [
      {
        examples: null,
        def: '{bc}to turn on or as if on an axis {bc}{sx|revolve||}',
        __typename: 'WordDefinition'
      },
      {
        examples: [
          { text: 'the battalion would have {wi}wheeled{/wi} to the flank' },
          { text: 'her mind will {wi}wheel{/wi} around to the other extreme' },
          { text: '{wi}wheeled{/wi} to face her opponent' }
        ],
        def: '{bc}to change direction as if revolving on a pivot ',
        __typename: 'WordDefinition'
      },
      {
        examples: [
          { text: 'birds in {wi}wheeling{/wi} flight' },
          {
            text: 'valleys where young cotton {wi}wheeled{/wi} slowly in fanlike rows'
          }
        ],
        def: '{bc}to move or extend in a circle or curve ',
        __typename: 'WordDefinition'
      },
      {
        examples: null,
        def: '{bc}to travel on or as if on {a_link|wheels} or in a {a_link|wheeled} vehicle',
        __typename: 'WordDefinition'
      },
      {
        examples: null,
        def: '{bc}to cause to turn on or as if on an axis {bc}{sx|rotate||}',
        __typename: 'WordDefinition'
      },
      {
        examples: [
          { text: '{wi}wheeled{/wi} the patient back to his room' },
          { text: '{wi}wheeled{/wi} the car into the driveway' },
          { text: '{wi}wheel{/wi} in the experts' }
        ],
        def: '{bc}to convey or move on or as if on wheels or in a wheeled vehicle ',
        __typename: 'WordDefinition'
      },
      {
        examples: null,
        def: '{bc}to cause to change direction as if revolving on a pivot',
        __typename: 'WordDefinition'
      },
      {
        examples: null,
        def: '{bc}to make or perform in a circle or curve',
        __typename: 'WordDefinition'
      }
    ],
    audioUrl: null,
    additionalInfo: null,
    imgDesc: null,
    id: 'mockId',
    user: '0',
    createdAt: '1571213104370',
    shortDef: [
      'a contrivance or apparatus having as its principal part a wheel: such as',
      'a chiefly medieval instrument of torture designed for mutilating a victim (as by stretching or disjointing)'
    ]
  },
  {
    uuid: 'f65dcde8-88b5-4710-8b1a-7d9d0ff1445e',
    transcription: 'wheel and axle',
    stems: ['wheel and axle', 'wheel and axles'],
    particle: 'noun',
    name: 'wheel and axle',
    isOffensive: false,
    imgUrl: null,
    language: Language.English,
    defs: [
      {
        examples: null,
        def: '{bc}a mechanical device consisting of a grooved wheel turned by a cord or chain with a rigidly attached axle (as for winding up a weight) together with the supporting standards',
        __typename: 'WordDefinition'
      }
    ],
    audioUrl: null,
    additionalInfo: null,
    imgDesc: null,
    id: 'mockId',
    user: '0',
    createdAt: '1571213104370',
    shortDef: [
      'a circular frame of hard material that may be solid, partly solid, or spoked and that is capable of turning on an axle'
    ]
  },
  {
    uuid: 'e8b9c004-544f-4a1e-8014-3fffa6221c48',
    transcription: 'wheel animal',
    stems: ['wheel animal', 'wheel animals'],
    particle: 'noun',
    name: 'wheel animal',
    isOffensive: false,
    language: Language.English,
    imgUrl: null,
    defs: [
      {
        examples: null,
        def: '{bc}{sx|rotifer||}',
        __typename: 'WordDefinition'
      }
    ],
    audioUrl: null,
    additionalInfo: null,
    imgDesc: null,
    id: 'mockId',
    user: '0',
    createdAt: '1571213104370',
    shortDef: [
      'a circular frame of hard material that may be solid, partly solid, or spoked and that is capable of turning on an axle',
      'a contrivance or apparatus having as its principal part a wheel: such as',
      'a chiefly medieval instrument of torture designed for mutilating a victim (as by stretching or disjointing)'
    ]
  },
  {
    uuid: 'f9b7c27b-9126-4e0b-8668-162f034a3fed',
    transcription: 'wheel bug',
    stems: ['wheel bug', 'wheel bugs'],
    particle: 'noun',
    name: 'wheel bug',
    isOffensive: false,
    language: Language.English,
    imgUrl: null,
    defs: [
      {
        examples: null,
        def: '{bc}a large North American assassin bug ({it}Arilus cristatus{/it}) that has a high serrated crest on its prothorax and preys on insects',
        __typename: 'WordDefinition'
      }
    ],
    audioUrl: null,
    additionalInfo: null,
    imgDesc: null,
    id: 'mockId',
    user: '0',
    createdAt: '1571213104370',
    shortDef: [
      'a chiefly medieval instrument of torture designed for mutilating a victim (as by stretching or disjointing)'
    ]
  },
  {
    uuid: '3919d4f6-4c50-4063-8162-9b10d1863754',
    transcription: 'wheel lock',
    stems: ['wheel lock', 'wheel locks'],
    particle: 'noun',
    name: 'wheel lock',
    isOffensive: false,
    imgUrl: null,
    language: Language.English,
    defs: [
      {
        examples: null,
        def: "{bc}a gun's lock for a muzzle-loading firearm in which sparks are struck from a flint or a piece of pyrite by a revolving wheel",
        __typename: 'WordDefinition'
      }
    ],
    audioUrl: null,
    additionalInfo: null,
    imgDesc: null,
    id: 'mockId',
    user: '0',
    createdAt: '1571213104370',
    shortDef: ['short']
  },
  {
    uuid: 'b4b2f01c-7e82-45e0-98b9-1c9ab3052385',
    transcription: 'ˈ(h)wēl-ˌthrōn',
    stems: ['wheel-thrown'],
    particle: 'adjective',
    name: 'wheel-thrown',
    isOffensive: false,
    language: Language.English,
    imgUrl: null,
    defs: [
      {
        examples: [{ text: '{wi}wheel-thrown{/wi} pottery' }],
        def: "{bc}made on a potter's wheel ",
        __typename: 'WordDefinition'
      }
    ],
    audioUrl:
      'https://media.merriam-webster.com/audio/prons/en/us/mp3/number/9wheel01.mp3',
    additionalInfo: null,
    imgDesc: null,
    id: 'mockId',
    user: '0',
    createdAt: '1571213104370',
    shortDef: [
      'a circular frame of hard material that may be solid, partly solid, or spoked and that is capable of turning on an axle',
      'a contrivance or apparatus having as its principal part a wheel: such as',
      'a chiefly medieval instrument of torture designed for mutilating a victim (as by stretching or disjointing)'
    ]
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
        def: '{bc}an object that the police lock onto one of the wheels of a car so that the car cannot be moved',
        __typename: 'WordDefinition'
      }
    ],
    audioUrl: null,
    additionalInfo: null,
    imgDesc: null,
    id: 'mockId',
    user: '0',
    createdAt: '1571213104370',
    language: Language.English,
    shortDef: [
      'a circular frame of hard material that may be solid, partly solid, or spoked and that is capable of turning on an axle',
      'a contrivance or apparatus having as its principal part a wheel: such as',
      'a chiefly medieval instrument of torture designed for mutilating a victim (as by stretching or disjointing)'
    ]
  },
  {
    uuid: '241b01e5-1c2e-4341-b4c2-581991bd00bc',
    transcription: 'ˈȯl-ˈwēl',
    stems: ['all-wheel'],
    particle: 'adjective',
    name: 'all-wheel',
    isOffensive: false,
    imgUrl: null,
    language: Language.English,
    defs: [
      {
        examples: [{ text: '{wi}all-wheel{/wi} drive' }],
        def: '{bc}acting especially independently on or by means of all four wheels of an automotive vehicle ',
        __typename: 'WordDefinition'
      }
    ],
    audioUrl:
      'https://media.merriam-webster.com/audio/prons/en/us/mp3/a/all_w01v.mp3',
    additionalInfo: null,
    imgDesc: null,
    id: 'mockId',
    user: '0',
    createdAt: '1571213104370',
    shortDef: [
      'a circular frame of hard material that may be solid, partly solid, or spoked and that is capable of turning on an axle',
      'a contrivance or apparatus having as its principal part a wheel: such as',
      'a chiefly medieval instrument of torture designed for mutilating a victim (as by stretching or disjointing)'
    ]
  },
  {
    uuid: '9f50a700-36ae-4e7e-96ee-8ee0357aff95',
    transcription: 'ˈȯl-ˈwēl-',
    stems: ['all-wheel drive'],
    particle: 'noun',
    name: 'all-wheel drive',
    isOffensive: false,
    language: Language.English,
    imgUrl: null,
    defs: [
      {
        examples: null,
        def: '{bc}an automobile drive mechanism that acts on all four wheels of the vehicle',
        __typename: 'WordDefinition'
      }
    ],
    audioUrl:
      'https://media.merriam-webster.com/audio/prons/en/us/mp3/a/all_w01v.mp3',
    additionalInfo: null,
    imgDesc: null,
    id: 'mockId',
    user: '0',
    createdAt: '1571213104370',
    shortDef: [
      'a circular frame of hard material that may be solid, partly solid, or spoked and that is capable of turning on an axle',
      'a contrivance or apparatus having as its principal part a wheel: such as',
      'a chiefly medieval instrument of torture designed for mutilating a victim (as by stretching or disjointing)'
    ]
  }
];
