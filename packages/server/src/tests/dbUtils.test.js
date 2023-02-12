const mongoDb = require('mongodb');

jest.mock('mongodb', () => {
  return {
    ObjectId: jest.fn(id => `mock_object_id_${id}`)
  };
});

import { formatIds, formatFilter } from '../utils/dbUtils';

const testData = [
  {
    name: 'formatIds',
    module: formatIds,
    tests: [
      {
        desc: 'with valid arguments',
        arguments: { _id: 'id_1' },
        result: { _id: 'id_1', id: 'id_1' }
      },
      {
        desc: 'with empty arguments',
        arguments: undefined,
        result: undefined
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
        result: { _id: 'mock_object_id_id_1', user: 'mock_object_id_user' }
      },
      {
        desc: 'with empty arguments',
        arguments: { name: 'name' },
        result: { name: 'name' }
      }
    ]
  }
];

testData.forEach(testModule => {
  describe(`dbUtils ${testModule.name}`, () => {
    testModule.tests.forEach(testCase => {
      test(`${testCase.desc}`, () => {
        const result = testModule.module(testCase.arguments);
        expect(result).toEqual(testCase.result);
      });
    });
  });
});
