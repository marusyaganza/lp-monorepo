import { DictionaryWordType, DefEntity } from './types';
import { DictionaryWord, DefsInput } from '../generated/graphql';

/**Deletes special characters like : or numbers from a string */
export const filterString = (string: string) => string?.replace(/[:\d]/g, '');

/**Transforms array into am object */
export function formatArray(arr: any[][]) {
  if (!arr || !Array.isArray(arr)) {
    return {};
  }
  return Object.fromEntries(arr?.flat());
}

// TODO retrieve translation for examples for Spanish language
// {
//   t: 'el idioma ingl\u00e9s',
//   tr: 'the English language'
// }
export function getDefs(def: DefEntity[] | null | undefined) {
  const result: DefsInput[] = [];
  if (!def || !Array.isArray(def)) {
    return result;
  }
  def?.forEach(d => {
    const { sseq } = d;
    // iterate the array of defenitions
    return sseq?.map(s => {
      if (s && s.length) {
        const { sense } = formatArray([s]);
        const { dt } = sense;
        const { text, vis } = formatArray([dt]);
        const rawResalt: DefsInput = { def: text };
        if (vis && Array.isArray(vis) && vis.length) {
          rawResalt.examples = vis?.map(ex => ex.t);
        }
        // write each definition into array
        result.push(rawResalt);
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

export function formatDictionaryWord(word: DictionaryWordType): DictionaryWord {
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
  const transcription = pronunciation?.mw || hwi?.hw;
  const audio = pronunciation?.sound?.audio;
  const audioUrl = getAudioUrl(audio, lang);
  const imgUrl = getImgUrl(art?.artid);
  const imgDesc = art?.capt;

  return {
    ...metaData,
    particle: word.fl,
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
  return data.map(entry => formatDictionaryWord(entry));
}
