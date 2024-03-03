import { DefEntity, CognateEntity } from './dictionaryTypes';
import { DefsInput } from '../generated/graphql';
import {
  TAGS,
  COMPLEX_TAGS,
  COMPLEX_TAGS_TO_REMOVE,
  HW_TAGS,
  ComplexTagType,
  TagType
} from './constants';

/**Deletes special characters like : or numbers from a string */
export function filterString(string: string) {
  return string?.replace(/[:\d]/g, '');
}

/**Transforms array into am object */
export function formatArray(arr: any[][]) {
  if (!arr || !Array.isArray(arr)) {
    return {};
  }
  return Object.fromEntries(arr?.flat());
}

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

/**
 * complex tags: may include array of words or phrases separated by | character.
 *  Sometimes those arrays include duplicates which should be removed.
 *  The symbol | should be replaced with a comma.
 */
function formatComplexTag(str: string) {
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
function removeComplexTags(sample: string) {
  const tag = COMPLEX_TAGS_TO_REMOVE.find(tag => sample.includes(tag.opening));
  if (!tag) {
    return sample;
  }
  const startIndex = sample.indexOf(tag.opening);
  const endIndex = sample.indexOf(tag.closing) + 1;
  const fragment = sample.slice(startIndex, endIndex);
  return sample.replace(fragment, '');
}

export function formatReplace(str: string, tags: TagType[]) {
  let result: string = str;
  tags.forEach(tag => {
    if (result?.includes(tag.tag)) {
      result = result?.replaceAll(tag.tag, tag.replacement);
    }
  });
  return result;
}

export function formatHw(hw: string) {
  return formatReplace(hw, HW_TAGS);
}

/**
 * For performance reasons, formatting of dictionary entity will be done on the server side.
 * replace tags that mean italic
 * delete meaningless tags
 * @param str dictionary entity
 * @returns html string
 */
export function formatDictionaryEntity(str?: string) {
  if (!str) {
    return;
  }
  const result = formatReplace(str, TAGS);
  return formatComplexTag(result);
}

// TODO retrieve translation for examples for Spanish language
// {
//   t: 'el idioma ingl\u00e9s',
//   tr: 'the English language'
// }
export function getDefs(
  def: DefEntity[] | null | undefined,
  cognateRef?: CognateEntity[]
) {
  const result: DefsInput[] = [];
  if (!def || !Array.isArray(def)) {
    cognateRef?.forEach(item => {
      const cognateStr = item?.cxl ?? '';
      const cognateTargets = item?.cxtis
        ?.map(target => {
          return target?.cxt ? `<i>${target?.cxt}</i>` : '';
        })
        ?.filter(Boolean)
        .join(', ');
      const cognateRes = `${cognateStr} ${cognateTargets}`;
      if (cognateRes) {
        result.push({ def: cognateRes });
      }
    });
    return result;
  }
  def?.forEach(d => {
    const { sseq } = d;
    // iterate the array of defenitions
    return sseq?.map(s => {
      // TODO add test for this case
      if (s && s.length) {
        const { sense } = formatArray([s]);
        if (!sense?.dt) {
          return;
        }
        const { dt } = sense;
        const { text, vis } = formatArray([dt]);
        const rawResalt = {
          def: formatDictionaryEntity(text)
        };
        if (vis && Array.isArray(vis) && vis.length) {
          // @ts-ignore
          rawResalt.examples = vis?.map(ex => ({
            text: formatDictionaryEntity(ex.t),
            translation: ex.tr
          }));
        }
        // TODO add test for this case
        // write each definition into array
        if (rawResalt?.def) {
          // @ts-ignore
          result.push(rawResalt);
        }
      }
    });
  });
  return result;
}

// if audio begins with "bix", the subdirectory should be "bix",
// if audio begins with "gg", the subdirectory should be "gg",
// if audio begins with a number or punctuation (eg, "_"), the subdirectory should be "number",
// otherwise, the subdirectory is equal to the first letter of audio.
export function getAudioUrl(audio?: string, lang?: string) {
  if (!audio) {
    return;
  }
  const countryCode = lang === 'es' ? 'me' : 'us';
  const language = lang || 'en';
  const format = 'mp3';
  let subdir = audio.slice(0, 1);
  const punctuationOrNumberRegexp = /\W|\d|[_]/;
  if (punctuationOrNumberRegexp.test(subdir)) {
    subdir = 'number';
  }
  const patterns = ['bix', 'gg'];
  patterns.forEach(pattern => {
    if (audio.startsWith(pattern)) {
      subdir = pattern;
    }
  });
  return `${process.env.AUDIO_ENDPOINT}/${language}/${countryCode}/${format}/${subdir}/${audio}.${format}`;
}

export function getImgUrl(fileName?: string) {
  if (!fileName) {
    return;
  }
  return `${process.env.IMG_ENDPOINT}/${fileName}.gif`;
}
