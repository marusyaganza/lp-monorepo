import { isDef, isExample, isNotEmptyString } from '../types/typeGuards';
import { DefExample, DefsInput, WordDefinition } from '../generated/graphql';

/**
 *
 * @param str a string
 * @returns a string with trailing spaces and all line breaks removed
 */
export function formatString(str: string): string {
  return str?.trim()?.replace(/\r?\n|\r/gi, '');
}

export function formatArrayOfStrings(data: unknown): string[] {
  if (!data || !Array.isArray(data)) {
    return [];
  }
  return data.filter(isNotEmptyString).map(str => formatString(str));
}

export function formatExamples(data: unknown): DefExample[] | undefined {
  if (!Array.isArray(data)) {
    return;
  }
  return data
    .map(ex => ({
      text: formatString(ex?.text),
      translation: formatString(ex?.translation)
    }))
    .filter(isExample);
}

export function cleanDefs(defs: WordDefinition[]): DefsInput[] {
  return defs
    .map(item => {
      return {
        def: formatString(item?.def),
        examples: formatExamples(item?.examples)
      };
    })
    .filter(isDef);
}
