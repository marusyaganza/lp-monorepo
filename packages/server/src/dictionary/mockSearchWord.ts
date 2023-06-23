import egalitarian from './mocks/egalitarian';
import rubber from './mocks/rubber';
import pussy from './mocks/pussy';
import heart from './mocks/heart';
import wheel from './mocks/wheel';
import idioma from './mocks/idioma';
import voluminous from './mocks/voluminous';
import { DictionaryWordType } from './types';
import { Language, SearchResult } from '../generated/graphql';
import { formatData } from './formatData';

const mockWords = {
  egalitarian,
  rubber,
  pussy,
  heart,
  wheel,
  voluminous
};

const mockSpanishWords = {
  idioma
};

const mockSuggestions = {
  [Language.English]: [
    'Mocking is enabled. You can query words from the list: egalitarian, rubber, pussy, heart, wheel voluminous'
  ],
  [Language.Spanish]: [
    'Mocking is enabled. You can query words from the list: idioma'
  ]
};

export async function mockFetchWord(
  query: string,
  language = Language.English
): Promise<DictionaryWordType[] | string[]> {
  let result = [];
  if (!query) {
    return [];
  }

  const mock = language === Language.Spanish ? mockSpanishWords : mockWords;
  // @ts-ignore
  result = mock[query];
  if (result) {
    return result;
  }
  return mockSuggestions[language];
}

export async function mockSearchWord(
  query: string,
  language?: Language
): Promise<SearchResult> {
  const words = await mockFetchWord(query, language);
  // @ts-ignore
  return formatData(words);
}
