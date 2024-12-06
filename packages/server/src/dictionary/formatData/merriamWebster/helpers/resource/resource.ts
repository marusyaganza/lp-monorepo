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
