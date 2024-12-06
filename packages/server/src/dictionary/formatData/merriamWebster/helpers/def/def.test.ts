import { formatDictionaryEntity, getDefs, getDefFromRef } from './def';
import {
  dictionaryEntities,
  inputEnglish,
  inputEnglishWithExamples,
  inputEnglishWithoutDefs,
  inputSpanisWithExamples,
  inputSpanish,
  outputEnglish,
  outputEnglishWithExamples,
  outputEnglishWithoutDefs,
  outputSpanish,
  outputSpanishWithExamples
} from './test.data';

const testData = [
  {
    name: 'formatDictionaryEntity formats string with',
    module: formatDictionaryEntity,
    tests: dictionaryEntities
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
        desc: 'with valid English word',
        arguments: inputEnglish,
        result: outputEnglish
      },
      {
        desc: 'with valid English word with examples',
        arguments: inputEnglishWithExamples,
        result: outputEnglishWithExamples
      },
      {
        desc: 'with valid Spanish word',
        arguments: inputSpanish,
        result: outputSpanish
      },
      {
        desc: 'with valid Spanish word with examples',
        arguments: inputSpanisWithExamples,
        result: outputSpanishWithExamples
      },
      {
        desc: 'with empty array',
        arguments: [],
        result: []
      }
      //   {
      //     desc: 'with data without def',
      //     arguments: [undefined, inputEnglishWithoutDefs[0].cxs],
      //     result: [{ def: 'chiefly dialectal variant of <i>murder</i>' }]
      //   }
    ]
  },
  {
    name: 'getDefFromRef',
    module: getDefFromRef,
    tests: [
      {
        desc: 'with empty arguments',
        arguments: undefined,
        result: []
      },
      {
        desc: 'with empty array',
        arguments: [],
        result: []
      },
      {
        desc: 'with data without def',
        arguments: inputEnglishWithoutDefs,
        result: outputEnglishWithoutDefs
      }
    ]
  }
];

testData.forEach(testModule => {
  describe(`formatData helpers ${testModule.name}`, () => {
    testModule.tests.forEach(testCase => {
      test(`${testCase.desc}`, () => {
        const result = testModule.module(testCase.arguments);
        expect(result).toEqual(testCase.result);
      });
    });
  });
});
