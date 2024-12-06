import { DictionaryWord, SearchResult } from '../../../generated/graphql';
import { isMWDictionaryWord } from './types/typeGuards';
import {
  assertIsTypedArray,
  isDictionaryWord,
  isString,
  isTypedArray
} from '../../../types/typeGuards';
import { MWDictionaryWord } from './types/types';
import { formatDictionaryWord } from './formatDictionaryWord';

export function formatData(data: unknown): SearchResult[] {
  if (isTypedArray<MWDictionaryWord>(data, isMWDictionaryWord)) {
    const result = data
      .map(entry => formatDictionaryWord(entry))
      .filter(Boolean);
    assertIsTypedArray<DictionaryWord>(result, isDictionaryWord);
    return result;
  }
  if (isTypedArray<string>(data, isString)) {
    return [{ suggestions: data }];
  }
  return [];
}
