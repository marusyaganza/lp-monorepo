import { GameProps } from '../types/gameTypes';
import { Game, GameData } from '../generated/graphql';

export const gameData: Record<Game, Partial<GameProps>> = {
  [Game.Audio]: {
    task: "Type the word that you've heard",
    question: [
      'https://media.merriam-webster.com/audio/prons/en/us/mp3/w/wheel001.mp3'
    ]
  },
  [Game.TypeWord]: {
    task: 'Type a word that means',
    question: [
      'a circular frame of hard material that may be solid, partly solid, or spoked and that is capable of turning on an axle',
      'a contrivance or apparatus having as its principal part a wheel: such as',
      'a chiefly medieval instrument of torture designed for mutilating a victim (as by stretching or disjointing)'
    ],
    audioUrl:
      'https://media.merriam-webster.com/audio/prons/en/us/mp3/w/wheel001.mp3'
  },
  [Game.SelectWord]: {
    task: 'Select a word that means',
    question: [
      'a circular frame of hard material that may be solid, partly solid, or spoked and that is capable of turning on an axle',
      'a contrivance or apparatus having as its principal part a wheel: such as',
      'a chiefly medieval instrument of torture designed for mutilating a victim (as by stretching or disjointing)'
    ],
    options: ['forefront', 'name', 'apple', 'wheel', 'pear', 'steep'],
    audioUrl:
      'https://media.merriam-webster.com/audio/prons/en/us/mp3/w/wheel001.mp3'
  },
  [Game.SelectDef]: {
    task: 'Select a definition that means',
    question: ['wheel'],
    options: [
      'a person or thing that is different from or in a position away from others in the group',
      'a small piece of rubber or other material that is used to erase something you have written or drawn —called also (British) rubber',
      'to get information or a reaction from somebody, often with difficulty.',
      'a brief authoritative formula of religious belief',
      'a circular frame of hard material that may be solid, partly solid, or spoked and that is capable of turning on an axle',
      'a cat or kitten : pussycat—used especially by children or when talking to children'
    ],
    audioUrl:
      'https://media.merriam-webster.com/audio/prons/en/us/mp3/w/wheel001.mp3'
  },
  [Game.Conjugation]: {
    task: 'Conjugate the verb',
    question: ['caer'],
    audioUrl:
      'https://media.merriam-webster.com/audio/prons/es/me/mp3/c/caer001sp.mp3'
  }
};

