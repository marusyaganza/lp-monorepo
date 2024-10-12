import { Schema, model } from 'mongoose';
import {
  GameConfig,
  Language,
  Game as GameType
} from '../../generated/graphql';

export interface GameConfigType extends GameConfig {
  languages: Language[];
}

const gameSchema = new Schema<GameConfigType>(
  {
    name: { type: String, required: true },
    desc: { type: String, required: true },
    type: {
      type: String,
      required: true,
      enum: GameType,
      immutable: true,
      unique: true
    },
    wordsPerGame: { type: Number, required: true },
    optionsPerGame: { type: Number, required: true },
    minWords: { type: Number, required: true },
    timesToLearn: { type: Number, required: true },
    languages: [{ type: String, enum: Language, required: true }],
    orderNum: { type: Number, unique: true }
  },
  { toObject: { virtuals: true, getters: true, versionKey: false } }
);

gameSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

export const Game = model<GameConfigType>('Game', gameSchema);
