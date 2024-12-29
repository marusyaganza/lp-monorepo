import { Schema, model } from 'mongoose';
import {
  Word as WordCoreType,
  Language,
  WordStatisticsField,
  WordStatistics,
  Game,
  Conjugation,
  Score,
  Tense
} from '../../generated/graphql';

export interface SpacedRepetitionData {
  isNewCard: boolean;
  currentInterval: number;
  nextReviewDate: Date;
  reviewHistory: {
    date: Date;
    grade: Score;
    interval: number;
  }[];
  learningSteps: number[];
  currentStep: number;
  ease: number;
  lapses: number;
}

export type ConjugationSpacedRepetitionData = Record<
  Tense,
  SpacedRepetitionData
>;

export type SpacedRepetitionMap = {
  [K in Game]: K extends Game.Conjugation
    ? ConjugationSpacedRepetitionData
    : SpacedRepetitionData;
};

interface WordType extends WordCoreType {
  spacedRepetition: SpacedRepetitionMap;
}

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

const spacedRepetitionSchema = {
  isNewCard: { type: Boolean, default: true },
  currentInterval: { type: Number, default: 1 },
  nextReviewDate: { type: Date, default: Date.now },
  reviewHistory: [
    {
      date: Date,
      grade: { type: String, enum: Score },
      interval: Number
    }
  ],
  learningSteps: {
    type: [Number],
    default: [0.25, 1, 6]
  },
  currentStep: { type: Number, default: 0 },
  ease: { type: Number, default: 2.5 },
  lapses: { type: Number, default: 0 }
};

const conjugationRepetitionSchema = {
  [Tense.Cond]: spacedRepetitionSchema,
  [Tense.Futr]: spacedRepetitionSchema,
  [Tense.Impf]: spacedRepetitionSchema,
  [Tense.Pind]: spacedRepetitionSchema,
  [Tense.Pprf]: spacedRepetitionSchema,
  [Tense.Pret]: spacedRepetitionSchema,
  [Tense.Psub]: spacedRepetitionSchema
};

const wordRepetitionSchema = new Schema<WordStatistics>(
  {
    [Game.Audio]: spacedRepetitionSchema,
    [Game.SelectDef]: spacedRepetitionSchema,
    [Game.SelectWord]: spacedRepetitionSchema,
    [Game.TypeWord]: spacedRepetitionSchema,
    [Game.Conjugation]: conjugationRepetitionSchema,
    [Game.Gender]: spacedRepetitionSchema
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
    [Game.TypeWord]: statisticsSchema,
    [Game.Conjugation]: statisticsSchema,
    [Game.Gender]: statisticsSchema
  },
  { _id: false }
);

const conjugationSchema = new Schema<Conjugation>({
  cjid: { type: String, required: true },
  cjfs: { type: [String], required: true }
});

const wordSchema = new Schema<WordType>(
  {
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
    tags: [{ type: Schema.Types.ObjectId, ref: 'WordTag' }],
    additionalInfo: String,
    isLearned: Boolean,
    statistics: wordStatisticsSchema,
    alternativeSpelling: [String],
    conjugation: [conjugationSchema],
    spacedRepetition: wordRepetitionSchema
  },
  { toObject: { virtuals: true, getters: true, versionKey: false } }
);

wordSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

export const Word = model<WordType>('Word', wordSchema);
