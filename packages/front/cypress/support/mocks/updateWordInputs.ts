import { Language, NewWordInput } from '../../../src/generated/graphql';

export const fullInitialWord: Record<Language, Partial<NewWordInput>> = {
  [Language.English]: {
    transcription: 'ˈ(h)wēl',
    particle: 'noun',
    name: 'wheel',
    isLearned: false,
    imgUrl: 'https://merriam-webster.com/assets/mw/static/art/dict/wheel.gif',
    defs: [
      {
        def: 'a circular frame of hard material that may be solid, partly solid, or spoked and that is capable of turning on an axle'
      },
      {
        examples: [
          {
            text: '… drivers are expected to keep their hands on the <i>wheel</i> and remain attentive …'
          }
        ],
        def: 'steering wheel, see also behind the wheel'
      },
      {
        def: 'a recurring course, development, or action cycle'
      },
      {
        def: 'something (such as a round, flat cheese) resembling a wheel in shape'
      },
      {
        def: 'a rotation or turn usually about an axis or center'
      },
      {
        examples: [
          {
            text: 'a big <i>wheel</i>'
          }
        ],
        def: 'a person of importance especially in an organization'
      },
      {
        def: 'the refrain or burden of a song'
      },
      {
        def: 'a sports league'
      },
      {
        def: 'a wheeled vehicle'
      },
      {
        def: 'legs'
      }
    ],
    audioUrl:
      'https://media.merriam-webster.com/audio/prons/en/us/mp3/w/wheel001.mp3',
    imgDesc:
      'wheel 1: <i>1</i> hub, <i>2</i> spoke, <i>3</i> felly, <i>4</i> tire',
    shortDef: [
      'a circular frame of hard material that may be solid, partly solid, or spoked and that is capable of turning on an axle',
      'a contrivance or apparatus having as its principal part a wheel: such as',
      'a chiefly medieval instrument of torture designed for mutilating a victim (as by stretching or disjointing)'
    ]
  },
  [Language.Spanish]: {
    transcription: 'así',
    particle: 'adverb',
    name: 'así',
    isLearned: false,
    defs: [
      {
        examples: [
          {
            text: 'así se hace',
            translation: "that's how it's done"
          },
          {
            text: 'no puede seguir así',
            translation: "it can't go on like this"
          },
          {
            text: 'así sea',
            translation: 'so be it'
          },
          {
            text: 'y así sucesivamente',
            translation: 'and so on'
          }
        ],
        def: 'like this, like that, so'
      },
      {
        def: 'so-so, fair'
      },
      {
        def: 'as well as'
      },
      {
        def: 'just like that'
      },
      {
        examples: [
          {
            text: 'una caja así de grande',
            translation: 'a box about so big'
          }
        ],
        def: 'so, about so'
      },
      {
        def: 'so, therefore'
      },
      {
        def: 'even so'
      }
    ],
    audioUrl:
      'https://media.merriam-webster.com/audio/prons/es/me/mp3/a/asi0001sp.mp3',
    shortDef: ['like this, like that, so', 'so-so, fair', 'as well as']
  }
};

export const fullWordUpdate: Record<Language, Partial<NewWordInput>> = {
  [Language.English]: {
    tags: ['Tag1'],
    shortDef: [
      'a flat, round part in a machine',
      'the round object used for controlling the direction in which a car, etc. or ship moves'
    ],
    defs: [
      {
        def: 'one of the round objects under a car, bicycle, bus, etc. that turns when it moves',
        examples: [
          {
            text: 'He braked suddenly, causing the front wheels to skid.'
          },
          {
            text: 'She was killed when she was crushed under the wheels of a bus.'
          }
        ]
      },
      {
        def: '[plural] (of something) an organization or a system that seems to work like a complicated machine that is difficult to understand'
      }
    ]
  },

  [Language.Spanish]: {
    tags: ['Etiqueta3'],
    shortDef: ['therefore', 'thereby'],
    defs: [
      {
        def: 'thereby',
        examples: [
          {
            text: 'Llevaremos a todos en autobús al lugar de la boda, así nadie se perderá.',
            translation:
              'We will take everyone by bus to the wedding venue so no one gets lost.'
          },
          {
            text: 'Hasta los mejores planes pueden salir mal; así es la vida.',
            translation:
              'Even the best plans can go wrong; thus, these things happen.'
          }
        ]
      },
      { def: 'this way' }
    ]
  }
};

