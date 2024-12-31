const bully = [
  {
    meta: {
      id: 'bully:1',
      uuid: 'd1020313-1336-44d7-af80-d23ca7354147',
      lang: 'en',
      sort: '2603108000',
      src: 'spanish',
      section: 'alpha',
      stems: ['bully', 'bullied', 'bullying', 'bullies'],
      offensive: false
    },
    hom: 1,
    hwi: {
      hw: 'bully',
      prs: [
        {
          mw: 'ˈbʊli',
          sound: {
            audio: 'bully001'
          }
        }
      ]
    },
    fl: 'transitive verb',
    ins: [
      {
        ifc: '-lied',
        if: 'bullied'
      },
      {
        ifc: '-lying',
        if: 'bullying'
      }
    ],
    def: [
      {
        sseq: [
          [
            [
              'sense',
              {
                dt: [
                  [
                    'text',
                    '{bc}{a_link|intimidar}, {a_link|amedrentar}, {a_link|mangonear}'
                  ]
                ]
              }
            ]
          ]
        ]
      }
    ],
    shortdef: ['intimidar, amedrentar, mangonear']
  },
  {
    meta: {
      id: 'bully:2',
      uuid: 'cae64086-d4e5-4797-81d2-d065d2b2b64b',
      lang: 'en',
      sort: '2603109000',
      src: 'spanish',
      section: 'alpha',
      stems: ['bully', 'bullies'],
      offensive: false
    },
    hom: 2,
    hwi: {
      hw: 'bully'
    },
    fl: 'noun',
    ins: [
      {
        il: 'plural',
        ifc: '-lies',
        if: 'bullies'
      }
    ],
    def: [
      {
        sseq: [
          [
            [
              'sense',
              {
                dt: [
                  ['text', '{bc}{a_link|matón} '],
                  ['gl', 'masculine'],
                  ['text', '; bravucón '],
                  ['gl', 'masculine'],
                  ['text', ', '],
                  [
                    'gwds',
                    {
                      gwc: '-cona',
                      gwd: 'bravucona'
                    }
                  ],
                  ['text', ' '],
                  ['gl', 'feminine']
                ]
              }
            ]
          ]
        ]
      }
    ],
    shortdef: ['matón; bravucón, bravucona']
  }
];

export default bully;
