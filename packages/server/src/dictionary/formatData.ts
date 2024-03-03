import { DictionaryWordType } from './dictionaryTypes';
import { DictionaryWord, Language } from '../generated/graphql';
import {
  filterString,
  getAudioUrl,
  getDefs,
  getImgUrl,
  formatDictionaryEntity,
  formatHw
} from './helpers';

export function formatDictionaryWord(
  word: DictionaryWordType
): DictionaryWord | undefined {
  const { def, meta, hwi, art, shortdef, cxs } = word;
  const { uuid, id, stems, offensive, lang } = meta;
  const isSpanish = lang == 'es';
  const name = isSpanish && hwi?.hw ? hwi.hw : filterString(id);
  const metaData = {
    uuid,
    stems,
    name,
    isOffensive: offensive
  };
  const defs = getDefs(def, cxs);
  const pronunciation = hwi?.prs?.[0];
  const transcription = pronunciation?.mw || formatHw(hwi?.hw);
  const audio = pronunciation?.sound?.audio;
  const audioUrl = getAudioUrl(audio, lang);
  const language = isSpanish ? Language.Spanish : Language.English;
  const imgUrl = getImgUrl(art?.artid);
  const imgDesc = formatDictionaryEntity(art?.capt);
  const particle = word?.fl ?? 'noun';
  const shortDef = shortdef?.length ? shortdef : defs.map(def => def.def);

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
    shortDef,
    language
  };
}

export function formatData(data: DictionaryWordType[] | string[]) {
  if (data.some(el => typeof el === 'string')) {
    return [{ suggestions: data }];
  }
  // @ts-ignore
  return data.map(entry => formatDictionaryWord(entry)).filter(Boolean);
}
