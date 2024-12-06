import {
  COMPLEX_TAGS,
  COMPLEX_TAGS_TO_REMOVE,
  HW_TAGS,
  ComplexTagType
} from '../../constants';
import { filterString, formatReplace, isNumber } from '../general/general';

/**
 * complex tags: may include array of words or phrases separated by | character.
 *  Sometimes those arrays include duplicates which should be removed.
 *  The symbol | should be replaced with a comma.
 */
export function formatComplexTag(str: string) {
  // Array of words
  const rawArr = str.split(' ').filter(Boolean);
  // stores words inside the complex tag, for the expression "{dxt|guinea fowl||}"
  // it stores "guinea fowl"
  let unfinishedPhrase: string[] = [];
  let openTag: ComplexTagType | undefined;
  // transfor each word
  const resultArr = rawArr.map(el => {
    let element: string = el;
    if (openTag) {
      unfinishedPhrase.push(el);
      // if all the words inside the tag are gathered, assemble complex tag and work with it
      if (el.includes(openTag.closing)) {
        element = unfinishedPhrase.join(' ');
        unfinishedPhrase = [];
        openTag = undefined;
      } else {
        return;
      }
    }

    element = removeComplexTags(element);
    const matchingTag = COMPLEX_TAGS.find(tag => element.includes(tag.opening));
    if (matchingTag) {
      // if the tag includes multiple words
      if (!element.includes(matchingTag.closing)) {
        openTag = matchingTag;
        unfinishedPhrase.push(element);
        return;
      }
      const punctuation = element.slice(-1).match(/[,.?;:!()]/)?.[0];
      const startIndex = matchingTag.opening.length;
      const endIndex = punctuation
        ? (matchingTag.closing.length + 1) * -1
        : matchingTag.closing.length * -1;
      //clean the text inside the complex tag
      const fragment = element
        .slice(startIndex, endIndex)
        .split('|')
        .filter(isNumber)
        .map(filterString);
      //remove duplecates
      const formattedFragment = Array.from(new Set(fragment));
      // if the text consists of multiple elements, separate them with a comma
      const separator = formattedFragment.length > 1 ? ', ' : ' ';
      const formattedElement = formattedFragment.join(separator);
      return punctuation
        ? `${formattedElement}${punctuation}`
        : formattedElement;
    }
    return element;
  });
  return resultArr.filter(Boolean).join(' ').trim();
}
/**
 * remove meaningless tags
 * @param sample dirty string for example "century{ds|t|1|a|1}"
 * @returns clean string, for example "century"
 */
export function removeComplexTags(sample: string) {
  const tag = COMPLEX_TAGS_TO_REMOVE.find(tag => sample.includes(tag.opening));
  if (!tag) {
    return sample;
  }
  const startIndex = sample.indexOf(tag.opening);
  const endIndex = sample.indexOf(tag.closing) + 1;
  const fragment = sample.slice(startIndex, endIndex);
  return sample.replace(fragment, '');
}

export function formatHw(hw: string) {
  return formatReplace(hw, HW_TAGS);
}
