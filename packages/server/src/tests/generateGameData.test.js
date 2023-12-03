/* eslint-disable jest/no-conditional-expect */
import {
  generateRandomNumber,
  prepareDef,
  generateGameData,
  insertAnswer,
  generateOptions
} from '../utils/generateGameData';
import { Game, Language } from '../generated/graphql';
import {
  words,
  mockOptions,
  randomNumbersArray
} from './mocks/gameGenerationData';
import { games } from '../mocks/games';

const getConfig = gameType => games.find(game => game.type === gameType);

const testData = [
  {
    name: 'prepareDef',
    module: prepareDef,
    tests: [
      {
        desc: 'with empty name',
        arguments: ['def', null],
        result: ''
      },
      {
        desc: 'with empty def',
        arguments: [null, 'def'],
        result: ''
      },
      {
        desc: 'with undefined',
        arguments: undefined,
        result: ''
      },
      {
        desc: 'with data that requires replacement',
        arguments: ['name should be removed from here', 'name'],
        result: '[...] should be removed from here'
      },
      {
        desc: 'with data that does not require replacement',
        arguments: ['name should not be removed from here', 'tree'],
        result: 'name should not be removed from here'
      },
      {
        desc: 'with complex data that require replacement',
        arguments: ['get out should be removed from here', 'get out'],
        result: '[...] should be removed from here'
      },
      {
        desc: 'with 2 complex words that require replacement',
        arguments: ['get out should be get out removed from here', 'get out'],
        result: '[...] should be [...] removed from here'
      },
      {
        desc: 'with complex word in the end that require replacement',
        arguments: ['word should be removed from here get back', 'get back'],
        result: 'word should be removed from here [...]'
      },
      {
        desc: 'with uppercase word that require replacement',
        arguments: ['word should be removed from here. Get back', 'get back'],
        result: 'word should be removed from here. [...]'
      },
      {
        desc: 'with uppercase name and def that require replacement',
        arguments: ['word should be removed from here', 'Word'],
        result: '[...] should be removed from here'
      }
    ]
  },
  {
    name: 'generateGameData if all the words are given',
    module: generateGameData,
    tests: [
      {
        desc: 'with valid data for SelectDef Game',
        arguments: [Game.SelectDef, words, getConfig(Game.SelectDef)],
        isSnapshotTest: true
      },
      {
        desc: 'with valid data for SelectWord Game',
        arguments: [Game.SelectWord, words, getConfig(Game.SelectWord)],
        isSnapshotTest: true
      },
      {
        desc: 'with valid data for Audio Game',
        arguments: [Game.Audio, words, getConfig(Game.Audio)],
        isSnapshotTest: true
      },
      {
        desc: 'with valid data for TypeWord Game',
        arguments: [Game.TypeWord, words, getConfig(Game.TypeWord)],
        isSnapshotTest: true
      }
    ]
  },
  {
    name: 'generateOptions',
    module: generateOptions,
    tests: [
      {
        desc: 'with valid data for English',
        arguments: [words, 5, '1', Language.English],
        isSnapshotTest: true
      },
      {
        desc: 'with one word for English',
        arguments: [[words[0]], 5, '3', Language.English],
        isSnapshotTest: true
      },
      {
        desc: 'with one word for Spanish',
        arguments: [[words[0]], 5, '3', Language.Spanish],
        isSnapshotTest: true
      }
    ]
  }
];

let index = 0;

const mathRandomMock = jest
  .spyOn(global.Math, 'random')
  .mockImplementation(function () {
    if (index === randomNumbersArray.length) {
      index = 0;
    }
    const randomNum = randomNumbersArray[index];
    index++;
    return randomNum;
  });

testData.forEach(testModule => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  afterAll(() => {
    jest.resetAllMocks();
  });
  describe(`generateGameData ${testModule.name}`, () => {
    testModule.tests.forEach(testCase => {
      test(`${testCase.desc}`, () => {
        let result;
        if (Array.isArray(testCase.arguments)) {
          result = testModule.module(...testCase.arguments);
        } else {
          result = testModule.module(testCase.arguments);
        }
        if (testCase?.isSnapshotTest) {
          expect(result).toMatchSnapshot();
        } else {
          expect(result).toEqual(testCase.result);
        }
      });
    });
  });
});

describe('generateGameData', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  afterAll(() => {
    jest.resetAllMocks();
  });
  test('generateRandomNumber', () => {
    generateRandomNumber(6);
    expect(mathRandomMock).toHaveBeenCalledTimes(1);
  });

  test('insertAnswer', () => {
    const index = 2;
    const answer = 'answer';
    const mathRandomMock = jest
      .spyOn(global.Math, 'random')
      .mockReturnValue(index / mockOptions.length);
    const result = insertAnswer(mockOptions, answer);
    const answerIndex = result.findIndex(opt => opt === answer);
    expect(mathRandomMock).toHaveBeenCalledTimes(1);
    expect(answerIndex).toEqual(index);
  });

  test('generateOptions with sufficient data', () => {
    const count = 5;
    let index = 0;
    const mathRandomMock = jest
      .spyOn(global.Math, 'random')
      .mockImplementation(function () {
        const r = randomNumbersArray[index];
        index++;
        return r || 0;
      });
    const result = generateOptions(words, count, '1', Language.English);
    expect(mathRandomMock).toHaveBeenCalledTimes(count);
    expect(result).toMatchSnapshot();
  });

  test('throw error if there are not enough words to generate options', () => {
    expect(mathRandomMock).toHaveBeenCalledTimes(0);
    expect(() => {
      generateOptions([words[0]], 20, '1', Language.English);
    }).toThrow('Not enough words to generate options.');
  });

  test('throws error if not enough words for audio game', () => {
    const wordsWithoutAudio = words.find(word => !word.audioUrl);
    expect(() => {
      generateGameData(Game.Audio, [wordsWithoutAudio], getConfig(Game.Audio));
    }).toThrow(
      'Not enough words to start a game. You have 0 words with audio. Words requited for the game: 1'
    );
  });

  test('throws error if not enough words for typeWord game', () => {
    expect(() => {
      generateGameData(Game.TypeWord, [], getConfig(Game.TypeWord));
    }).toThrow(
      'Not enough words to start a game. You have 0 words. Words requited for the game: 1'
    );
  });

  test('throws error if not enough words for SelectDef game', () => {
    expect(() => {
      generateGameData(Game.SelectDef, [], getConfig(Game.SelectDef));
    }).toThrow(
      'Not enough words to start a game. You have 0 words. Words requited for the game: 1'
    );
  });

  test('throws error if not enough words for SelectWord game', () => {
    expect(() => {
      generateGameData(Game.SelectWord, [], getConfig(Game.SelectWord));
    }).toThrow(
      'Not enough words to start a game. You have 0 words. Words requited for the game: 1'
    );
  });
});
