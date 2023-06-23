import { searchWord as searchWordFunc } from './searchWord';
import { mockSearchWord } from './mockSearchWord';

export const searchWord = process.env.USE_MOCKS
  ? mockSearchWord
  : searchWordFunc;
