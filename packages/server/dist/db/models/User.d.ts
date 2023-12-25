import { UserType } from '../schema/User';
import { SignUpInput, Role } from '../../generated/graphql';
export interface UserModelType {
    findOne: (filter: Partial<UserType>) => Promise<UserType | null>;
    findMany: (filter: Partial<UserType>) => Promise<UserType[] | null>;
    createOne: (fields: SignUpInput & {
        role: Role;
    }) => Promise<UserType | null>;
    updateOne: (fields: Partial<UserType>) => Promise<{
        ok: boolean;
        value: UserType | null;
    }>;
    deleteOne: (filter: {
        id: string;
    }) => Promise<{
        ok: boolean;
    }>;
}
export declare const UserModel: UserModelType;
