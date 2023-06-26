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
                  ['text', 'def1'],
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
        sseq: []
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
    imgDesc: undefined,
    imgUrl: undefined,
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
        def: 'def1',
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
  },
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

export const hw = [
  {
    desc: 'with {bit} tag',
    arguments: '{bit}N{/bit}-al*lyl*nor*mor*phine',
    result: 'N-al*lyl*nor*mor*phine'
  },
  {
    desc: 'with normal string',
    arguments: 'bal*lot*ing',
    result: 'bal*lot*ing'
  },
  {
    desc: 'with undefined',
    arguments: undefined,
    result: undefined
  }
];

export const dictionaryEntities = [
  {
    desc: '{wi}',
    arguments: '{wi}do{/wi} a play',
    result: '<i>do</i> a play'
  },
  {
    desc: '{bc}',
    arguments: '{bc}to bring to pass',
    result: 'to bring to pass'
  },
  {
    desc: '{bc} and {d_link',
    arguments:
      '{bc}to approve especially by custom, opinion, or {d_link|propriety|propriety}',
    result: 'to approve especially by custom, opinion, or propriety'
  },
  {
    desc: '{dxt|',
    arguments: 'see also {dxt|doable||}',
    result: 'see also doable'
  },
  {
    desc: '{it}',
    arguments:
      'Middle English {it}don{/it}, from Old English {it}d\u014dn{/it}; akin to Old High German {it}tuon{/it} to do, Latin {it}-dere{/it} to put, {it}facere{/it} to make, do, Greek {it}tithenai{/it} to place, set',
    result:
      'Middle English <i>don</i>, from Old English <i>d\u014dn</i>; akin to Old High German <i>tuon</i> to do, Latin <i>-dere</i> to put, <i>facere</i> to make, do, Greek <i>tithenai</i> to place, set'
  },
  {
    desc: '{a_link',
    arguments: '{a_link|ammonia} by combination with',
    result: 'ammonia by combination with'
  },
  {
    desc: '{a_link array',
    arguments: '{a_link|ammonia|something|ammonia||} by combination with',
    result: 'ammonia, something by combination with'
  },
  {
    desc: 'complex tags multiple occurrences',
    arguments:
      '{a_link|ammonia|something|ammonia||} by combination with {dxt|doable||}',
    result: 'ammonia, something by combination with doable'
  },
  {
    desc: 'complex tags: multiple occurrences of the same tag',
    arguments:
      '{a_link|ammonia|something|ammonia||} by combination with {a_link|doable||}',
    result: 'ammonia, something by combination with doable'
  },
  {
    desc: 'complex tags: multiple occurrences of the same tag',
    arguments:
      '{a_link|ammonia|something|ammonia||} by combination with {a_link|doable||} {bc}{sx|car||}, {sx|automobile||}',
    result: 'ammonia, something by combination with doable car, automobile'
  },
  {
    desc: 'complex tags: with redundant numbers',
    arguments: '{bc}{sx|use||4} ',
    result: 'use'
  },
  {
    desc: 'complex tags: with multiple tags and redundant numbers',
    arguments: '{dx_def}see {dxt|draft:1||8}{/dx_def} for coastal bombardment',
    result: 'see draft for coastal bombardment'
  },
  {
    desc: '{ma}, {mat',
    arguments:
      'Latin, one that warns, overseer, from {it}mon\u0113re{/it} to warn {ma}{mat|mind|}{/ma}',
    result:
      'Latin, one that warns, overseer, from <i>mon\u0113re</i> to warn mind'
  },
  {
    desc: 'complex tag to be removed',
    arguments: 'before 12th century{ds|t|1|a|1}',
    result: 'before 12th century'
  },

  {
    desc: '{gloss}=}',
    arguments: '{gloss}=before{/gloss} 12th century',
    result: '<i>before</i> 12th century'
  },
  {
    desc: '{dx} and complex tags',
    arguments:
      '{bc}a bird of any kind {dx}compare {dxt|waterfowl||}, {dxt|wildfowl||}{/dx}',
    result: 'a bird of any kind compare waterfowl, wildfowl'
  },
  {
    desc: 'complex tag wirh multiple words inside',
    arguments:
      '{bc}any of several domesticated {dx_def}see {dxt|domesticate:1||2}{/dx_def} or wild {d_link|gallinaceous|gallinaceous} birds {dx}compare {dxt|guinea fowl||}, {dxt|jungle fowl||}{/dx}',
    result:
      'any of several domesticated see domesticate or wild gallinaceous birds compare guinea fowl, jungle fowl'
  },
  {
    desc: 'complex tag wirh multiple words inside and duplecates',
    arguments: ' {dx}see also {dxt|behind the wheel|behind the wheel|}{/dx}',
    result: 'see also behind the wheel'
  },
  {
    desc: 'complex tag wirh multiple words inside and duplecates',
    arguments: 'see also  {dx_ety}behind the wheel {/dx_ety}',
    result: 'see also behind the wheel'
  },
  {
    desc: '{inf}, {sup} and complex tag',
    arguments:
      '{bc}an ion NH{inf}4{/inf}{sup}+{/sup} derived from {a_link|ammonia} by combination with a hydrogen ion',
    result:
      'an ion NH4+ derived from ammonia by combination with a hydrogen ion'
  },
  {
    desc: '{rdquo}, {ldquo}',
    arguments:
      '{ldquo}Can I e-mail you?{rdquo} {ldquo}Sure. Our e-mail address is \u2018comments {it}at{/it} Merriam-Webster dot com.\u2019{rdquo}',
    result:
      '“Can I e-mail you?” “Sure. Our e-mail address is ‘comments <i>at</i> Merriam-Webster dot com.’”'
  },
  {
    desc: '{b}',
    arguments: 'Anything {b}verb{/b}{it}al{/it} is made up of spoken words.',
    result: 'Anything <b>verb</b><i>al</i> is made up of spoken words.'
  },
  {
    desc: '{rom}',
    arguments: 'Anything {rom}verb{/rom} of spoken words.',
    result: 'Anything verb of spoken words.'
  },
  {
    desc: '{sc}',
    arguments:
      '{sc}agree{/sc} {sc}concur{/sc} {sc}coincide{/sc} mean to come into or be in harmony',
    result:
      '<i>agree</i> <i>concur</i> <i>coincide</i> mean to come into or be in harmony'
  },
  {
    desc: '{parahw}',
    arguments: 'Using {parahw}above{/parahw} as an Adjective or Noun',
    result: 'Using </i>above</i> as an Adjective or Noun'
  },
  {
    desc: '{phrase}',
    arguments: '{phrase}In the absence of{/phrase} reform',
    result: '</i>In the absence of</i> reform'
  },
  {
    desc: '{qword}',
    arguments: 'white \u0022eyebrows,\u0022 and {qword}absence{/qword} of ear',
    result: 'white "eyebrows," and </i>absence</i> of ear'
  },
  {
    desc: '{itsc}',
    arguments: 'white and {itsc}absence{/itsc} of color',
    result: 'white and <i>absence</i> of color'
  }
];
