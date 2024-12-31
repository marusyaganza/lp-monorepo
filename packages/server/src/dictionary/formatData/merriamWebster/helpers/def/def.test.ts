import {
  formatDictionaryEntity,
  getDefs,
  getDefFromRef,
  extractDef,
  extractExamples
} from './def';
import {
  complexDt,
  dictionaryEntities,
  dtWithComplexExample,
  dtWithComplexExampleOutput,
  dtWithoutText,
  inputEnglish,
  inputEnglishWithExamples,
  inputEnglishWithoutDefs,
  inputSpanisWithExamples,
  inputSpanish,
  multipleExamplesOutput,
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
  },
  {
    name: 'extractDef',
    module: extractDef,
    tests: [
      {
        desc: 'with empty arguments',
        arguments: undefined,
        result: undefined
      },
      {
        desc: 'with empty array',
        arguments: [],
        result: ''
      },
      {
        desc: 'with data without def',
        arguments: dtWithoutText,
        result: ''
      },
      {
        desc: 'with complex tags',
        arguments: complexDt,
        result: 'directions instrucciones, modo, de empleo'
      }
    ]
  },
  {
    name: 'extractExamples',
    module: extractExamples,
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
        desc: 'with data without examples',
        arguments: dtWithoutText,
        result: []
      },
      {
        desc: 'with multiple examples',
        arguments: complexDt,
        result: multipleExamplesOutput
      },
      {
        desc: 'with complex tags',
        arguments: dtWithComplexExample,
        result: dtWithComplexExampleOutput
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
