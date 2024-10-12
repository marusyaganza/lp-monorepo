import { Schema, model } from 'mongoose';
import { WordTag as CoreWordTagType, Language } from '../../generated/graphql';

const tagSchema = new Schema<CoreWordTagType>(
  {
    text: { type: String, required: true },
    color: { type: String, required: true },
    user: { type: String, required: true },
    language: { type: String, enum: Language, required: true },
    desc: String
  },
  { toObject: { virtuals: true, getters: true, versionKey: false } }
);

tagSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

export const WordTag = model<CoreWordTagType>('WordTag', tagSchema);
