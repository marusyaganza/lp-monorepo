import {
  filterString,
  formatArray,
  getDefs,
  getAudioUrl,
  getImgUrl,
  formatDictionaryWord,
  formatData
} from '../../dictionary/formatData';
import {
  inputSpanish,
  outputSpanish,
  inputEnglish,
  outputEnglish,
  inputSuggestions,
  outputSuggestions
} from '../mocks/dictionaryData';

const testData = [
  {
    name: 'filterString',
    module: filterString,
    tests: [
      {
        desc: 'with empty arguments',
        arguments: undefined,
        result: undefined
      },
      {
        desc: 'with string of letters as an argument',
        arguments: 'rubber',
        result: 'rubber'
      },
      {
        desc: 'with string of letters and special characters and numbers as an argument',
        arguments: 'rubber:1',
        result: 'rubber'
      }
    ]
  },
  {
    name: 'formatArray',
    module: formatArray,
    tests: [
      {
        desc: 'with valid arguments',
        arguments: [
          [
            [
              ['a', '1'],
              ['b', '2'],
              ['c', '3']
            ]
          ]
        ],
        result: { a: '1', b: '2', c: '3' }
      },
      {
        desc: 'with empty array',
        arguments: [[]],
        result: {}
      },
      {
        desc: 'with empty args',
        arguments: undefined,
        result: {}
      },
      {
        desc: 'with empty object as argument',
        arguments: {},
        result: {}
      }
    ]
  },
  {
    name: 'getDefs',
    module: getDefs,
    tests: [
      {
        desc: 'with empty arguments',
        arguments: undefined,
        result: []
      },
      {
        desc: 'with valid spanish word',
        arguments: [inputSpanish[0].def],
        result: [{ def: 'def1' }]
      },
      {
        desc: 'with valid spanish word with examples',
        arguments: [inputSpanish[1].def],
        result: [{ def: 'def1} ', examples: ['ex1'] }]
      },
      {
        desc: 'with empty object',
        arguments: {},
        result: []
      },
      {
        desc: 'with empty array',
        arguments: [[]],
        result: []
      }
    ]
  },
  {
    name: 'getAudioUrl',
    module: getAudioUrl,
    tests: [
      {
        desc: 'with empty arguments',
        arguments: undefined,
        result: undefined
      },
      {
        desc: 'with valid spanish arg',
        arguments: ['hola001sp', 'es'],
        result: 'mock_audio_endpoint/es/me/mp3/h/hola001sp.mp3'
      },
      {
        desc: 'with valid spanish agr starts with gg',
        arguments: ['ggword', 'es'],
        result: 'mock_audio_endpoint/es/me/mp3/gg/ggword.mp3'
      },
      {
        desc: 'with valid spanish agr starts with bix',
        arguments: ['bix', 'es'],
        result: 'mock_audio_endpoint/es/me/mp3/bix/bix.mp3'
      },
      {
        desc: 'with valid spanish agr starts with number',
        arguments: ['1word', 'es'],
        result: 'mock_audio_endpoint/es/me/mp3/number/1word.mp3'
      },
      {
        desc: 'with valid spanish agr starts with symbol',
        arguments: ['_word', 'es'],
        result: 'mock_audio_endpoint/es/me/mp3/number/_word.mp3'
      },
      {
        desc: 'with valid english arg',
        arguments: ['happy001', 'en'],
        result: 'mock_audio_endpoint/en/us/mp3/h/happy001.mp3'
      },
      {
        desc: 'with valid english agr starts with gg',
        arguments: ['ggword'],
        result: 'mock_audio_endpoint/en/us/mp3/gg/ggword.mp3'
      },
      {
        desc: 'with valid english agr starts with bix',
        arguments: ['bix', 'en'],
        result: 'mock_audio_endpoint/en/us/mp3/bix/bix.mp3'
      },
      {
        desc: 'with valid spanish agr starts with number',
        arguments: '1word',
        result: 'mock_audio_endpoint/en/us/mp3/number/1word.mp3'
      },
      {
        desc: 'with valid english agr starts with symbol',
        arguments: ['_word', 'en'],
        result: 'mock_audio_endpoint/en/us/mp3/number/_word.mp3'
      }
    ]
  },
  {
    name: 'getImgUrl',
    module: getImgUrl,
    tests: [
      {
        desc: 'with empty arguments',
        arguments: undefined,
        result: undefined
      },
      {
        desc: 'with valid argument',
        arguments: 'image1',
        result: 'mock_img_endpoint/image1.gif'
      }
    ]
  },
  {
    name: 'formatDictionaryWord',
    module: formatDictionaryWord,
    tests: [
      {
        desc: 'with valid spanish word',
        arguments: inputSpanish[0],
        result: outputSpanish[0]
      },
      {
        desc: 'with valid spanish word with examples',
        arguments: inputSpanish[1],
        result: outputSpanish[1]
      },

      {
        desc: 'with valid english word',
        arguments: inputEnglish[0],
        result: outputEnglish[0]
      },
      {
        desc: 'with valid english word with examples',
        arguments: inputEnglish[1],
        result: outputEnglish[1]
      }
    ]
  },
  {
    name: 'formatData',
    module: formatData,
    tests: [
      {
        desc: 'with valid spanish words',
        arguments: [inputSpanish],
        result: outputSpanish
      },
      {
        desc: 'with suggestions array',
        arguments: [inputSuggestions],
        result: outputSuggestions
      },
      {
        desc: 'with valid english words',
        arguments: [inputEnglish],
        result: outputEnglish
      }
    ]
  }
];

testData.forEach(testModule => {
  describe(`dictionary ${testModule.name}`, () => {
    testModule.tests.forEach(testCase => {
      test(`${testCase.desc}`, () => {
        let result;
        if (Array.isArray(testCase.arguments)) {
          result = testModule.module(...testCase.arguments);
        } else {
          result = testModule.module(testCase.arguments);
        }
        expect(result).toEqual(testCase.result);
      });
    });
  });
});
