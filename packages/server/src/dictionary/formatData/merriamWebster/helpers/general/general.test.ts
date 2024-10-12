import { REPLACEMENT_MAP } from '../../constants';
import { filterString, formatArray, formatReplace, isNumber } from './general';

const testData = [
  {
    name: 'filterString',
    module: filterString,
    tests: [
      {
        desc: 'with empty arguments',
        arguments: [undefined],
        result: undefined
      },
      {
        desc: 'with string of letters as an argument',
        arguments: ['rubber'],
        result: 'rubber'
      },
      {
        desc: 'with string of letters and special characters and numbers as an argument',
        arguments: ['rubber:1'],
        result: 'rubber'
      }
    ]
  },
  {
    name: 'isNumber',
    module: isNumber,
    tests: [
      {
        desc: 'with empty arguments',
        arguments: [undefined],
        result: false
      },
      {
        desc: 'with a number',
        arguments: [22],
        result: false
      },
      {
        desc: 'with a string numbber',
        arguments: ['77'],
        result: false
      },
      {
        desc: 'with a string of letters',
        arguments: ['abc'],
        result: true
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
            ['a', '1'],
            ['b', '2'],
            ['c', '3']
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
        arguments: [undefined],
        result: undefined
      },
      {
        desc: 'with empty object as argument',
        arguments: [{}],
        result: undefined
      }
    ]
  },
  {
    name: 'filterString',
    module: filterString,
    tests: [
      {
        desc: 'with empty arguments',
        arguments: [undefined],
        result: undefined
      },
      {
        desc: 'with string of letters as an argument',
        arguments: ['rubber'],
        result: 'rubber'
      },
      {
        desc: 'with string of letters and special characters and numbers as an argument',
        arguments: ['rubber:1'],
        result: 'rubber'
      }
    ]
  },
  {
    name: 'formatReplace',
    module: formatReplace,
    tests: [
      {
        desc: 'with string of letters as an argument',
        arguments: ['rubber', REPLACEMENT_MAP],
        result: 'rubber'
      },
      {
        desc: 'with string italic text',
        arguments: ['tires made of {it}rubber{/it}', REPLACEMENT_MAP],
        result: 'tires made of <i>rubber</i>'
      },
      {
        desc: 'with string redundant tags',
        arguments: ['{bc}a flat piece of hard, white rubber.', REPLACEMENT_MAP],
        result: 'a flat piece of hard, white rubber.'
      }
    ]
  }
];

testData.forEach(testModule => {
  describe(`resource ${testModule.name}`, () => {
    testModule.tests.forEach(testCase => {
      test(`${testCase.desc}`, () => {
        // @ts-expect-error: testing with invalid arguments
        const result = testModule.module(...testCase.arguments);
        expect(result).toEqual(testCase.result);
      });
    });
  });
});
