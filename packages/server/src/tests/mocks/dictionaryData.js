export const inputSpanish = [
  {
    meta: {
      id: 'hola',
      uuid: 'mockUuid',
      lang: 'es',
      stems: ['hola'],
      offensive: false
    },
    hwi: {
      hw: 'hola',
      prs: [
        {
          sound: {
            audio: 'hola001sp'
          }
        }
      ]
    },
    fl: 'interjection',
    def: [
      {
        sseq: [
          [
            [
              'sense',
              {
                dt: [['text', 'def1']]
              }
            ]
          ]
        ]
      }
    ],
    shortdef: ['hello!, hi!']
  },
  {
    meta: {
      id: 'idioma',
      uuid: 'mockUuid2',
      lang: 'es',
      stems: ['idioma'],
      offensive: false
    },
    hwi: {
      hw: 'idioma',
      prs: [
        {
          sound: {
            audio: 'idiom01sp'
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
                dt: [
                  ['text', 'def1} '],
                  [
                    'vis',
                    [
                      {
                        t: 'ex1',
                        tr: 'tr1'
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
    shortdef: ['language']
  }
];

export const outputSpanish = [
  {
    audioUrl: 'mock_audio_endpoint/es/me/mp3/h/hola001sp.mp3',
    defs: [
      {
        def: 'def1'
      }
    ],
    isOffensive: false,
    name: 'hola',
    particle: 'interjection',
    stems: ['hola'],
    transcription: 'hola',
    uuid: 'mockUuid'
  },
  {
    audioUrl: 'mock_audio_endpoint/es/me/mp3/i/idiom01sp.mp3',
    defs: [
      {
        def: 'def1} ',
        examples: ['ex1']
      }
    ],
    isOffensive: false,
    name: 'idioma',
    particle: 'masculine noun',
    stems: ['idioma'],
    transcription: 'idioma',
    uuid: 'mockUuid2'
  }
];

export const inputEnglish = [
  {
    meta: {
      id: 'pussy:1',
      uuid: 'mockUuid1',
      stems: ['pussy', 'pussies'],
      offensive: true
    },
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
    art: {
      artid: 'imageId',
      capt: 'image Descr'
    },
    def: [
      {
        sseq: [
          [
            [
              'sense',
              {
                sls: ['informal'],
                dt: [
                  ['text', 'def1'],
                  ['uns', [[['text', 'uns1']]]]
                ]
              }
            ]
          ]
        ]
      }
    ]
  },
  {
    meta: {
      id: 'egalitarian',
      uuid: 'mockUuid2',
      stems: ['egalitarian', 'egalitarians', 'egalitarianism'],
      offensive: false
    },
    hwi: {
      hw: 'egal*i*tar*i*an',
      prs: [
        {
          ipa: '\u026a\u02ccg\u00e6l\u0259\u02c8terij\u0259n',
          sound: {
            audio: 'egalit01'
          }
        }
      ]
    },
    fl: 'adjective',
    def: [
      {
        sseq: [
          [
            [
              'sense',
              {
                sls: ['formal'],
                dt: [
                  ['text', 'def1'],
                  [
                    'vis',
                    [
                      {
                        t: 'ex1'
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
    shortdef: ['aiming for equal wealth, status, etc., for all people']
  }
];

export const outputEnglish = [
  {
    audioUrl: 'mock_audio_endpoint/en/us/mp3/p/pussy001.mp3',
    defs: [
      {
        def: 'def1'
      }
    ],
    isOffensive: true,
    imgDesc: 'image Descr',
    imgUrl: 'mock_img_endpoint/imageId.gif',
    name: 'pussy',
    particle: 'noun',
    stems: ['pussy', 'pussies'],
    transcription: 'pussy',
    uuid: 'mockUuid1'
  },
  {
    audioUrl: 'mock_audio_endpoint/en/us/mp3/e/egalit01.mp3',
    defs: [
      {
        def: 'def1',
        examples: ['ex1']
      }
    ],
    isOffensive: false,
    name: 'egalitarian',
    particle: 'adjective',
    stems: ['egalitarian', 'egalitarians', 'egalitarianism'],
    transcription: 'egal*i*tar*i*an',
    uuid: 'mockUuid2'
  }
];

export const inputSuggestions = ['suggestions'];
export const outputSuggestions = [{ suggestions: ['suggestions'] }];
