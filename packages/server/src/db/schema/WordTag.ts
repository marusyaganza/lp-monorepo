import { Schema, model } from 'mongoose';
import { WordTag as CoreWordTagType } from '../../generated/graphql';

export interface WordTagType extends CoreWordTagType {
  user: string;
}

const wordTagSchema = new Schema<WordTagType>({
  text: { type: String, required: true },
  color: { type: String, required: true },
  user: { type: String, required: true },
  desc: String
});

export const WordTag = model<WordTagType>('WordTag', wordTagSchema);
