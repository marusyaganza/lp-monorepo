import { WordTag } from '../../schema/WordTag';

import { Language } from '../../../generated/graphql';
import { WORDS_PER_PAGE } from '../../../constants/defaultValues';

export async function filterTags({
  tags,
  language,
  user
}: {
  tags?: (string | null)[] | null;
  language: Language;
  user: string;
}) {
  const existingTags = await WordTag.find({ user, language }, 'id');
  const existingTagsIds = existingTags.map(tag => tag.id);
  return tags?.filter(tag => tag && existingTagsIds.includes(tag));
}

export function calculatePaginationValues(
  initialLimit?: number | null,
  pageNum?: number | null,
  count?: number | null
) {
  const page = Math.abs(pageNum || 1);
  const documentsCount = count || 0;
  const limit = Math.abs(initialLimit || WORDS_PER_PAGE);
  const skip = (page - 1) * limit;
  const hasNext = documentsCount - Math.abs(page) * limit > 0;

  return { limit, skip, hasNext, page };
}
