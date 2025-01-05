import { DefEntity, CognateEntity, Entity } from '../../types/types';
import { DefExample, DefsInput } from '../../../../../generated/graphql';
import { REPLACEMENT_MAP } from '../../constants';
import { formatArray, formatReplace } from '../general/general';
import { formatComplexTag } from '../string/string';
import { uniq } from 'lodash';

export function extractDef(arr: [string, string][]): string {
  const defs = arr
    ?.filter(el => el[0] === 'text')
    ?.map(el => {
      const text: string = Object.fromEntries([el])?.text?.trim();
      return formatDictionaryEntity(text);
    })
    .filter(Boolean);
  return defs?.join(', ');
}

export function extractExamples(arr: [string, Entity[]][]): DefExample[] {
  let examples: DefExample[] = [];
  arr
    ?.filter(el => el[0] === 'vis')
    ?.forEach(el => {
      const vis = Object.fromEntries([el])?.vis;
      const exampleArr = vis?.map((ex: Entity) => ({
        text: formatDictionaryEntity(ex.t),
        translation: ex?.tr
      }));
      examples = [...examples, ...exampleArr];
    });
  return examples;
}

/**
 * For performance reasons, formatting of dictionary entity will be done on the server side.
 * replace tags that mean italic
 * delete meaningless tags
 * @param str dictionary entity
 * @returns html string
 */
export function formatDictionaryEntity(str: string) {
  let input = str;
  if (str.startsWith(',') || str.startsWith(';')) {
    input = input.slice(1).trim();
  }
  const result = formatReplace(input, REPLACEMENT_MAP);
  return formatComplexTag(result);
}

export function getDefs(def: DefEntity[] | null | undefined): DefsInput[] {
  const result: DefsInput[] = [];
  def?.forEach(d => {
    const { sseq } = d;
    if (!sseq) {
      return;
    }

    sseq.forEach(s => {
      if (!s?.length) {
        return;
      }
      const dt = formatArray(s)?.sense?.dt;
      const def = extractDef(dt);

      if (!def) {
        return;
      }

      const examples = extractExamples(dt);

      const rawResult: DefsInput = {
        def
      };

      if (examples.length) {
        rawResult.examples = examples;
      }

      result.push(rawResult);
    });
  });
  return uniq(result);
}

export function getDefFromRef(cognateRef?: CognateEntity[]): DefsInput[] {
  const result: DefsInput[] = [];
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
