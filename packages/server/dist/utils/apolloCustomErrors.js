"use strict";
const { GraphQLError } = require('graphql');
class AuthenticationError extends GraphQLError {
    constructor(errorMessage, extensions) {
        super(errorMessage, { ...extensions, code: 'UNAUTHORIZED' });
    }
}
class UserInputError extends GraphQLError {
    constructor(errorMessage, extensions) {
        super(errorMessage, { ...extensions, code: 'BAD_USER_INPUT' });
    }
}
class OperationResolutionError extends GraphQLError {
    constructor(errorMessage, extensions) {
        super(errorMessage, {
            ...extensions,
            code: 'OPERATION_RESOLUTION_FAILURE'
        });
    }
}
exports.AuthenticationError = AuthenticationError;
exports.UserInputError = UserInputError;
exports.OperationResolutionError = OperationResolutionError;
//# sourceMappingURL=apolloCustomErrors.js.map