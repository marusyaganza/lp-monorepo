const instruction = [
  {
    meta: {
      id: 'instruction',
      uuid: 'f2f69e11-1c48-4b82-b947-a10bf3bd6fc4',
      lang: 'en',
      sort: '2612792000',
      src: 'spanish',
      section: 'alpha',
      stems: ['instruction', 'instructions', 'instructional'],
      offensive: false
    },
    hwi: {
      hw: 'instruction',
      prs: [
        {
          mw: 'ɪnˈstrʌkʃ{it}ə{/it}n',
          sound: {
            audio: 'instru02'
          }
        }
      ]
    },
    fl: 'noun',
    def: [
      {
        sseq: [
          [
            [
              'sense',
              {
                sn: '1',
                dt: [
                  ['text', '{sx|teaching||} {bc}{a_link|instrucción} '],
                  ['gl', 'feminine'],
                  ['text', ', {a_link|enseñanza} '],
                  ['gl', 'feminine']
                ]
              }
            ]
          ],
          [
            [
              'sense',
              {
                sn: '2',
                dt: [
                  ['text', '{sx|command||} {bc}{a_link|orden} '],
                  ['gl', 'feminine'],
                  ['text', ', {a_link|instrucción} '],
                  ['gl', 'feminine']
                ]
              }
            ]
          ],
          [
            [
              'sense',
              {
                sn: '3',
                ins: [
                  {
                    if: 'instructions',
                    spl: 'noun plural'
                  }
                ],
                dt: [
                  ['text', '{sx|directions||} {bc}instrucciones '],
                  ['gl', 'feminine plural'],
                  ['text', ', {a_link|modo} '],
                  ['gl', 'masculine'],
                  ['text', ' de empleo']
                ]
              }
            ]
          ]
        ]
      }
    ],
    shortdef: [
      'teaching : instrucción, enseñanza',
      'command : orden, instrucción',
      'directions : instrucciones, modo de empleo'
    ]
  }
];

export default instruction;
