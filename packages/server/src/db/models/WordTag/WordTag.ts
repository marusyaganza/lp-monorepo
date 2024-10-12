import { Word } from '../../schema/Word';
import { WordTag } from '../../schema/WordTag';
import {
  WordTagInput,
  UpdateWordTagInput,
  WordTag as TagType
} from '../../../generated/graphql';

type TagDeleteResult = {
  ok: boolean;
  value: TagType | null;
};

export interface WordTagModelType {
  findOne: (filter: Partial<TagType>, user: string) => Promise<TagType | null>;
  findMany: (filter: Partial<TagType>, user: string) => Promise<TagType[]>;
  createOne: (fields: WordTagInput, user: string) => Promise<TagType | null>;
  deleteOne: (id: string, user: string) => Promise<TagDeleteResult>;
  updateOne: (
    fields: Partial<UpdateWordTagInput> & Pick<TagType, 'id'>,
    user: string
  ) => Promise<{ ok: boolean; value: TagType | null | undefined }>;
}

export const WordTagModel: WordTagModelType = {
  async createOne(fields, user) {
    const tag = await WordTag.create({ ...fields, user });
    return tag.toObject();
  },

  async findOne(filter, user) {
    let tag;
    if ('id' in filter) {
      tag = await WordTag.findById(filter.id);
    } else {
      tag = await WordTag.findOne(filter);
    }
    if (tag?.user !== user) {
      return null;
    }
    return tag.toObject();
  },

  async findMany(filter, user) {
    const tags = await WordTag.find({ ...filter, user });
    return tags || [];
  },

  async updateOne(fields, user) {
    const result = await WordTag.findOneAndUpdate(
      { _id: fields.id, user },
      fields,
      { includeResultMetadata: true, new: true }
    );
    const { ok, value } = result;
    const isOk = ok == 1 && value !== null;
    return { ok: isOk, value: value?.toObject() };
  },

  async deleteOne(id, user) {
    let result: TagDeleteResult = { ok: false, value: null };

    const tag = await WordTag.findOne({
      _id: id,
      user
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

    const tagId = tag.id.toString();

    wordsWithTag.forEach(async wordWithTag => {
      if (wordWithTag?.tags?.length) {
        wordWithTag.tags = wordWithTag.tags.filter(tag => tag != tagId);
        await wordWithTag.save();
      }
    });

    await tag.deleteOne();
    result = { ok: true, value: tag.toObject() };

    return result;
  }
};
