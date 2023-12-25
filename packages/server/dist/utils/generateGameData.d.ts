import { Game, Word, GameData, GameConfig, Language, WordDefinition, DefExample } from '../generated/graphql';
export type GenerateGameDataFuncType = (gameType: Game, words: Word[], config: GameConfig) => GameData;
export declare function generateRandomNumber(limit: number): number;
export declare function getExamples(defs?: (WordDefinition | null)[] | null): (DefExample | null)[] | undefined;
/**Replaces word's `name` in `def` with `[...]` block
 * required to exclude the answer from the question
 */
export declare function prepareDef(def?: string | null, name?: string | null): string;
export declare function generateOptions(data: Word[], count: number, currentWordId: string, language: Language): Partial<Word>[];
export declare function insertAnswer(data: string[], answer: string): string[];
export declare const generateGameData: GenerateGameDataFuncType;
