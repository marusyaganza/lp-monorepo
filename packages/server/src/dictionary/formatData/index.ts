import { SearchResult } from '../../generated/graphql';
import { formatData as formatFunc } from './merriamWebster/formatData';

export function formatData(data: unknown): SearchResult[] {
  return formatFunc(data);
}
