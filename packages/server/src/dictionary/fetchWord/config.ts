import { Language } from '../../generated/graphql';

const {
  DICTIONARY_API_URI,
  DICTIONARY_API_KEY,
  DICTIONARY_SPANISH_API_KEY,
  DICTIONARY_SPANISH_API_URI,
  DICTIONARY_THESAURUS_URI,
  DICTIONARY_THESAURUS_KEY
} = process.env;

export const API = {
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

export const DICTIONARIES = {
  [Language.Spanish]: Dictionary.SPANISH,
  [Language.English]: Dictionary.COLLEGIATE
};
