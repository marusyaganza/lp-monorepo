import { Schema, model } from 'mongoose';
import { Word as WordCoreType } from 'generated/graphql';

const wordSchema = new Schema<WordCoreType>({
  uuid: { type: String },
  name: { type: String, required: true, immutable: true },
  defs: [{ def: { type: String, required: true }, examples: [String] }],
  user: { type: String, required: true },
  audioUrl: String,
  transcription: [String],
  imgUrl: String,
  isOffensive: Boolean,
  level: { type: String, enum: ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'] },
  particle: String,
  stems: [String],
  tags: [String],
  additionalInfo: String
});

export const Word = model<WordCoreType>('Word', wordSchema);

