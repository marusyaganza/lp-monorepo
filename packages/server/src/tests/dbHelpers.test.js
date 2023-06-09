import { formatData, formatFilter } from '../db/helpers';

const mockToObjectFn = jest.fn();

const testData = [
  {
    name: 'formatData',
    module: formatData,
    tests: [
      {
        desc: 'with empty arguments',
        arguments: undefined,
        result: null
      }
    ]
  },
  {
    name: 'formatFilter',
    module: formatFilter,
    tests: [
      {
        desc: 'with valid arguments',
        arguments: { id: 'id_1', user: 'user' },
        result: { _id: 'id_1', user: 'user' }
      },
      {
        desc: 'without id prop',
        arguments: { name: 'name' },
        result: { name: 'name' }
      },
      {
        desc: 'with empty args',
        arguments: undefined,
        result: undefined
      }
    ]
  }
];

testData.forEach(testModule => {
  describe(`db helpers ${testModule.name}`, () => {
    testModule.tests.forEach(testCase => {
      test(`${testCase.desc}`, () => {
        const result = testModule.module(testCase.arguments);
        expect(result).toEqual(testCase.result);
      });
    });
  });
});

describe('db helpers formatData', () => {
  test('with valid args', () => {
    const data = { toObject: mockToObjectFn };
    formatData(data);
    expect(mockToObjectFn).toHaveBeenCalledWith({
      getters: true,
      versionKey: false
    });
  });
});
