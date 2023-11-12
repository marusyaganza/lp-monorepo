import { Schema, model } from 'mongoose';
import {
  Word as WordCoreType,
  Language,
  WordStatisticsField,
  WordStatistics,
  Game
} from '../../generated/graphql';

const tagsSchema = new Schema(
  {
    color: { type: String, required: true },
    text: { type: String, required: true }
  },
  { _id: false }
);

const examplesSchema = new Schema(
  {
    text: { type: String, required: true },
    translation: String
  },
  { _id: false }
);

const defSchema = new Schema(
  {
    def: {
      type: String,
      required: true
    },
    examples: [examplesSchema]
  },
  { _id: false }
);

const statisticsSchema = new Schema<WordStatisticsField>(
  {
    successRate: Number,
    lastTimePracticed: Number,
    practicedTimes: Number,
    errorCount: Number
  },
  { _id: false }
);

const wordStatisticsSchema = new Schema<WordStatistics>(
  {
    [Game.Audio]: statisticsSchema,
    [Game.SelectDef]: statisticsSchema,
    [Game.SelectWord]: statisticsSchema,
    [Game.TypeWord]: statisticsSchema
  },
  { _id: false }
);

const wordSchema = new Schema<WordCoreType>({
  uuid: { type: String, immutable: true },
  name: { type: String, required: true, immutable: true },
  createdAt: { type: String, required: true },
  updatedAt: { type: Number },
  defs: { type: [defSchema], required: true },
  shortDef: { type: [String], required: true },
  user: { type: String, required: true },
  audioUrl: String,
  transcription: String,
  imgUrl: String,
  imgDesc: String,
  isOffensive: Boolean,
  level: { type: String, enum: ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'] },
  language: { type: String, enum: Language },
  particle: String,
  stems: [String],
  tags: [tagsSchema],
  additionalInfo: String,
  isLearned: Boolean,
  statistics: wordStatisticsSchema
});

export const Word = model<WordCoreType>('Word', wordSchema);
