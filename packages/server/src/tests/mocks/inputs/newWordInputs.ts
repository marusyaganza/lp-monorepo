import { Language, Level, Tense } from '../../../generated/graphql';

export const newWordInputs = {
  [Language.English]: [
    {
      uuid: '101',
      name: 'serendipity',
      defs: [
        {
          def: 'The occurrence of events by chance in a happy or beneficial way.',
          examples: [
            { text: 'She found the perfect book by sheer serendipity.' }
          ]
        }
      ],
      particle: 'noun',
      imgUrl: 'https://example.com/images/serendipity.jpg',
      imgDesc: 'A person happily discovering something unexpected.',
      audioUrl: 'https://example.com/audio/serendipity.mp3',
      additionalInfo: 'Often related to fortunate discoveries.',
      transcription: '[ˌsɛrənˈdɪpɪti]',
      isOffensive: false,
      stems: ['serendipities'],
      level: Level.C1,
      language: Language.English,
      shortDef: ['Unexpected good fortune.'],
      alternativeSpelling: []
    },
    {
      uuid: '102',
      name: 'ephemeral',
      defs: [
        {
          def: 'Lasting for a very short time.',
          examples: [
            { text: 'The beauty of the cherry blossoms is ephemeral.' }
          ]
        }
      ],
      particle: 'adjective',
      imgUrl: 'https://example.com/images/ephemeral.jpg',
      imgDesc: 'Cherry blossoms in bloom for a short period.',
      audioUrl: 'https://example.com/audio/ephemeral.mp3',
      additionalInfo: 'Used to describe fleeting moments or things.',
      transcription: '[ɪˈfɛmərəl]',
      isOffensive: false,
      stems: ['ephemerally'],
      level: Level.B2,
      language: Language.English,
      shortDef: ['Short-lived.'],
      alternativeSpelling: []
    },
    {
      uuid: '103',
      name: 'ubiquitous',
      defs: [
        {
          def: 'Present, appearing, or found everywhere.',
          examples: [
            { text: 'Smartphones have become ubiquitous in modern life.' }
          ]
        }
      ],
      particle: 'adjective',
      imgUrl: 'https://example.com/images/ubiquitous.jpg',
      imgDesc: 'Smartphones being used by many people.',
      audioUrl: 'https://example.com/audio/ubiquitous.mp3',
      additionalInfo: 'Often used in technology contexts.',
      transcription: '[juːˈbɪkwɪtəs]',
      isOffensive: false,
      stems: ['ubiquity'],
      level: Level.B2,
      language: Language.English,
      shortDef: ['Found everywhere.'],
      alternativeSpelling: []
    },
    {
      uuid: '104',
      name: 'quixotic',
      defs: [
        {
          def: 'Exceedingly idealistic; unrealistic and impractical.',
          examples: [
            { text: 'His quixotic quest for world peace amused his friends.' }
          ]
        }
      ],
      particle: 'adjective',
      imgUrl: 'https://example.com/images/quixotic.jpg',
      imgDesc: 'A person chasing an impossible dream.',
      audioUrl: 'https://example.com/audio/quixotic.mp3',
      additionalInfo: 'Based on the character Don Quixote.',
      transcription: '[kwɪkˈsɒtɪk]',
      isOffensive: false,
      stems: ['quixotically'],
      level: Level.C2,
      language: Language.English,
      shortDef: ['Idealistic but impractical.'],
      alternativeSpelling: []
    },
    {
      uuid: '105',
      name: 'solitude',
      defs: [
        {
          def: 'The state of being alone, often by choice.',
          examples: [
            {
              text: 'She enjoyed the peace and quiet of her mountain solitude.'
            }
          ]
        }
      ],
      particle: 'noun',
      imgUrl: 'https://example.com/images/solitude.jpg',
      imgDesc: 'A person sitting alone in the mountains.',
      audioUrl: 'https://example.com/audio/solitude.mp3',
      additionalInfo: 'Can be positive or negative depending on context.',
      transcription: '[ˈsɒlɪtjuːd]',
      isOffensive: false,
      stems: ['solitudes'],
      level: Level.B1,
      language: Language.English,
      shortDef: ['State of being alone.'],
      alternativeSpelling: []
    },
    {
      uuid: '106',
      name: 'luminous',
      defs: [
        {
          def: 'Emitting or reflecting light, glowing.',
          examples: [{ text: 'The luminous moon lit up the night sky.' }]
        }
      ],
      particle: 'adjective',
      imgUrl: 'https://example.com/images/luminous.jpg',
      imgDesc: 'The moon glowing in the night sky.',
      audioUrl: 'https://example.com/audio/luminous.mp3',
      additionalInfo: 'Can describe physical or metaphorical brightness.',
      transcription: '[ˈluːmɪnəs]',
      isOffensive: false,
      stems: ['luminosity'],
      level: Level.B2,
      language: Language.English,
      shortDef: ['Glowing or bright.'],
      alternativeSpelling: []
    },
    {
      uuid: '107',
      name: 'ameliorate',
      defs: [
        {
          def: 'To make something bad or unsatisfactory better.',
          examples: [
            {
              text: 'The new policies were designed to ameliorate working conditions.'
            }
          ]
        }
      ],
      particle: 'verb',
      imgUrl: 'https://example.com/images/ameliorate.jpg',
      imgDesc: 'A person improving the condition of a workplace.',
      audioUrl: 'https://example.com/audio/ameliorate.mp3',
      additionalInfo: 'Often used in formal contexts.',
      transcription: '[əˈmiːljəreɪt]',
      isOffensive: false,
      stems: ['ameliorates', 'ameliorating', 'ameliorated'],
      level: Level.C1,
      language: Language.English,
      shortDef: ['Improve something.'],
      alternativeSpelling: []
    }
  ],
  [Language.Spanish]: [
    {
      uuid: '001',
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
      level: Level.A1,
      language: Language.Spanish,
      shortDef: ['To run.'],
      alternativeSpelling: ['korrer'],
      conjugation: [
        {
          cjid: Tense.Pind,
          cjfs: ['corro', 'corres', 'corre', 'corremos', 'corréis', 'corren']
        },
        {
          cjid: Tense.Pret,
          cjfs: [
            'corrí',
            'corriste',
            'corrió',
            'corrimos',
            'corristeis',
            'corrieron'
          ]
        },
        {
          cjid: Tense.Pprf,
          cjfs: [
            'he corrido',
            'has corrido',
            'ha corrido',
            'hemos corrido',
            'habéis corrido',
            'han corrido'
          ]
        },
        {
          cjid: Tense.Impf,
          cjfs: ['corre', 'corra', 'corramos', 'corred', 'corran']
        },
        {
          cjid: 'futr',
          cjfs: [
            'correré',
            'correrás',
            'correrá',
            'correremos',
            'correréis',
            'correrán'
          ]
        },
        {
          cjid: 'cond',
          cjfs: [
            'correría',
            'correrías',
            'correría',
            'correríamos',
            'correríais',
            'correrían'
          ]
        },
        {
          cjid: 'psub',
          cjfs: ['corra', 'corras', 'corra', 'corramos', 'corráis', 'corran']
        },
        {
          cjid: 'gppt',
          cjfs: ['corriendo', 'corrido']
        }
      ]
    },
    {
      uuid: '002',
      name: 'felicidad',
      defs: [
        {
          def: 'The state of being happy or content.',
          examples: [
            {
              text: 'Su felicidad es contagiosa.',
              translation: 'Her happiness is contagious.'
            }
          ]
        }
      ],
      particle: 'noun',
      imgUrl: 'https://example.com/images/felicidad.jpg',
      imgDesc: 'A person smiling happily.',
      audioUrl: 'https://example.com/audio/felicidad.mp3',
      additionalInfo: 'Happiness is subjective and personal.',
      transcription: '[fe.liθiˈðað]',
      isOffensive: false,
      stems: ['felicidades', 'feliz'],
      level: Level.B1,
      language: Language.Spanish,
      shortDef: ['Happiness.'],
      alternativeSpelling: ['felisidad'],
      conjugation: null
    },
    {
      uuid: '003',
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
      imgUrl: 'https://example.com/images/rapidamente.jpg',
      imgDesc: 'A person finishing a task swiftly.',
      audioUrl: 'https://example.com/audio/rapidamente.mp3',
      additionalInfo: 'The adverb modifies the verb "fast".',
      transcription: '[ra.pi.daˈmen.te]',
      isOffensive: false,
      stems: ['rápido'],
      level: Level.A2,
      language: Language.Spanish,
      shortDef: ['Quickly.'],
      alternativeSpelling: ['rapidamiente'],
      conjugation: null
    },
    {
      uuid: '004',
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
      isOffensive: false,
      stems: ['grandes'],
      level: Level.A1,
      language: Language.Spanish,
      shortDef: ['Big, large.'],
      alternativeSpelling: [],
      conjugation: null
    },
    {
      uuid: '005',
      name: 'pensar',
      defs: [
        {
          def: 'To form ideas or mental representations.',
          examples: [
            {
              text: 'Pienso en ti todos los días.',
              translation: 'I think about you every day.'
            }
          ]
        }
      ],
      particle: 'verb',
      imgUrl: 'https://example.com/images/pensar.jpg',
      imgDesc: 'A person lost in thought.',
      audioUrl: 'https://example.com/audio/pensar.mp3',
      additionalInfo: 'Thinking is a mental activity.',
      transcription: '[penˈsaɾ]',
      isOffensive: false,
      stems: ['pienso', 'piensas', 'pensamos'],
      level: Level.B2,
      language: Language.Spanish,
      shortDef: ['To think.'],
      alternativeSpelling: [],
      conjugation: [
        {
          cjid: Tense.Pind,
          cjfs: [
            'pienso',
            'piensas',
            'piensa',
            'pensamos',
            'pensáis',
            'piensan'
          ]
        },
        {
          cjid: Tense.Pret,
          cjfs: [
            'pensé',
            'pensaste',
            'pensó',
            'pensamos',
            'pensasteis',
            'pensaron'
          ]
        },
        {
          cjid: Tense.Pprf,
          cjfs: [
            'he pensado',
            'has pensado',
            'ha pensado',
            'hemos pensado',
            'habéis pensado',
            'han pensado'
          ]
        },
        {
          cjid: Tense.Impf,
          cjfs: ['piensa', 'piense', 'pensemos', 'pensad', 'piensen']
        },
        {
          cjid: 'cond',
          cjfs: [
            'pensaría',
            'pensarías',
            'pensaría',
            'pensaríamos',
            'pensaríais',
            'pensarían'
          ]
        },
        {
          cjid: 'psub',
          cjfs: [
            'piense',
            'pienses',
            'piense',
            'pensemos',
            'penséis',
            'piensen'
          ]
        },
        {
          cjid: 'futr',
          cjfs: [
            'pensaré',
            'pensarás',
            'pensará',
            'pensaremos',
            'pensaréis',
            'pensarán'
          ]
        },
        {
          cjid: 'gppt',
          cjfs: ['pensando', 'pensado']
        }
      ]
    },
    {
      uuid: '006',
      name: 'hermosura',
      defs: [
        {
          def: 'The quality of being beautiful or pleasing to the senses.',
          examples: [
            {
              text: 'Su hermosura es indescriptible.',
              translation: 'Her beauty is indescribable.'
            }
          ]
        }
      ],
      particle: 'noun',
      imgUrl: 'https://example.com/images/hermosura.jpg',
      imgDesc: 'A beautiful landscape.',
      audioUrl: 'https://example.com/audio/hermosura.mp3',
      additionalInfo: 'Used to describe physical beauty or aesthetics.',
      transcription: '[er.moˈsu.ɾa]',
      isOffensive: false,
      stems: ['hermoso', 'hermosa'],
      level: Level.B2,
      language: Language.Spanish,
      shortDef: ['Beauty.'],
      alternativeSpelling: [],
      conjugation: null
    },
    {
      uuid: '007',
      name: 'lentamente',
      defs: [
        {
          def: 'In a slow or gradual manner.',
          examples: [
            {
              text: 'El río fluye lentamente.',
              translation: 'The river flows slowly.'
            }
          ]
        }
      ],
      particle: 'adverb',
      imgUrl: 'https://example.com/images/lentamente.jpg',
      imgDesc: 'A slow-moving river.',
      audioUrl: 'https://example.com/audio/lentamente.mp3',
      additionalInfo:
        'This word modifies actions or verbs by indicating slowness.',
      transcription: '[len.taˈmen.te]',
      isOffensive: false,
      stems: ['lento', 'lenta'],
      level: Level.A2,
      language: Language.Spanish,
      shortDef: ['Slowly.'],
      alternativeSpelling: [],
      conjugation: null
    }
  ]
};
