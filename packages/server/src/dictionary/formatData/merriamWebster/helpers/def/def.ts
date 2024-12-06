import { DefEntity, CognateEntity } from '../../types/types';
import { DefsInput } from '../../../../../generated/graphql';
import { REPLACEMENT_MAP } from '../../constants';
import { formatArray, formatReplace } from '../general/general';
import { formatComplexTag } from '../string/string';

/**
 * For performance reasons, formatting of dictionary entity will be done on the server side.
 * replace tags that mean italic
 * delete meaningless tags
 * @param str dictionary entity
 * @returns html string
 */
export function formatDictionaryEntity(str: string) {
  const result = formatReplace(str, REPLACEMENT_MAP);
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

      const text = formatArray(dt)?.text;

      if (!text) {
        return;
      }

      const def = formatDictionaryEntity(text);

      const rawResult: DefsInput = {
        def
      };

      const vis = formatArray(dt)?.vis;

      if (Array.isArray(vis) && vis.length) {
        rawResult.examples = vis.map(ex => ({
          text: formatDictionaryEntity(ex.t),
          translation: ex.tr
        }));
      }
      result.push(rawResult);
    });
  });
  return result;
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
