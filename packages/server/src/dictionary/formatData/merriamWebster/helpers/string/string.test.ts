import { removeComplexTags, formatComplexTag } from './string';

const testData = [
  {
    name: 'removeComplexTags',
    module: removeComplexTags,
    tests: [
      {
        desc: 'with italic text',
        arguments: '<i>don</i>',
        result: '<i>don</i>'
      },
      {
        desc: 'with regular text',
        arguments: 'it',
        result: 'it'
      }
    ]
  },
  {
    name: 'formatComplexTag',
    module: formatComplexTag,
    tests: [
      {
        desc: 'with a complex tag',
        arguments:
          'to approve especially by custom, opinion, or {d_link|propriety|propriety}',
        result: 'to approve especially by custom, opinion, or propriety'
      },
      {
        desc: 'with regular text',
        arguments: 'it',
        result: 'it'
      },
      {
        desc: 'with 2 complex tags',
        arguments:
          '{a_link|ammonia|something|ammonia||} by combination with {a_link|doable||}',
        result: 'ammonia, something by combination with doable'
      },
      {
        desc: 'with putncuation',
        arguments:
          '“Can I e-mail you?” “Sure. Our e-mail address is ‘comments <i>at</i> Merriam-Webster dot com.’”',
        result:
          '“Can I e-mail you?” “Sure. Our e-mail address is ‘comments <i>at</i> Merriam-Webster dot com.’”'
      }
    ]
  }
];

testData.forEach(testModule => {
  describe(`resource ${testModule.name}`, () => {
    testModule.tests.forEach(testCase => {
      test(`${testCase.desc}`, () => {
        const result = testModule.module(testCase.arguments);
        expect(result).toEqual(testCase.result);
      });
    });
  });
});
