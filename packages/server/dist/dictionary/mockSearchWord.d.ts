import { DictionaryWordType } from './dictionaryTypes';
import { Language, SearchResult } from '../generated/graphql';
export declare function mockFetchWord(query: string, language?: Language): Promise<DictionaryWordType[] | string[]>;
export declare function mockSearchWord(query: string, language?: Language): Promise<SearchResult>;
