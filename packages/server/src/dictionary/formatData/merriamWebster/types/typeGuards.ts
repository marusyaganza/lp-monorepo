import { MWDictionaryWord } from './types';

export function isMWDictionaryWord(data: any): data is MWDictionaryWord {
  const { meta } = data;
  return typeof meta?.id === 'string' && typeof meta?.uuid === 'string';
}
