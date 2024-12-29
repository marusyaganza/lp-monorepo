import { DictionaryWord, Language } from '../../../generated/graphql';
import { uniq } from 'lodash';

import {
  filterString,
  getAudioUrl,
  getDefs,
  getDefFromRef,
  getImgUrl,
  formatDictionaryEntity,
  formatHw
} from './helpers';

import { MWDictionaryWord } from './types/types';

export function formatDictionaryWord(
  word: MWDictionaryWord
): DictionaryWord | undefined {
  const { def, meta, hwi, art, shortdef, cxs, suppl } = word;
  const { uuid, id, stems, offensive, lang } = meta;
  const isSpanish = lang == 'es';
  const name = isSpanish && hwi?.hw ? hwi.hw : filterString(id);
  const metaData = {
    uuid,
    stems,
    name,
    isOffensive: offensive
  };
  const defs = Array.isArray(def) ? getDefs(def) : getDefFromRef(cxs);
  const pronunciation = hwi?.prs?.[0];
  const transcription = pronunciation?.mw || formatHw(hwi?.hw);
  const audio = pronunciation?.sound?.audio;
  const audioUrl = getAudioUrl(audio, lang);
  const language = isSpanish ? Language.Spanish : Language.English;
  const imgUrl = getImgUrl(art?.artid);
  const imgDesc = art?.capt ? formatDictionaryEntity(art?.capt) : null;
  const particle = word?.fl ?? 'noun';
  const shortDef = shortdef?.length ? shortdef : defs.map(def => def.def);
  const conjugation = suppl?.cjts?.length ? suppl.cjts : null;

  if (!defs?.length) {
    return;
  }

  return {
    ...metaData,
    particle,
    defs,
    transcription,
    imgUrl,
    imgDesc,
    audioUrl,
    shortDef: uniq(shortDef),
    conjugation,
    language
  };
}
