import egalitarian from './mocks/egalitarian';
import rubber from './mocks/rubber';
import pussy from './mocks/pussy';
import heart from './mocks/heart';
import wheel from './mocks/wheel';
import idioma from './mocks/idioma';
import hola from './mocks/hola';
import fowl from './mocks/fowl';
import caerse from './mocks/caerse';
import murther from './mocks/murther';
import suggestions from './mocks/suggestions';
import asi from './mocks/asi';

import voluminous from './mocks/voluminous';
import { DictionaryWordType } from './dictionaryTypes';
import { Language, SearchResult } from '../generated/graphql';
import { formatData } from './formatData';

const mockWords = {
  egalitarian,
  rubber,
  pussy,
  heart,
  wheel,
  voluminous,
  fowl,
  murther,
  suggestions,
  notFound: []
};

const mockSpanishWords = {
  idioma,
  hola,
  caerse,
  asi
};

const mockSuggestions = {
  [Language.English]: [
    'Mocks are enabled. You can query words from the list: egalitarian, rubber, pussy, heart, wheel, voluminous, fowl, murther, or notFound to receive an empty array as a result, or suggestions for an array with words'
  ],
  [Language.Spanish]: [
    'Mocks are enabled. You can query words from the list: idioma, hola, caerse, asi'
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
