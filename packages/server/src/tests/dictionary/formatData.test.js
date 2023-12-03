import { formatDictionaryWord, formatData } from '../../dictionary/formatData';

import {
  inputSpanish,
  inputEnglishWithoutDefs,
  outputSpanish,
  inputEnglish,
  outputEnglish,
  inputSuggestions,
  outputSuggestions,
  outputEnglishWithoutDefs
} from '../mocks/dictionaryData';

const testData = [
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
        desc: 'with empty sseq array',
        arguments: inputSpanish[2],
        result: undefined
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
      },
      {
        desc: 'with no particle property',
        arguments: inputEnglish[2],
        result: outputEnglish[2]
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
      },
      {
        desc: 'with valid english word without def',
        arguments: [inputEnglishWithoutDefs],
        result: outputEnglishWithoutDefs
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
