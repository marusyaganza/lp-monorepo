import { Schema, model } from 'mongoose';
import { WordTag as CoreWordTagType, Language } from '../../generated/graphql';

export interface WordTagType extends CoreWordTagType {
  user: string;
}

const wordTagSchema = new Schema<WordTagType>({
  text: { type: String, required: true },
  color: { type: String, required: true },
  user: { type: String, required: true },
  language: { type: String, enum: Language, required: true },
  desc: String
});

export const WordTag = model<WordTagType>('WordTag', wordTagSchema);
