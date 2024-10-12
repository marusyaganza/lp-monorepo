import { getAudioUrl, getImgUrl } from './resource';

const testData = [
  {
    name: 'getAudioUrl',
    module: getAudioUrl,
    tests: [
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
        desc: 'with valid data',
        arguments: ['heart'],
        result: 'mock_img_endpoint/heart.gif'
      },
      {
        desc: 'with empty data',
        arguments: [undefined],
        result: undefined
      }
    ]
  }
];

testData.forEach(testModule => {
  describe(`resource ${testModule.name}`, () => {
    testModule.tests.forEach(testCase => {
      test(`${testCase.desc}`, () => {
        const result = testModule.module(...testCase.arguments);
        expect(result).toEqual(testCase.result);
      });
    });
  });
});
