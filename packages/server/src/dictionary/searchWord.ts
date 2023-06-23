import { DictionaryWordType } from './types';
import { Language, SearchResult } from '../generated/graphql';
import { formatData } from './formatData';

const {
  DICTIONARY_API_URI,
  DICTIONARY_API_KEY,
  DICTIONARY_SPANISH_API_KEY,
  DICTIONARY_SPANISH_API_URI,
  DICTIONARY_THESAURUS_URI,
  DICTIONARY_THESAURUS_KEY
} = process.env;

const API = {
  spanish: {
    key: DICTIONARY_SPANISH_API_KEY,
    uri: DICTIONARY_SPANISH_API_URI
  },
  collegiate: {
    key: DICTIONARY_API_KEY,
    uri: DICTIONARY_API_URI
  },
  thesaurus: {
    key: DICTIONARY_THESAURUS_KEY,
    uri: DICTIONARY_THESAURUS_URI
  }
};

enum Dictionary {
  COLLEGIATE = 'collegiate',
  SPANISH = 'spanish'
}

const DICTIONARIES = {
  [Language.Spanish]: Dictionary.SPANISH,
  [Language.English]: Dictionary.COLLEGIATE
};

export async function fetchWord(
  query: string,
  dictionary: Dictionary
): Promise<DictionaryWordType[] | string[]> {
  let result: DictionaryWordType[] | string[] = [];
  if (!query) {
    return [];
  }
  const uri = `${API[dictionary].uri}/${query}?key=${API[dictionary].key}`;
  await fetch(uri)
    .then(res => res.json())
    .then(res => {
      result = res;
    })
    .catch(err => {
      console.error('dictionary fetch error', err);
    });
  return result;
}

export type SearchFuncType = (
  query: string,
  language: Language
) => Promise<SearchResult>;

export async function searchWord(
  query: string,
  language = Language.English
): Promise<SearchResult> {
  const words = await fetchWord(query, DICTIONARIES[language]);
  // @ts-ignore
  return formatData(words);
}
