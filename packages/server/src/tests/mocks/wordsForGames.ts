import { Language, Tense, Word } from '../../generated/graphql';

export const testData = {
  [Language.English]: [
    {
      name: 'apple',
      audioUrl: 'https://example.com/audio/apple.mp3',
      id: '1',
      defs: [
        { def: 'A round fruit with red or green skin and a whitish interior.' }
      ],
      shortDef: ['Round fruit with red or green skin.'],
      imgUrl: 'https://example.com/images/apple.jpg',
      alternativeSpelling: ['appel', 'aple']
    },
    {
      name: 'orange',
      audioUrl: 'https://example.com/audio/orange.mp3',
      id: '2',
      defs: [
        {
          def: 'A citrus fruit with a tough bright orange rind and juicy sweet flesh.'
        },
        {
          def: 'Sun fruit'
        }
      ],
      shortDef: ['Citrus fruit with orange rind.'],
      imgUrl: 'https://example.com/images/orange.jpg',
      alternativeSpelling: ['oranj', 'orenge']
    },
    {
      name: 'banana',
      audioUrl: 'https://example.com/audio/banana.mp3',
      id: '3',
      defs: [
        {
          def: 'A long curved fruit that grows in clusters and has soft pulpy flesh and yellow skin when ripe.'
        }
      ],
      shortDef: ['Curved fruit with yellow skin.'],
      imgUrl: 'https://example.com/images/banana.jpg'
    },
    {
      name: 'strawberry',
      audioUrl: 'https://example.com/audio/strawberry.mp3',
      id: '4',
      defs: [{ def: 'A sweet soft red fruit with a seed-studded surface.' }],
      shortDef: ['Soft red fruit with seeds.'],
      imgUrl: 'https://example.com/images/strawberry.jpg',
      alternativeSpelling: ['strawbery', 'straw-berry']
    },
    {
      name: 'pineapple',
      audioUrl: 'https://example.com/audio/pineapple.mp3',
      id: '5',
      defs: [
        {
          def: 'A large tropical fruit with a tough spiky rind and sweet yellow flesh.'
        }
      ],
      shortDef: ['Tropical fruit with spiky rind.'],
      imgUrl: 'https://example.com/images/pineapple.jpg'
    },
    {
      name: 'grape',
      audioUrl: 'https://example.com/audio/grape.mp3',
      id: '6',
      defs: [
        { def: 'A small juicy fruit with a smooth skin and a sweet taste.' }
      ],
      shortDef: ['Small juicy fruit with smooth skin.'],
      imgUrl: 'https://example.com/images/grape.jpg',
      alternativeSpelling: ['grap', 'greyp']
    }
  ],
  [Language.Spanish]: [
    {
      name: 'manzana',
      audioUrl: 'https://example.com/audio/manzana.mp3',
      id: '1',
      defs: [
        {
          def: 'A round fruit with red or green skin and a whitish interior.',
          examples: [
            {
              text: 'Ella comió una manzana roja para el desayuno.',
              translation: 'She ate a red apple for breakfast.'
            }
          ]
        }
      ],
      shortDef: ['Round fruit with red or green skin.'],
      imgUrl: 'https://example.com/images/manzana.jpg',
      alternativeSpelling: ['manzana', 'manzána']
    },
    {
      name: 'naranja',
      audioUrl: 'https://example.com/audio/naranja.mp3',
      id: '2',
      defs: [
        {
          def: 'A citrus fruit with a tough bright orange rind and juicy sweet flesh.',
          examples: [
            {
              text: 'Ella bebió jugo de naranja fresco esta mañana.',
              translation: 'She drank fresh orange juice this morning.'
            }
          ]
        },
        {
          def: 'Sun fruit',
          examples: [
            {
              text: 'Llamaban la naranja “fruta del sol” por su color.',
              translation:
                'They called the orange "sun fruit" because of its color.'
            }
          ]
        }
      ],
      shortDef: ['Citrus fruit with orange rind.'],
      imgUrl: 'https://example.com/images/naranja.jpg',
      alternativeSpelling: ['naranga', 'naranj']
    },
    {
      name: 'plátano',
      audioUrl: 'https://example.com/audio/platano.mp3',
      id: '3',
      defs: [
        {
          def: 'A long curved fruit that grows in clusters and has soft pulpy flesh and yellow skin when ripe.',
          examples: [
            {
              text: 'Él peló un plátano y se lo comió.',
              translation: 'He peeled a banana and ate it.'
            }
          ]
        }
      ],
      shortDef: ['Curved fruit with yellow skin.'],
      imgUrl: 'https://example.com/images/platano.jpg',
      alternativeSpelling: ['platáno', 'plátan']
    },
    {
      name: 'fresa',
      audioUrl: 'https://example.com/audio/fresa.mp3',
      id: '4',
      defs: [
        {
          def: 'A sweet soft red fruit with a seed-studded surface.',
          examples: [
            {
              text: 'Ella recogió una fresa madura del jardín.',
              translation: 'She picked a ripe strawberry from the garden.'
            }
          ]
        }
      ],
      shortDef: ['Soft red fruit with seeds.'],
      imgUrl: 'https://example.com/images/fresa.jpg',
      alternativeSpelling: ['freza', 'fre-sá']
    },
    {
      name: 'piña',
      audioUrl: 'https://example.com/audio/pina.mp3',
      id: '5',
      defs: [
        {
          def: 'A large tropical fruit with a tough spiky rind and sweet yellow flesh.',
          examples: [
            {
              text: 'Hicieron un batido de piña.',
              translation: 'They made a pineapple smoothie.'
            }
          ]
        }
      ],
      shortDef: ['Tropical fruit with spiky rind.'],
      imgUrl: 'https://example.com/images/pina.jpg',
      alternativeSpelling: ['pina', 'pi-ñá']
    },
    {
      name: 'uva',
      audioUrl: 'https://example.com/audio/uva.mp3',
      id: '6',
      defs: [
        {
          def: 'A small juicy fruit with a smooth skin and a sweet taste.',
          examples: [
            {
              text: 'Él me ofreció un racimo de uvas.',
              translation: 'He offered me a bunch of grapes.'
            }
          ]
        }
      ],
      shortDef: ['Small juicy fruit with smooth skin.'],
      imgUrl: 'https://example.com/images/uva.jpg',
      alternativeSpelling: ['uba', 'uvá']
    }
  ]
} as Record<Language, Word[]>;

export const wordsWithConjugation = [
  {
    id: '001',
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
    imgUrl: 'https://example.com/images/pensar.jpg',
    audioUrl: 'https://example.com/audio/pensar.mp3',
    shortDef: ['To think.'],
    alternativeSpelling: [],
    conjugation: [
      {
        cjid: Tense.Pind,
        cjfs: ['pienso', 'piensas', 'piensa', 'pensamos', 'pensáis', 'piensan']
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
      }
    ]
  },
  {
    id: '002',
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
    imgUrl: 'https://example.com/images/correr.jpg',
    audioUrl: 'https://example.com/audio/correr.mp3',
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
      }
    ]
  }
] as Word[];
