import { words, users, tags } from './data';
import { GAMES } from '../../constants/games';
import { words as wordsArr, spanishWords } from './gameGenerationData';
import { Language, Role } from '../../generated/graphql';
import { wordsWithPagination } from './wordsWithPagination';
import { ModelsType } from '../../db/models';

export const models = {
  Word: {
    findMany: jest.fn(() => words),
    findById: jest.fn(() => words[0]),
    findManyAndPaginate: jest.fn(
      ({ language }) => wordsWithPagination[language]
    ),
    createOne: jest.fn((data, user) => ({ ...data, id: '2', user })),
    deleteOne: jest.fn(),
    selectWordsForGame: jest.fn(({ language }) =>
      language === Language.Spanish ? spanishWords : wordsArr
    )
  },
  User: {
    findOne: jest.fn(() => users[0]),
    createOne: jest.fn(data => ({
      role: Role.Member,
      ...data,
      id: '2'
    }))
  },
  Game: {
    findMany: jest.fn(() => GAMES.map(game => ({ ...game, id: 'mockId' }))),
    findOne: jest.fn(({ type }) => GAMES.find(game => game.type === type))
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
} as unknown as ModelsType;
