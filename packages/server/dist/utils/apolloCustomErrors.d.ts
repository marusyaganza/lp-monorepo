export class AuthenticationError extends GraphQLError {
    constructor(errorMessage: any, extensions: any);
}
export class UserInputError extends GraphQLError {
    constructor(errorMessage: any, extensions: any);
}
export class OperationResolutionError extends GraphQLError {
    constructor(errorMessage: any, extensions: any);
}
import { GraphQLError } from "graphql";