export const fullWordResult: Record<Language, Partial<NewWordInput>> = {
  [Language.English]: {
    tags: ['Tag1'],
    transcription: 'ˈ(h)wēl',
    particle: 'noun',
    name: 'wheel',
    isLearned: false,
    imgUrl: 'https://merriam-webster.com/assets/mw/static/art/dict/wheel.gif',
    defs: [
      {
        def: 'a circular frame of hard material that may be solid, partly solid, or spoked and that is capable of turning on an axle'
      },
      {
        examples: [
          {
            text: '… drivers are expected to keep their hands on the wheel and remain attentive …'
          }
        ],
        def: 'see also behind the wheel'
      },
      {
        def: 'a recurring course, development, or action cycle'
      },
      {
        def: 'something (such as a round, flat cheese) resembling a wheel in shape'
      },
      {
        def: 'a rotation or turn usually about an axis or center'
      },
      {
        examples: [
          {
            text: 'a big wheel'
          }
        ],
        def: 'a person of importance especially in an organization'
      },
      {
        def: 'the refrain or burden of a song'
      },
      {
        def: 'a sports league'
      },
      {
        def: 'a wheeled vehicle'
      },
      {
        def: 'legs'
      },
      {
        def: 'one of the round objects under a car, bicycle, bus, etc. that turns when it moves',
        examples: [
          {
            text: 'He braked suddenly, causing the front wheels to skid.'
          },
          {
            text: 'She was killed when she was crushed under the wheels of a bus.'
          }
        ]
      },
      {
        def: '[plural] (of something) an organization or a system that seems to work like a complicated machine that is difficult to understand'
      }
    ],
    audioUrl:
      'https://media.merriam-webster.com/audio/prons/en/us/mp3/w/wheel001.mp3',
    imgDesc: 'wheel 1: 1 hub, 2 spoke, 3 felly, 4 tire',
    shortDef: [
      'a circular frame of hard material that may be solid, partly solid, or spoked and that is capable of turning on an axle',
      'a contrivance or apparatus having as its principal part a wheel: such as',
      'a chiefly medieval instrument of torture designed for mutilating a victim (as by stretching or disjointing)',
      'a flat, round part in a machine',
      'the round object used for controlling the direction in which a car, etc. or ship moves'
    ]
  },
  [Language.Spanish]: {
    tags: ['Etiqueta3'],
    transcription: 'así',
    particle: 'adverb',
    name: 'así',
    isLearned: false,
    defs: [
      {
        examples: [
          {
            text: 'así se hace',
            translation: "that's how it's done"
          },
          {
            text: 'no puede seguir así',
            translation: "it can't go on like this"
          },
          {
            text: 'así sea',
            translation: 'so be it'
          },
          {
            text: 'y así sucesivamente',
            translation: 'and so on'
          }
        ],
        def: 'like this, like that, so'
      },
      {
        def: 'so-so, fair'
      },
      {
        def: 'as well as'
      },
      {
        def: 'just like that'
      },
      {
        examples: [
          {
            text: 'una caja así de grande',
            translation: 'a box about so big'
          }
        ],
        def: 'so, about so'
      },
      {
        def: 'so, therefore'
      },
      {
        def: 'even so'
      },
      {
        def: 'thereby',
        examples: [
          {
            text: 'Llevaremos a todos en autobús al lugar de la boda, así nadie se perderá.',
            translation:
              'We will take everyone by bus to the wedding venue so no one gets lost.'
          },
          {
            text: 'Hasta los mejores planes pueden salir mal; así es la vida.',
            translation:
              'Even the best plans can go wrong; thus, these things happen.'
          }
        ]
      },
      { def: 'this way' }
    ],
    audioUrl:
      'https://media.merriam-webster.com/audio/prons/es/me/mp3/a/asi0001sp.mp3',
    shortDef: [
      'like this, like that, so',
      'so-so, fair',
      'as well as',
      'therefore',
      'thereby'
    ]
  }
};

export const minInitialWord: Record<Language, Partial<NewWordInput>> = {
  [Language.English]: {
    transcription: 'wheel animal',
    particle: 'noun',
    name: 'wheel animal',
    isLearned: false,
    defs: [
      {
        def: 'rotifer'
      }
    ],
    shortDef: ['rotifer']
  },
  [Language.Spanish]: {
    transcription: 'costal',
    particle: 'masculine noun',
    name: 'costal',
    isLearned: false,
    defs: [
      {
        def: 'sack'
      }
    ],
    shortDef: ['sack']
  }
};

