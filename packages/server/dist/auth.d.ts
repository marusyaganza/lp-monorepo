import { Role, ResolverFn } from './generated/graphql';
import { ResolverContext } from 'resolvers';
export interface UserTokenInfo {
    id: string;
    role: Role;
}
export declare const ERROR_MESSAGES: {
    NOT_AUTHENTICATED: string;
    NOT_AUTHORIZED: string;
};
export type ResolverFunc = ResolverFn<any, any, ResolverContext, any>;
export type CreateTokenFuncType = (user: UserTokenInfo) => string | undefined;
export type HashPasswordFuncType = (password?: string) => Promise<string>;
export type ValidatePasswordFuncType = (password?: string, sample?: string) => Promise<boolean>;
export declare const hashPassword: HashPasswordFuncType;
export declare const validatePassword: ValidatePasswordFuncType;
export declare const createToken: CreateTokenFuncType;
export declare function getUserFromToken(token?: string): UserTokenInfo | undefined;
export declare function authenticated(next: ResolverFunc): ResolverFunc;
export declare function authorized(role: Role, next: ResolverFunc): ResolverFunc;
