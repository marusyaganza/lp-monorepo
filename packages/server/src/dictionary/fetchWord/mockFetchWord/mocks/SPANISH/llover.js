const llover = [
  {
    meta: {
      id: 'llover',
      uuid: 'c47bb2d8-be93-449a-92fd-18ede123cd8b',
      lang: 'es',
      sort: '2613946000',
      src: 'spanish',
      section: 'alpha',
      stems: ['llover'],
      offensive: false
    },
    hwi: {
      hw: 'llover',
      prs: [
        {
          sound: {
            audio: 'llove01sp'
          }
        }
      ]
    },
    fl: 'impersonal verb',
    def: [
      {
        sseq: [
          [
            [
              'sense',
              {
                dt: [
                  ['text', '{bc}to {a_link|rain} '],
                  [
                    'vis',
                    [
                      {
                        t: 'está lloviendo',
                        tr: "it's raining"
                      },
                      {
                        t: 'llover a cántaros',
                        tr: 'to rain cats and dogs'
                      }
                    ]
                  ]
                ]
              }
            ]
          ]
        ]
      },
      {
        vd: 'intransitive verb',
        sseq: [
          [
            [
              'sense',
              {
                dt: [
                  ['text', '{bc}to {a_link|rain down}, to {a_link|shower} '],
                  [
                    'vis',
                    [
                      {
                        t: 'le llovieron regalos',
                        tr: 'he was showered with gifts'
                      }
                    ]
                  ]
                ]
              }
            ]
          ]
        ]
      }
    ],
    suppl: {
      cjts: [
        {
          cjid: 'gppt',
          cjfs: ['lloviendo', 'llovido']
        },
        {
          cjid: 'pind',
          cjfs: ['-', '-', 'llueve', '-', '-', '-']
        },
        {
          cjid: 'pret',
          cjfs: ['-', '-', 'llovía', '-', '-', '-']
        },
        {
          cjid: 'pprf',
          cjfs: ['-', '-', 'llovió', '-', '-', '-']
        },
        {
          cjid: 'futr',
          cjfs: ['-', '-', 'lloverá', '-', '-', '-']
        },
        {
          cjid: 'cond',
          cjfs: ['-', '-', 'llovería', '-', '-', '-']
        },
        {
          cjid: 'psub',
          cjfs: ['-', '-', 'llueva', '-', '-', '-']
        },
        {
          cjid: 'pisb1',
          cjfs: ['-', '-', 'lloviera', '-', '-', '-']
        },
        {
          cjid: 'pisb2',
          cjfs: ['-', '-', 'lloviese', '-', '-', '-']
        },
        {
          cjid: 'fsub',
          cjfs: ['-', '-', 'lloviere', '-', '-', '-']
        },
        {
          cjid: 'ppci',
          cjfs: ['-', '-', 'ha llovido', '-', '-', '-']
        },
        {
          cjid: 'ppsi',
          cjfs: ['-', '-', 'había llovido', '-', '-', '-']
        },
        {
          cjid: 'pant',
          cjfs: ['-', '-', 'hubo llovido', '-', '-', '-']
        },
        {
          cjid: 'fpin',
          cjfs: ['-', '-', 'habrá llovido', '-', '-', '-']
        },
        {
          cjid: 'cpef',
          cjfs: ['-', '-', 'habría llovido', '-', '-', '-']
        },
        {
          cjid: 'ppfs',
          cjfs: ['-', '-', 'haya llovido', '-', '-', '-']
        },
        {
          cjid: 'ppss1',
          cjfs: ['-', '-', 'hubiera llovido', '-', '-', '-']
        },
        {
          cjid: 'ppss2',
          cjfs: ['-', '-', 'hubiese llovido', '-', '-', '-']
        },
        {
          cjid: 'fpsb',
          cjfs: ['-', '-', 'hubiere llovido', '-', '-', '-']
        },
        {
          cjid: 'impf',
          cjfs: ['-', '-', '-', '-', '-', '-']
        }
      ]
    },
    shortdef: ['to rain', 'to rain down, to shower']
  },
  {
    meta: {
      id: 'cantaro',
      uuid: 'e7c6cee5-66c3-471d-afc3-5d554a294693',
      lang: 'es',
      sort: '2603859000',
      src: 'spanish',
      section: 'alpha',
      stems: ['cántaro', 'llover a cántaros'],
      offensive: false
    },
    hwi: {
      hw: 'cántaro',
      prs: [
        {
          sound: {
            audio: 'canta03sp'
          }
        }
      ]
    },
    fl: 'masculine noun',
    def: [
      {
        sseq: [
          [
            [
              'sense',
              {
                sn: '1',
                dt: [['text', '{bc}{a_link|pitcher}, {a_link|jug}']]
              }
            ]
          ],
          [
            [
              'sense',
              {
                sn: '2',
                vrs: [
                  {
                    va: 'llover a cántaros'
                  }
                ],
                sls: ['familiar'],
                dt: [['text', '{bc}to rain cats and dogs']]
              }
            ]
          ]
        ]
      }
    ],
    shortdef: ['pitcher, jug', 'to rain cats and dogs']
  }
];

export default llover;
