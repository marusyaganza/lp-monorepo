import { DictionaryWordType } from './dictionaryTypes';
import { Language, SearchResult } from '../generated/graphql';
declare enum Dictionary {
    COLLEGIATE = "collegiate",
    SPANISH = "spanish"
}
export declare function fetchWord(query: string, dictionary: Dictionary): Promise<DictionaryWordType[] | string[]>;
export type SearchFuncType = (query: string, language: Language) => Promise<SearchResult>;
export declare function searchWord(query: string, language?: Language): Promise<SearchResult>;
export {};
