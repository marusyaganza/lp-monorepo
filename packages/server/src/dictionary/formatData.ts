import { DictionaryWordType } from './types';
import { DictionaryWord } from '../generated/graphql';
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
  const { def, meta, hwi, art } = word;
  const { uuid, id, stems, offensive, lang } = meta;
  const metaData = {
    uuid,
    stems,
    name: filterString(id),
    isOffensive: offensive
  };
  const defs = getDefs(def);
  const pronunciation = hwi?.prs?.[0];
  const transcription = pronunciation?.mw || formatHw(hwi?.hw);
  const audio = pronunciation?.sound?.audio;
  const audioUrl = getAudioUrl(audio, lang);
  const imgUrl = getImgUrl(art?.artid);
  const imgDesc = formatDictionaryEntity(art?.capt);
  const particle = word?.fl;

  if (!particle || !defs?.length) {
    return;
  }

  return {
    ...metaData,
    particle,
    defs,
    transcription,
    imgUrl,
    imgDesc,
    audioUrl
  };
}

export function formatData(data: DictionaryWordType[] | string[]) {
  if (data.some(el => typeof el === 'string')) {
    return [{ suggestions: data }];
  }
  // @ts-ignore
  return data.map(entry => formatDictionaryWord(entry)).filter(Boolean);
}
