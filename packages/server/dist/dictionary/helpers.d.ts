import { DefEntity, CognateEntity } from './dictionaryTypes';
import { DefsInput } from '../generated/graphql';
import { TagType } from './constants';
/**Deletes special characters like : or numbers from a string */
export declare function filterString(string: string): string;
/**Transforms array into am object */
export declare function formatArray(arr: any[][]): {
    [k: string]: any;
};
/**
 *
 * @param sample checks if given string is a integer number like '55'
 * @returns boolean
 */
export declare function isNumber(sample: string): boolean;
export declare function formatReplace(str: string, tags: TagType[]): string;
export declare function formatHw(hw: string): string;
/**
 * For performance reasons, formatting of dictionary entity will be done on the server side.
 * replace tags that mean italic
 * delete meaningless tags
 * @param str dictionary entity
 * @returns html string
 */
export declare function formatDictionaryEntity(str?: string): string | undefined;
export declare function getDefs(def: DefEntity[] | null | undefined, cognateRef?: CognateEntity[]): DefsInput[];
export declare function getAudioUrl(audio?: string, lang?: string): string | undefined;
export declare function getImgUrl(fileName?: string): string | undefined;
