"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Word = void 0;
const mongoose_1 = require("mongoose");
const graphql_1 = require("../../generated/graphql");
const tagsSchema = new mongoose_1.Schema({
    color: { type: String, required: true },
    text: { type: String, required: true }
}, { _id: false });
const examplesSchema = new mongoose_1.Schema({
    text: { type: String, required: true },
    translation: String
}, { _id: false });
const defSchema = new mongoose_1.Schema({
    def: {
        type: String,
        required: true
    },
    examples: [examplesSchema]
}, { _id: false });
const statisticsSchema = new mongoose_1.Schema({
    successRate: Number,
    lastTimePracticed: Number,
    practicedTimes: Number,
    errorCount: Number
}, { _id: false });
const wordStatisticsSchema = new mongoose_1.Schema({
    [graphql_1.Game.Audio]: statisticsSchema,
    [graphql_1.Game.SelectDef]: statisticsSchema,
    [graphql_1.Game.SelectWord]: statisticsSchema,
    [graphql_1.Game.TypeWord]: statisticsSchema
}, { _id: false });
const wordSchema = new mongoose_1.Schema({
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
    language: { type: String, enum: graphql_1.Language },
    particle: String,
    stems: [String],
    tags: [tagsSchema],
    additionalInfo: String,
    isLearned: Boolean,
    statistics: wordStatisticsSchema
});
exports.Word = (0, mongoose_1.model)('Word', wordSchema);
//# sourceMappingURL=Word.js.map