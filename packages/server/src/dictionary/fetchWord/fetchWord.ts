import { Language } from '../../generated/graphql';
import { API, DICTIONARIES } from './config';

export async function fetchWord(
  query: string,
  language: Language
): Promise<unknown> {
  let result;
  if (!query) {
    return [];
  }
  const uri = `${API[DICTIONARIES[language]].uri}/${query}?key=${
    API[DICTIONARIES[language]].key
  }`;
  await fetch(uri)
    .then(res => res.json())
    .then(res => {
      result = res;
    })
    .catch(err => {
      console.error('dictionary fetch error', err);
    });
  return result;
}
