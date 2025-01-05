import { TagType } from '../../constants';

/**Deletes special characters like : or numbers from a string */
export function filterString(string: string) {
  return string?.replace(/[:\d]/g, '');
}

/**Transforms array into am object */
export function formatArray(arr?: any[]) {
  if (!Array.isArray(arr)) {
    return;
  }
  return Object.fromEntries(arr);
}

// TODO check this function
/**
 *
 * @param sample checks if given string is a integer number like '55'
 * @returns boolean
 */
export function isNumber(sample: string): boolean {
  if (!sample) {
    return false;
  }
  return Number.isNaN(Number.parseInt(sample));
}

export function formatReplace(str: string, tags: TagType[]) {
  let result: string = str;
  tags.forEach(tag => {
    if (result?.includes(tag.tag)) {
      result = result?.replaceAll(tag.tag, tag.replacement).trim();
    }
  });
  return result;
}
