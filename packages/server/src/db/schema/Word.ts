import { Schema, model } from 'mongoose';
import { Word as WordCoreType } from '../../generated/graphql';

const tagsSchema = new Schema(
  {
    color: { type: String, required: true },
    text: { type: String, required: true }
  },
  { _id: false }
);

const defSchema = new Schema(
  {
    def: {
      type: String,
      required: true
    },
    examples: [String]
  },
  { _id: false }
);

const wordSchema = new Schema<WordCoreType>({
  uuid: { type: String, immutable: true },
  name: { type: String, required: true, immutable: true },
  createdAt: { type: String, required: true },
  defs: [defSchema],
  user: { type: String, required: true },
  audioUrl: String,
  transcription: String,
  imgUrl: String,
  isOffensive: Boolean,
  level: { type: String, enum: ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'] },
  particle: String,
  stems: [String],
  tags: [tagsSchema],
  additionalInfo: String
});

export const Word = model<WordCoreType>('Word', wordSchema);
