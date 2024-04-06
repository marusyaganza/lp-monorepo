import { Document, Types } from 'mongoose';
import { Maybe, WordTag as WordTagType } from '../generated/graphql';
import { WordTag } from './schema/WordTag';

type ModelDataType = {
  id?: Maybe<string>;
  user?: string;
};

interface DbData extends ModelDataType {
  _id?: string;
}

type DocumentType<T> =
  | (Document<unknown, unknown, T> &
      T & {
        _id: Types.ObjectId;
      })
  | null;

export function formatData<T>(data: DocumentType<T>): T | null {
  if (!data) {
    return null;
  }
  return data.toObject({
    getters: true,
    versionKey: false
  });
}

export function formatFilter<T extends DbData>(filter: T): T {
  const id = filter?.id;
  if (id) {
    const formattedFilter = { ...filter, _id: id };
    delete formattedFilter.id;
    return formattedFilter;
  }
  return filter;
}

// TODO investigate why this function does not work correctly
export function checkTags(tags?: Maybe<Maybe<WordTagType>[]>) {
  if (!tags?.length) {
    return tags;
  }
  const newTags = tags.filter(async tag => {
    const existing = await WordTag.findById(tag);
    return existing ? tag : undefined;
  });

  return newTags;
}
