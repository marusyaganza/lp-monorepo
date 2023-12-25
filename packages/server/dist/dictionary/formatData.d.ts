import { DictionaryWordType } from './dictionaryTypes';
import { DictionaryWord } from '../generated/graphql';
export declare function formatDictionaryWord(word: DictionaryWordType): DictionaryWord | undefined;
export declare function formatData(data: DictionaryWordType[] | string[]): (DictionaryWord | undefined)[] | {
    suggestions: string[] | DictionaryWordType[];
}[];
