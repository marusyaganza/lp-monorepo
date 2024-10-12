import { Language, PaginatedWords } from '../../generated/graphql';

export const wordsWithPagination = {
  [Language.English]: {
    hasNext: false,
    wordsCount: 3,
    words: [
      {
        id: '66f7ef03eae42983ce978474',
        name: 'guinea fowl',
        defs: [
          {
            def: 'an African bird (<i>Numida meleagris</i>) related to the pheasants, raised for food in many parts of the world, and marked by a bare neck and head and slaty plumage speckled with white'
          }
        ],
        particle: 'noun',
        audioUrl: '',
        transcription: 'guinea fowl',
        isOffensive: false,
        isLearned: false,
        level: 'B1',
        shortDef: [
          'an African bird (Numida meleagris) related to the pheasants, raised for food in many parts of the world, and marked by a bare neck and head and slaty plumage speckled with white; broadly : any of several related birds'
        ],
        tags: [
          {
            text: 'animals',
            color: '#56c8a2',
            id: '66f7ef1ceae42983ce978482'
          }
        ]
      },
      {
        id: '66f7ef05eae42983ce978478',
        name: 'fish',
        defs: [
          {
            def: 'any of numerous cold-blooded strictly aquatic craniate vertebrates that include the bony fishes and usually the cartilaginous, cartilaginous fish and jawless fishes and that have typically an elongated somewhat spindle-shaped body terminating in a broad caudal see caudal fin, limbs in the form of fins when present at all, and a 2-chambered heart by which blood is sent through thoracic gills to be oxygenated'
          },
          {
            def: 'the flesh of fish used as food'
          },
          {
            def: 'sucker'
          },
          {
            def: 'torpedo'
          }
        ],
        particle: 'noun',
        audioUrl:
          'https://media.merriam-webster.com/audio/prons/en/us/mp3/f/fish0001.mp3',
        transcription: 'ˈfish',
        isOffensive: false,
        isLearned: null,
        level: null,
        shortDef: [
          'an aquatic animal —usually used in combination',
          'any of numerous cold-blooded strictly aquatic craniate vertebrates that include the bony fishes and usually the cartilaginous and jawless fishes and that have typically an elongated somewhat spindle-shaped body terminating in a broad caudal fin, limbs in the form of fins when present at all, and a 2-chambered heart by which blood is sent through thoracic gills to be oxygenated',
          'the flesh of fish used as food'
        ],
        tags: []
      },
      {
        id: '66f7daa8ac5cc9e644a97773',
        name: 'murther',
        defs: [
          {
            def: 'chiefly dialectal variant of <i>murder</i>'
          }
        ],
        particle: 'noun',
        audioUrl:
          'https://media.merriam-webster.com/audio/prons/en/us/mp3/m/murthe01.mp3',
        transcription: 'ˈmər-t͟hər',
        isOffensive: false,
        isLearned: null,
        level: null,
        shortDef: ['chiefly dialectal variant of <i>murder</i>'],
        tags: []
      }
    ]
  },
  [Language.Spanish]: {
    hasNext: false,
    wordsCount: 1,
    words: [
      {
        id: '0',
        user: '1',
        name: 'caer',
        particle: 'intransitive verb',
        imgUrl: 'mockAudio',

        defs: [
          {
            def: 'to fall'
          }
        ],
        shortDef: ['to fall', 'to drop away, to slope', 'to fall (of night)'],
        conjugation: [
          {
            cjid: 'gppt',
            cjfs: ['cayendo', 'ca\u00eddo']
          },
          {
            cjid: 'pind',
            cjfs: ['caigo', 'caes', 'cae', 'caemos', 'ca\u00e9is', 'caen']
          },
          {
            cjid: 'pret',
            cjfs: [
              'ca\u00eda',
              'ca\u00edas',
              'ca\u00eda',
              'ca\u00edamos',
              'ca\u00edais',
              'ca\u00edan'
            ]
          },
          {
            cjid: 'pprf',
            cjfs: [
              'ca\u00ed',
              'ca\u00edste',
              'cay\u00f3',
              'ca\u00edmos',
              'ca\u00edsteis',
              'cayeron'
            ]
          },
          {
            cjid: 'futr',
            cjfs: [
              'caer\u00e9',
              'caer\u00e1s',
              'caer\u00e1',
              'caeremos',
              'caer\u00e9is',
              'caer\u00e1n'
            ]
          },
          {
            cjid: 'cond',
            cjfs: [
              'caer\u00eda',
              'caer\u00edas',
              'caer\u00eda',
              'caer\u00edamos',
              'caer\u00edais',
              'caer\u00edan'
            ]
          },
          {
            cjid: 'psub',
            cjfs: [
              'caiga',
              'caigas',
              'caiga',
              'caigamos',
              'caig\u00e1is',
              'caigan'
            ]
          },
          {
            cjid: 'pisb1',
            cjfs: [
              'cayera',
              'cayeras',
              'cayera',
              'cay\u00e9ramos',
              'cayerais',
              'cayeran'
            ]
          },
          {
            cjid: 'pisb2',
            cjfs: [
              'cayese',
              'cayeses',
              'cayese',
              'cay\u00e9semos',
              'cayeseis',
              'cayesen'
            ]
          },
          {
            cjid: 'fsub',
            cjfs: [
              'cayere',
              'cayeres',
              'cayere',
              'cay\u00e9remos',
              'cayereis',
              'cayeren'
            ]
          },
          {
            cjid: 'ppci',
            cjfs: [
              'he ca\u00eddo',
              'has ca\u00eddo',
              'ha ca\u00eddo',
              'hemos ca\u00eddo',
              'hab\u00e9is ca\u00eddo',
              'han ca\u00eddo'
            ]
          },
          {
            cjid: 'ppsi',
            cjfs: [
              'hab\u00eda ca\u00eddo',
              'hab\u00edas ca\u00eddo',
              'hab\u00eda ca\u00eddo',
              'hab\u00edamos ca\u00eddo',
              'hab\u00edais ca\u00eddo',
              'hab\u00edan ca\u00eddo'
            ]
          },
          {
            cjid: 'pant',
            cjfs: [
              'hube ca\u00eddo',
              'hubiste ca\u00eddo',
              'hubo ca\u00eddo',
              'hubimos ca\u00eddo',
              'hubisteis ca\u00eddo',
              'hubieron ca\u00eddo'
            ]
          },
          {
            cjid: 'fpin',
            cjfs: [
              'habr\u00e9 ca\u00eddo',
              'habr\u00e1s ca\u00eddo',
              'habr\u00e1 ca\u00eddo',
              'habremos ca\u00eddo',
              'habr\u00e9is ca\u00eddo',
              'habr\u00e1n ca\u00eddo'
            ]
          },
          {
            cjid: 'cpef',
            cjfs: [
              'habr\u00eda ca\u00eddo',
              'habr\u00edas ca\u00eddo',
              'habr\u00eda ca\u00eddo',
              'habr\u00edamos ca\u00eddo',
              'habr\u00edais ca\u00eddo',
              'habr\u00edan ca\u00eddo'
            ]
          },
          {
            cjid: 'ppfs',
            cjfs: [
              'haya ca\u00eddo',
              'hayas ca\u00eddo',
              'haya ca\u00eddo',
              'hayamos ca\u00eddo',
              'hay\u00e1is ca\u00eddo',
              'hayan ca\u00eddo'
            ]
          },
          {
            cjid: 'ppss1',
            cjfs: [
              'hubiera ca\u00eddo',
              'hubieras ca\u00eddo',
              'hubiera ca\u00eddo',
              'hubi\u00e9ramos ca\u00eddo',
              'hubierais ca\u00eddo',
              'hubieran ca\u00eddo'
            ]
          },
          {
            cjid: 'ppss2',
            cjfs: [
              'hubiese ca\u00eddo',
              'hubieses ca\u00eddo',
              'hubiese ca\u00eddo',
              'hubi\u00e9semos ca\u00eddo',
              'hubieseis ca\u00eddo',
              'hubiesen ca\u00eddo'
            ]
          },
          {
            cjid: 'fpsb',
            cjfs: [
              'hubiere ca\u00eddo',
              'hubieres ca\u00eddo',
              'hubiere ca\u00eddo',
              'hubi\u00e9remos ca\u00eddo',
              'hubiereis ca\u00eddo',
              'hubieren ca\u00eddo'
            ]
          },
          {
            cjid: 'impf',
            cjfs: ['-', 'cae', 'caiga', 'caigamos', 'caed', 'caigan']
          }
        ]
      }
    ]
  }
} as Record<Language, PaginatedWords>;
