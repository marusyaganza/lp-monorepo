import { formatData, formatFilter } from '../helpers';
import { Word } from '../schema/Word';
import { WordTag, WordTagType } from '../schema/WordTag';
import {
  WordTagInput,
  UpdateWordTagInput,
  WordTag as TagType
} from 'generated/graphql';

export interface WordTagModelType {
  findOne: (filter: Partial<WordTagType>) => Promise<WordTagType | null>;
  findMany: (filter: Partial<WordTagType>) => Promise<WordTagType[] | null>;
  createOne: (fields: WordTagInput) => Promise<WordTagType | null>;
  deleteOne: (filter: {
    id: string;
    user?: string;
  }) => Promise<{ ok: boolean; value?: TagType }>;
  updateOne: (
    fields: Partial<UpdateWordTagInput> & Pick<WordTagType, 'id' | 'user'>
  ) => Promise<{ ok: boolean; value: WordTagType | null }>;
}

export const WordTagModel: WordTagModelType = {
  async createOne(fields) {
    const tag = await WordTag.create(fields);
    return formatData(tag);
  },

  async findOne(filter) {
    if (!filter?.user) {
      return null;
    }
    const tag = await WordTag.findOne(formatFilter(filter));
    return formatData(tag);
  },

  async findMany(filter) {
    if (!filter?.user) {
      return [];
    }
    const tags = await WordTag.find(formatFilter(filter));
    return tags;
  },
  async updateOne(fields) {
    const { ok, value } = await WordTag.findOneAndUpdate(
      { _id: fields.id, user: fields.user },
      fields,
      { includeResultMetadata: true, new: true }
    );
    const isOk = ok == 1 && value !== null;
    return { ok: isOk, value: formatData(value) };
  },

  async deleteOne(filter) {
    const { id, user } = filter;

    let result = { ok: false };

    const tag = await WordTag.findOne({
      _id: filter.id,
      user: filter.user
    });

    if (!tag) {
      return result;
    }

    const wordsWithTag = await Word.find(
      {
        tags: id,
        user: user
      },
      'tags'
    );

    const tagId = tag._id;

    wordsWithTag.forEach(async wordWithTag => {
      if (wordWithTag?.tags?.length) {
        // @ts-ignore
        wordWithTag.tags = wordWithTag.tags.filter(tag => tag != tagId);
        await wordWithTag.save();
      }
    });

    await tag.deleteOne();
    // @ts-ignore
    result = { ok: true, value: tag };

    return result;
  }
};
