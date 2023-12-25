"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WordModel = void 0;
const Word_1 = require("../schema/Word");
const graphql_1 = require("../../generated/graphql");
const helpers_1 = require("../helpers");
const games_1 = require("../../mocks/games");
const STATISTICS_FIELD = {
    lastTimePracticed: 0,
    practicedTimes: 0,
    errorCount: 0,
    successRate: 0
};
const DEFAULT_STATISTICS = {
    [graphql_1.Game.Audio]: STATISTICS_FIELD,
    [graphql_1.Game.SelectDef]: STATISTICS_FIELD,
    [graphql_1.Game.SelectWord]: STATISTICS_FIELD,
    [graphql_1.Game.TypeWord]: STATISTICS_FIELD
};
exports.WordModel = {
    async findOne(filter) {
        if (!filter?.user) {
            return null;
        }
        const word = await Word_1.Word.findOne((0, helpers_1.formatFilter)(filter));
        return (0, helpers_1.formatData)(word);
    },
    async findMany(filter) {
        if (!filter?.user) {
            return [];
        }
        const words = await Word_1.Word.find((0, helpers_1.formatFilter)(filter));
        return words;
    },
    // Check if criteria is defined, if so => sort by criteria, else use natural sorting
    async findManyAndSort(filter) {
        const { user, language = graphql_1.Language.English, sortBy, isReverseOrder, gameType, timesToLearn = 5 } = filter;
        if (!user) {
            return [];
        }
        let orderNum = isReverseOrder ? -1 : 1;
        // words with the highest number of errors should go first
        if (sortBy === graphql_1.SortBy.ErrorCount) {
            orderNum = -1 * orderNum;
        }
        let learningStatusFilter = {};
        let sort = { $natural: orderNum };
        // Select words that are not learned or have been practiced without error less than 5 times in a row
        if (gameType && sortBy !== graphql_1.SortBy.MemoryRefresher) {
            learningStatusFilter = {
                $and: [
                    { isLearned: { $ne: true } },
                    {
                        $or: [
                            { [`statistics.${gameType}.successRate`]: { $lt: timesToLearn } },
                            { [`statistics.${gameType}.successRate`]: null }
                        ]
                    }
                ]
            };
        }
        if (sortBy) {
            let propName = sortBy;
            if (gameType) {
                propName = `statistics.${gameType}.${sortBy}`;
            }
            if (sortBy === graphql_1.SortBy.MemoryRefresher) {
                learningStatusFilter = {
                    $or: [
                        { [`statistics.${gameType}.successRate`]: { $gte: timesToLearn } },
                        { isLearned: true }
                    ]
                };
            }
            else {
                sort = { [propName]: orderNum };
            }
        }
        const words = await Word_1.Word.find({ user, language, ...learningStatusFilter })
            // @ts-ignore
            .sort(sort);
        return words;
    },
    async createOne(fields) {
        const createdAt = Date.now();
        const updatedAt = createdAt;
        const stems = fields?.stems?.length ? fields.stems : [fields.name];
        const transcription = fields?.transcription || fields?.name;
        const isOffensive = !!fields?.isOffensive;
        const word = await Word_1.Word.create({
            ...fields,
            createdAt,
            updatedAt,
            stems,
            isOffensive,
            transcription,
            statistics: DEFAULT_STATISTICS
        });
        return (0, helpers_1.formatData)(word);
    },
    async updateOne(fields) {
        const updatedAt = Date.now();
        const update = { ...fields, updatedAt };
        const { ok, value } = await Word_1.Word.findOneAndUpdate({ _id: fields.id, user: fields.user }, update, { includeResultMetadata: true, new: true });
        const isOk = ok == 1 && value !== null;
        return { ok: isOk, value: (0, helpers_1.formatData)(value) };
    },
    // This method do not have a practical use for now
    async updateMany(data, user) {
        let isOk = true;
        const updatedAt = Date.now();
        data.forEach(async (entry) => {
            const update = { ...entry, updatedAt };
            const result = await Word_1.Word.findOneAndUpdate({ _id: entry.id, user }, update, { includeResultMetadata: true, new: true });
            isOk = isOk && result?.ok == 1 && result?.value !== null;
        });
        return { ok: isOk };
    },
    async updateStatistics(data) {
        let isOk = true;
        data.forEach(async (entry) => {
            try {
                const word = await Word_1.Word.findById(entry.id);
                if (!word) {
                    isOk = false;
                    return;
                }
                if (!word?.statistics) {
                    word.statistics = DEFAULT_STATISTICS;
                }
                const { gameType, hasError = false, isLearned = false } = entry;
                const timesToLearn = games_1.games.find(game => game.type === gameType)?.timesToLearn || 5;
                const currentStatistics = word?.statistics?.[gameType];
                const newStatistics = {
                    practicedTimes: 1,
                    errorCount: currentStatistics?.errorCount ?? 0,
                    successRate: currentStatistics?.successRate ?? 0,
                    lastTimePracticed: Date.now()
                };
                if (hasError) {
                    newStatistics.errorCount++;
                    newStatistics.successRate = 0;
                }
                if (!hasError) {
                    newStatistics.successRate++;
                }
                if (isLearned) {
                    newStatistics.successRate = timesToLearn;
                }
                if (currentStatistics?.practicedTimes) {
                    newStatistics.practicedTimes += currentStatistics.practicedTimes;
                }
                word.statistics[gameType] = newStatistics;
                await word.save();
            }
            catch (err) {
                console.error('saving statisticks failed', err);
                isOk = false;
            }
        });
        return { ok: isOk };
    },
    async deleteOne(filter) {
        const result = { ok: false };
        const { deletedCount, acknowledged } = await Word_1.Word.deleteOne({
            _id: filter.id,
            user: filter.user
        });
        if (acknowledged && deletedCount == 1) {
            result.ok = true;
        }
        return result;
    }
};
//# sourceMappingURL=Word.js.map