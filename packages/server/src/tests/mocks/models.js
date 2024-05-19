import { words, users, tags } from './data';
import { games } from './games';
import { words as wordsArr, spanishWords } from './gameGenerationData';
import { Language } from '../../generated/graphql';

const findOneUser = jest.fn(() => users[0]);
const findMany = jest.fn(() => words);
const findOneWord = jest.fn(() => words[0]);
const findManyAndSort = jest.fn(({ language }) =>
  language === Language.English ? wordsArr : spanishWords
);
const findOneGame = jest.fn(({ type }) =>
  games.find(game => game.type === type)
);
const findManyGames = jest.fn(() => games);
const findManyTags = jest.fn(() => tags);

export const models = {
  Word: {
    findMany,
    findOne: findOneWord,
    findManyAndSort
  },
  User: {
    findOne: findOneUser
  },
  Game: {
    findMany: findManyGames,
    findOne: findOneGame
  },
  WordTag: {
    findMany: findManyTags
  }
};
