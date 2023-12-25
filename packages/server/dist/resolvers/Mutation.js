"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MutationResolvers = void 0;
const auth_1 = require("../auth");
const apolloCustomErrors_1 = require("../utils/apolloCustomErrors");
const graphql_1 = require("../generated/graphql");
exports.MutationResolvers = {
    saveWord: (0, auth_1.authorized)(graphql_1.Role.Member, async (_, { input }, { models, user }) => {
        const existing = input?.uuid
            ? await models.Word.findOne({
                user: user?.id,
                uuid: input?.uuid
            })
            : null;
        if (existing) {
            throw new apolloCustomErrors_1.UserInputError(`word with uuid ${input?.uuid} is already added`);
        }
        const word = await models.Word.createOne({ ...input, user: user?.id });
        return word;
    }),
    updateWord: (0, auth_1.authorized)(graphql_1.Role.Member, async (_, { input }, { models, user }) => {
        const result = await models.Word.updateOne({
            ...input,
            user: user?.id
        });
        if (!result?.ok) {
            throw new apolloCustomErrors_1.UserInputError(`updating word with id ${input.id} failed`);
        }
        return result?.value;
    }),
    saveGameResult: (0, auth_1.authorized)(graphql_1.Role.Member, async (_, { input }, { models, user }) => {
        const result = await models.Word.updateStatistics(input, user?.id);
        if (!result?.ok) {
            throw new apolloCustomErrors_1.UserInputError(`saving training result failed`);
        }
        return 'Game result saved';
    }),
    deleteWord: (0, auth_1.authorized)(graphql_1.Role.Member, async (_, { id }, { models, user }) => {
        const result = await models.Word.deleteOne({ id, user: user?.id });
        if (!result?.ok) {
            throw new apolloCustomErrors_1.UserInputError(`deleting word with id ${id} failed`);
        }
        return `word with id ${id} was deleted`;
    }),
    signUp: async (_, { input }, { models, createToken, hashPassword }) => {
        if (process?.env?.NODE_ENV === 'production') {
            throw new apolloCustomErrors_1.OperationResolutionError(`sign up operation is not available now. Sorry for inconvenience`);
        }
        const existing = await models.User.findOne({ email: input?.email });
        if (existing) {
            throw new apolloCustomErrors_1.AuthenticationError(`user with email ${input?.email} already exists`);
        }
        const role = graphql_1.Role.Member;
        const hashedPassword = await hashPassword(input?.password);
        if (!hashedPassword) {
            throw new apolloCustomErrors_1.OperationResolutionError(`sign up operation failed`);
        }
        const user = await models.User.createOne({
            ...input,
            password: hashedPassword,
            role
        });
        if (!user) {
            throw new apolloCustomErrors_1.OperationResolutionError(`sign up operation failed`);
        }
        const userInfo = {
            id: user.id,
            role: user.role
        };
        const token = createToken(userInfo);
        if (!token) {
            throw new apolloCustomErrors_1.OperationResolutionError(`sign up operation failed`);
        }
        return { ...user, token };
    },
    login: async (_, { input }, { models, createToken, validatePassword }) => {
        const user = await models.User.findOne({ email: input?.email });
        if (!user) {
            throw new apolloCustomErrors_1.AuthenticationError(`email or password is incorrect`);
        }
        const isValidPassword = await validatePassword(input.password, user.password);
        if (!isValidPassword) {
            throw new apolloCustomErrors_1.AuthenticationError(`email or password is incorrect`);
        }
        const userInfo = {
            id: user.id,
            role: user.role
        };
        const token = createToken(userInfo);
        if (!token) {
            throw new apolloCustomErrors_1.OperationResolutionError(`sign up operation failed`);
        }
        // TODO find a way to simplify this
        const result = {
            token,
            firstName: user.firstName,
            lastName: user.lastName,
            createdAt: user.createdAt,
            id: user.id,
            role: user.role,
            email: user.email
        };
        return result;
    }
};
//# sourceMappingURL=Mutation.js.map