export const gameEngineData: Record<Game, GameData> = {
  [Game.Audio]: {
    questions: [
      {
        wordId: '6603d16fe14de030ec624fd6',
        question: [
          'https://media.merriam-webster.com/audio/prons/es/me/mp3/a/aprox01sp.mp3'
        ],
        options: null,
        answer: 'aproximado',
        alternativeSpelling: null,
        additionalInfo: {
          imgUrl: null,
          shortDef: '<b>aproximado means</b> approximate, estimated',
          examples: []
        }
      },
      {
        wordId: '660675a2e14de030ec625087',
        question: [
          'https://media.merriam-webster.com/audio/prons/es/me/mp3/t/tanto01sp.mp3'
        ],
        options: null,
        answer: 'tanto',
        alternativeSpelling: null,
        additionalInfo: {
          imgUrl: null,
          shortDef: '<b>tanto means</b> so much',
          examples: [
            {
              text: 'te quiero tanto',
              translation: 'I love you so much'
            },
            {
              text: 'ha cambiado tanto que no lo reconocí',
              translation: "he has changed so much that I didn't recognize him"
            },
            {
              text: 'tanto mejor',
              translation: 'so much the better'
            },
            {
              text: '¿por qué te tardaste tanto?',
              translation: 'why did you take so long?'
            },
            {
              text: 'trabajo tanto como ella',
              translation: 'I work as much as she does'
            }
          ]
        }
      },
      {
        wordId: '660675f3e14de030ec62508d',
        question: [
          'https://media.merriam-webster.com/audio/prons/es/me/mp3/a/apena02sp.mp3'
        ],
        options: null,
        answer: 'apenas',
        alternativeSpelling: null,
        additionalInfo: {
          imgUrl: '',
          shortDef: '<b>apenas means</b> hardly, scarcely',
          examples: [
            {
              text: 'apenas superan las seis horas de sueño',
              translation: 'they barely get more than six hours of sleep'
            }
          ]
        }
      }
    ],
    task: "Type the word that you've heard",
    type: Game.Audio
  },
  [Game.SelectDef]: {
    questions: [
      {
        wordId: '6728ad2fd3ab9c18a610d9f8',
        question: ['esconder'],
        options: [
          'driver',
          'British',
          'to verify, to check',
          'Iran',
          'such, such a, like that',
          'ocultar : to hide, to conceal'
        ],
        answer: 'ocultar : to hide, to conceal',
        alternativeSpelling: null,
        additionalInfo: {
          audioUrl:
            'https://media.merriam-webster.com/audio/prons/es/me/mp3/e/escon01sp.mp3',
          imgUrl: null,
          examples: []
        }
      },
      {
        wordId: '672a01e2d3ab9c18a6110639',
        question: ['titulación'],
        options: [
          'Moroccan',
          'institute',
          'elegir, seleccionar : to choose, to select',
          'degree, qualification',
          'Poland',
          'Swedish'
        ],
        answer: 'degree, qualification',
        alternativeSpelling: null,
        additionalInfo: {
          audioUrl:
            'https://voice.reverso.net/RestPronunciation.svc/v1/output=json/GetVoiceStream/voiceName=Maria22k?voiceSpeed=80&inputText=dGl0dWxhY2nDs24=',
          imgUrl: '',
          examples: [
            {
              text: '¿Qué titulación tiene?',
              translation: 'What qualifications do you have?'
            }
          ]
        }
      },
      {
        wordId: '672a02b8d3ab9c18a6110669',
        question: ['atraco'],
        options: [
          'United Kingdom',
          'holdup, robbery',
          'architect',
          'salesperson, salesman saleswoman',
          'Iran',
          'directory, guidebook'
        ],
        answer: 'holdup, robbery',
        alternativeSpelling: null,
        additionalInfo: {
          audioUrl:
            'https://media.merriam-webster.com/audio/prons/es/me/mp3/a/atrac02sp.mp3',
          imgUrl: null,
          examples: []
        }
      }
    ],
    task: 'Select a definition that means ',
    type: Game.SelectDef
  },
  [Game.SelectWord]: {
    questions: [
      {
        wordId: '66d060e0e7ad79ccfd31963a',
        question: ['blando : soft', 'liso : smooth', 'gentle, mild'],
        options: [
          'comprobar',
          'suave',
          'Sudáfrica',
          'sueco',
          'futbolista',
          'guía'
        ],
        answer: 'suave',
        alternativeSpelling: null,
        additionalInfo: {
          audioUrl: null,
          imgUrl: null,
          examples: []
        }
      },
      {
        wordId: '66d0613ee7ad79ccfd319644',
        question: ['remote'],
        options: [
          'polaco',
          'sueco',
          'Suecia',
          'Marruecos',
          'británico',
          'alejado'
        ],
        answer: 'alejado',
        alternativeSpelling: null,
        additionalInfo: {
          audioUrl:
            'https://media.merriam-webster.com/audio/prons/es/me/mp3/a/aleja01sp.mp3',
          imgUrl: null,
          examples: []
        }
      },
      {
        wordId: '66d0629fe7ad79ccfd31966c',
        question: ['guerrero : war, fighting, military'],
        options: [
          'portugués',
          'Sudáfrica',
          'científico',
          'Polonia',
          'bélico',
          'arquitecto'
        ],
        answer: 'bélico',
        alternativeSpelling: null,
        additionalInfo: {
          audioUrl:
            'https://media.merriam-webster.com/audio/prons/es/me/mp3/b/belic02sp.mp3',
          imgUrl: null,
          examples: [
            {
              text: 'conflicto bélico',
              translation: 'armed conflict'
            }
          ]
        }
      }
    ],
    task: 'Select a word that means ',
    type: Game.SelectWord
  },
  [Game.TypeWord]: {
    questions: [
      {
        wordId: '6718db19d3ab9c18a61064e9',
        question: ['to fatten, to fatten up', 'to gain weight'],
        options: null,
        answer: 'engordar',
        alternativeSpelling: null,
        additionalInfo: {
          audioUrl:
            'https://media.merriam-webster.com/audio/prons/es/me/mp3/e/engor01sp.mp3',
          imgUrl: '',
          examples: [
            {
              text: 'José Miguel ha engordado más de ocho kilos.',
              translation: 'José Miguel has gained more than eight kilos.'
            }
          ]
        }
      },
      {
        wordId: '6718dcd7d3ab9c18a6106647',
        question: ['bone', 'pit, stone (of a fruit)'],
        options: null,
        answer: 'hueso',
        alternativeSpelling: null,
        additionalInfo: {
          audioUrl:
            'https://media.merriam-webster.com/audio/prons/es/me/mp3/h/hueso01sp.mp3',
          imgUrl: '',
          examples: [
            {
              text: 'me dolían los huesos',
              translation: 'my bones ached'
            }
          ]
        }
      },
      {
        wordId: '6718e18fd3ab9c18a61066f1',
        question: ['to reflect, to think'],
        options: null,
        answer: 'reflexionar',
        alternativeSpelling: null,
        additionalInfo: {
          audioUrl:
            'https://media.merriam-webster.com/audio/prons/es/me/mp3/r/refle04sp.mp3',
          imgUrl: null,
          examples: []
        }
      }
    ],
    task: 'Type a word that means ',
    type: Game.TypeWord
  },
  [Game.Conjugation]: {
    questions: [
      {
        wordId: '66584d4f9147a842f6c018f2',
        question: ['espiar'],
        options: null,
        answer: 'espío, espías, espía, espiamos, espiáis, espían',
        alternativeSpelling: null,
        additionalInfo: {
          audioUrl:
            'https://media.merriam-webster.com/audio/prons/es/me/mp3/e/espia01sp.mp3',
          imgUrl: null,
          shortDef: '<b>espiar means</b> to spy on, to observe',
          examples: null
        }
      },
      {
        wordId: '66584d279147a842f6c018d9',
        question: ['enfadar'],
        options: null,
        answer: 'enfado, enfadas, enfada, enfadamos, enfadáis, enfadan',
        alternativeSpelling: null,
        additionalInfo: {
          audioUrl:
            'https://media.merriam-webster.com/audio/prons/es/me/mp3/e/enfad01sp.mp3',
          imgUrl: null,
          shortDef: '<b>enfadar means</b> to annoy, to make angry',
          examples: null
        }
      }
    ],
    task: 'Conjugate the verb in Presente indicativo',
    type: Game.Conjugation
  }
};
