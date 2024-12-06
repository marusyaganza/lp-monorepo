import { Language, SearchResult } from '../generated/graphql';
import { getFetchFunc } from './fetchWord';
import { formatData } from './formatData';

export async function searchWord(
  query: string,
  language: Language
): Promise<SearchResult[]> {
  const fetchFunc = await getFetchFunc();
  const result = await fetchFunc(query, language);
  return formatData(result);
}
