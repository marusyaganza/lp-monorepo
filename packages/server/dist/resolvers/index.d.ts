import { Resolvers, GameConfig } from '../generated/graphql';
import { CreateTokenFuncType, UserTokenInfo, ValidatePasswordFuncType, HashPasswordFuncType } from '../auth';
import { ModelsType } from '../db/models';
import { SearchFuncType } from '../dictionary/searchWord';
import { GenerateGameDataFuncType } from '../utils/generateGameData';
export interface ResolverContext {
    models: ModelsType;
    user?: UserTokenInfo;
    createToken: CreateTokenFuncType;
    validatePassword: ValidatePasswordFuncType;
    hashPassword: HashPasswordFuncType;
    searchWord: SearchFuncType;
    games: GameConfig[];
    generateGameData: GenerateGameDataFuncType;
}
export declare const resolvers: Resolvers<ResolverContext>;
