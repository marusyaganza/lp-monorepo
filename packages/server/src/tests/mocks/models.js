import { words, users, tags } from './data';
import { games } from './games';
import { words as wordsArr, spanishWords } from './gameGenerationData';
import { Language } from '../../generated/graphql';

export const models = {
  Word: {
    findMany: jest.fn(() => words),
    findOne: jest.fn(() => words[0]),
    findManyAndSort: jest.fn(({ language }) =>
      language === Language.Spanish ? spanishWords : wordsArr
    ),
    createOne: jest.fn(data => ({ ...data, id: '2' })),
    deleteOne: jest.fn()
  },
  User: {
    findOne: jest.fn(() => users[0]),
    createOne: jest.fn(data => ({
      ...data,
      id: '2'
    }))
  },
  Game: {
    findMany: jest.fn(() => games),
    findOne: jest.fn(({ type }) => games.find(game => game.type === type))
  },
  WordTag: {
    findMany: jest.fn(() => tags),
    findOne: jest.fn(),
    deleteOne: jest.fn(),
    createOne: jest.fn(data => ({
      ...data,
      id: '2'
    })),
    updateOne: jest.fn()
  }
};
