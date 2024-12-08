import { Language } from '../../../generated/graphql';

export const mockSuggestions = {
  [Language.English]: [
    'Mocks are enabled. You can query words from the list: egalitarian, rubber, pussy, heart, wheel, voluminous, fowl, murther, or notFound to receive an empty array as a result, or suggestions for an array with words'
  ],
  [Language.Spanish]: [
    'Mocks are enabled. You can query words from the list: idioma, hola, caerse, asi, tener, ser, llover'
  ]
};

export async function mockFetchWord(
  query: string,
  language = Language.English
): Promise<unknown> {
  let result = [];
  const suggestions = mockSuggestions[language];
  if (!query || query === 'notFound') {
    return [];
  }

  try {
    const data = await import(`./mocks/${language}/${query}.js`);
    result = data?.default;
  } catch (err) {
    console.error('mockFetch err', err);
  }

  if (result?.length) {
    return result;
  }
  return suggestions;
}