export const minWordResult: Record<Language, Partial<NewWordInput>> = {
  [Language.English]: {
    transcription: 'wheel animal',
    particle: 'noun',
    name: 'wheel animal',
    isLearned: false,
    imgUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Mikrofoto.de-Raedertier-14.jpg/440px-Mikrofoto.de-Raedertier-14.jpg',
    imgDesc: 'Bdelloid rotifer',
    audioUrl:
      'https://voice.reverso.net/RestPronunciation.svc/v1/output=json/GetVoiceStream/voiceName=Heather22k?voiceSpeed=100&inputText=d2hlZWwgYW5pbWFs',
    defs: [
      {
        def: 'rotifer'
      },
      {
        examples: [
          {
            text: 'Most rotifers are around 0.1–0.5 mm (0.0039–0.0197 in) long (although their size can range from 50 μm (0.0020 in) to over 2 mm (0.079 in))'
          },
          {
            text: 'Some rotifers are free swimming and truly planktonic, others move by inchworming along a substrate'
          }
        ],
        def: 'Any of various microscopic aquatic invertebrate animals of the phylum Rotifera, having at the head end a wheellike ring of cilia used for feeding and locomotion.'
      }
    ],
    shortDef: [
      'rotifer',
      'microscopic and near-microscopic pseudocoelomate animals'
    ],
    tags: ['Tag3']
  },
  [Language.Spanish]: {
    transcription: 'costal',
    particle: 'masculine noun',
    name: 'costal',
    isLearned: false,
    audioUrl:
      'https://voice.reverso.net/RestPronunciation.svc/v1/output=json/GetVoiceStream/voiceName=Maria22k?voiceSpeed=80&inputText=Y29zdGFs',
    imgUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Coffee_beans_at_Longbottom_-_Hillsboro%2C_Oregon.JPG/1024px-Coffee_beans_at_Longbottom_-_Hillsboro%2C_Oregon.JPG',
    imgDesc: 'Pila de Costales en estibas',
    defs: [
      {
        def: 'sack'
      },
      {
        def: 'rib',
        examples: [
          {
            text: 'Con esta técnica, se extraen pequeñas secciones de cartílago costal.',
            translation:
              'With this technique, small sections of rib cartilage are removed.'
          }
        ]
      }
    ],
    shortDef: ['sack', 'bag', 'costal'],
    tags: ['Etiqueta3']
  }
};

export const minWordUpdate: Record<Language, Partial<NewWordInput>> = {
  [Language.English]: {
    imgUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Mikrofoto.de-Raedertier-14.jpg/440px-Mikrofoto.de-Raedertier-14.jpg',
    imgDesc: 'Bdelloid rotifer',
    audioUrl:
      'https://voice.reverso.net/RestPronunciation.svc/v1/output=json/GetVoiceStream/voiceName=Heather22k?voiceSpeed=100&inputText=d2hlZWwgYW5pbWFs',
    defs: [
      {
        examples: [
          {
            text: 'Most rotifers are around 0.1–0.5 mm (0.0039–0.0197 in) long (although their size can range from 50 μm (0.0020 in) to over 2 mm (0.079 in))'
          },
          {
            text: 'Some rotifers are free swimming and truly planktonic, others move by inchworming along a substrate'
          }
        ],
        def: 'Any of various microscopic aquatic invertebrate animals of the phylum Rotifera, having at the head end a wheellike ring of cilia used for feeding and locomotion.'
      }
    ],
    shortDef: ['microscopic and near-microscopic pseudocoelomate animals'],
    tags: ['Tag3']
  },
  [Language.Spanish]: {
    audioUrl:
      'https://voice.reverso.net/RestPronunciation.svc/v1/output=json/GetVoiceStream/voiceName=Maria22k?voiceSpeed=80&inputText=Y29zdGFs',
    imgUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Coffee_beans_at_Longbottom_-_Hillsboro%2C_Oregon.JPG/1024px-Coffee_beans_at_Longbottom_-_Hillsboro%2C_Oregon.JPG',
    imgDesc: 'Pila de Costales en estibas',
    defs: [
      {
        def: 'rib',
        examples: [
          {
            text: 'Con esta técnica, se extraen pequeñas secciones de cartílago costal.',
            translation:
              'With this technique, small sections of rib cartilage are removed.'
          }
        ]
      }
    ],
    shortDef: ['bag', 'costal'],
    tags: ['Etiqueta3']
  }
};
