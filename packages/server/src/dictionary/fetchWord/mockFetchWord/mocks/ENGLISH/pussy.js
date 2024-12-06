export const pussy = [
  {
    meta: {
      id: 'pussy:1',
      uuid: 'c91cd8a3-fb36-4d1c-ba29-69616ea042bd',
      src: 'learners',
      section: 'alpha',
      stems: ['pussy', 'pussies'],
      'app-shortdef': {
        hw: 'pussy:1',
        fl: 'noun',
        def: ['{it}informal{/it} {bc} a cat or kitten']
      },
      offensive: false
    },
    hom: 1,
    hwi: {
      hw: 'pussy',
      prs: [
        {
          ipa: '\u02c8p\u028asi',
          sound: {
            audio: 'pussy001'
          }
        }
      ]
    },
    fl: 'noun',
    ins: [
      {
        il: 'plural',
        if: 'puss*ies'
      }
    ],
    gram: 'count',
    def: [
      {
        sseq: [
          [
            [
              'sense',
              {
                sls: ['informal'],
                dt: [
                  ['text', '{bc}a cat or kitten {bc}{sx|pussycat||}'],
                  [
                    'uns',
                    [
                      [
                        [
                          'text',
                          'used especially by children or when talking to children'
                        ]
                      ]
                    ]
                  ]
                ]
              }
            ]
          ]
        ]
      }
    ],
    dxnls: ['compare {dxt|pussy:2||} {dxt|pussy:3||}'],
    shortdef: [
      'a cat or kitten : pussycat\u2014used especially by children or when talking to children'
    ]
  },
  {
    meta: {
      id: 'pussy:2',
      uuid: 'f887bf9e-318a-42ec-a102-1db402daba7d',
      src: 'learners',
      section: 'alpha',
      stems: ['pussy', 'pussies'],
      'app-shortdef': {
        hw: 'pussy:2',
        fl: 'noun',
        def: [
          '{it}informal + offensive{/it} {bc} a woman\u0027s sex organs {it}also{/it} {bc} sexual intercourse with a woman'
        ]
      },
      offensive: true
    },
    hom: 2,
    hwi: {
      hw: 'pus*sy',
      prs: [
        {
          ipa: '\u02c8p\u028asi',
          sound: {
            audio: 'pussy002'
          }
        }
      ]
    },
    fl: 'noun',
    ins: [
      {
        il: 'plural',
        if: 'pus*sies'
      }
    ],
    gram: 'count',
    def: [
      {
        sseq: [
          [
            [
              'sense',
              {
                sls: ['informal + offensive'],
                dt: [['text', '{bc}a woman\u0027s sex organs']],
                sdsense: {
                  sd: 'also',
                  dt: [
                    ['text', '{bc}sexual intercourse with a woman '],
                    [
                      'snote',
                      [
                        [
                          't',
                          'These uses of {it}pussy{/it} are very offensive and should be avoided.'
                        ]
                      ]
                    ]
                  ]
                }
              }
            ]
          ]
        ]
      }
    ],
    dxnls: ['compare {dxt|pussy:1||} {dxt|pussy:3||}'],
    shortdef: [
      'a woman\u0027s sex organs; also : sexual intercourse with a woman'
    ]
  },
  {
    meta: {
      id: 'pussy:3',
      uuid: '02634a21-9c62-42a7-bb95-a9340bac9878',
      src: 'learners',
      section: 'alpha',
      stems: ['pussy', 'pussies'],
      'app-shortdef': {
        hw: 'pussy:3',
        fl: 'noun',
        def: [
          '{it}chiefly US{/it}, {it}informal + impolite{/it} {bc} a weak and cowardly man'
        ]
      },
      offensive: false
    },
    hom: 3,
    hwi: {
      hw: 'pus*sy',
      prs: [
        {
          ipa: '\u02c8p\u028asi',
          sound: {
            audio: 'pussy002'
          }
        }
      ]
    },
    fl: 'noun',
    ins: [
      {
        il: 'plural',
        if: 'pus*sies'
      }
    ],
    gram: 'count',
    def: [
      {
        sseq: [
          [
            [
              'sense',
              {
                sls: ['chiefly US', 'informal + impolite'],
                dt: [
                  ['text', '{bc}a weak and cowardly man {bc}{sx|sissy||} '],
                  [
                    'vis',
                    [
                      {
                        t: 'He got into a fight when someone called him a {it}pussy{/it}.'
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
    dxnls: ['compare {dxt|pussy:1||} {dxt|pussy:2||}'],
    shortdef: ['a weak and cowardly man : sissy']
  },
  {
    meta: {
      id: 'pussy willow',
      uuid: '7819488a-f01c-4a14-bd0c-33511d408c9d',
      src: 'learners',
      section: 'alpha',
      target: {
        tuuid: '3c73e346-6eba-48f4-80c3-6e4159de3d81',
        tsrc: 'collegiate'
      },
      stems: ['pussy willow', 'pussy willows'],
      'app-shortdef': {
        hw: 'pussy willow',
        fl: 'noun',
        def: [
          '{bc} a small tree with large, soft flowers {it}also{/it} {bc} the flower of this tree'
        ]
      },
      offensive: false
    },
    hwi: {
      hw: 'pussy willow'
    },
    fl: 'noun',
    ins: [
      {
        il: 'plural',
        ifc: '~ -lows',
        if: 'pussy willows'
      }
    ],
    gram: 'count',
    def: [
      {
        sseq: [
          [
            [
              'sense',
              {
                dt: [['text', '{bc}a small tree with large, soft flowers']],
                sdsense: {
                  sd: 'also',
                  dt: [['text', '{bc}the flower of this tree']]
                }
              }
            ]
          ]
        ]
      }
    ],
    shortdef: [
      'a small tree with large, soft flowers; also : the flower of this tree'
    ]
  }
];
export default pussy;
