import { GraphQLError } from 'graphql';
import { ApolloServerErrorCode } from '@apollo/server/errors';
import { ERROR_MESSAGES } from '../constants/errorMessages';

export enum ERROR_CODES {
  Unauthorized = 'UNAUTHORIZED',
  Forbidden = 'FORBISSEN'
}

export class AuthenticationError extends GraphQLError {
  constructor(errorMessage = ERROR_MESSAGES.NOT_AUTHENTICATED) {
    super(errorMessage, { extensions: { code: ERROR_CODES.Unauthorized } });
  }
}

export class AuthorizationError extends GraphQLError {
  constructor(errorMessage = ERROR_MESSAGES.NOT_AUTHORIZED) {
    super(errorMessage, { extensions: { code: ERROR_CODES.Forbidden } });
  }
}

export class UserInputError extends GraphQLError {
  constructor(errorMessage: string) {
    super(errorMessage, {
      extensions: { code: ApolloServerErrorCode.BAD_USER_INPUT }
    });
  }
}

export class OperationResolutionError extends GraphQLError {
  constructor(errorMessage: string) {
    super(errorMessage, {
      extensions: {
        code: ApolloServerErrorCode.OPERATION_RESOLUTION_FAILURE
      }
    });
  }
}
