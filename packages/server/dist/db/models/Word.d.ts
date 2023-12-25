import { Word as WordType, NewWordInput, UpdateStatisticsInput, Language, Game, SortBy, SortWordsBy } from '../../generated/graphql';
type wordsFilter = {
    sortBy?: SortBy | SortWordsBy | 'updatedAt';
    language: Language;
    isReverseOrder: boolean;
    timesToLearn?: number | null;
    gameType?: Game;
    user?: string;
};
export interface WordModelType {
    findOne: (filter: Partial<WordType>) => Promise<WordType | null>;
    findMany: (filter: Partial<WordType>) => Promise<WordType[] | null>;
    findManyAndSort: (filter: wordsFilter) => Promise<WordType[] | null>;
    createOne: (fields: NewWordInput) => Promise<WordType | null>;
    updateOne: (fields: Partial<WordType> & Pick<WordType, 'id' | 'user'>) => Promise<{
        ok: boolean;
        value: WordType | null;
    }>;
    updateMany: (fields: Partial<WordType> & Pick<WordType, 'id'>[], user?: string) => Promise<{
        ok: boolean;
    }>;
    deleteOne: (filter: {
        id: string;
        user?: string;
    }) => Promise<{
        ok: boolean;
    }>;
    updateStatistics: (data: UpdateStatisticsInput[], user?: string) => Promise<{
        ok: boolean;
    }>;
}
export declare const WordModel: WordModelType;
export {};
