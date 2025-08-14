import { Language } from '../../../generated/graphql';

export const mockSuggestions = {
  [Language.English]: [
    'egalitarian',
    'rubber',
    'pussy',
    'heart',
    'wheel',
    'voluminous',
    'fowl',
    'murther'
  ],
  [Language.Spanish]: [
    'idioma',
    'hola',
    'caerse',
    'asi',
    'tener',
    'ser',
    'llover',
    'ecologista',
    'bully',
    'instruction',
    'empezar',
    'ballena'
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

  if (!mockSuggestions[language].includes(query)) {
    return suggestions;
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
