// errors.test.ts

import {
  AuthenticationError,
  AuthorizationError,
  UserInputError,
  OperationResolutionError,
  ERROR_CODES
} from './apolloCustomErrors';
import { ERROR_MESSAGES } from '../constants/errorMessages';
import { ApolloServerErrorCode } from '@apollo/server/errors';

describe('Custom GraphQL Errors', () => {
  // AuthenticationError Tests
  test('should instantiate AuthenticationError with default message and Unauthorized code', () => {
    const error = new AuthenticationError();

    expect(error).toBeInstanceOf(AuthenticationError);
    expect(error.message).toBe(ERROR_MESSAGES.NOT_AUTHENTICATED);
    expect(error.extensions).toHaveProperty('code', ERROR_CODES.Unauthorized);
  });

  test('should instantiate AuthenticationError with custom message', () => {
    const customMessage = 'Custom unauthorized message';
    const error = new AuthenticationError(customMessage);

    expect(error.message).toBe(customMessage);
    expect(error.extensions).toHaveProperty('code', ERROR_CODES.Unauthorized);
  });

  // AuthorizationError Tests
  test('should instantiate AuthorizationError with default message and Forbidden code', () => {
    const error = new AuthorizationError();

    expect(error).toBeInstanceOf(AuthorizationError);
    expect(error.message).toBe(ERROR_MESSAGES.NOT_AUTHORIZED);
    expect(error.extensions).toHaveProperty('code', ERROR_CODES.Forbidden);
  });

  test('should instantiate AuthorizationError with custom message', () => {
    const customMessage = 'Custom forbidden message';
    const error = new AuthorizationError(customMessage);

    expect(error.message).toBe(customMessage);
    expect(error.extensions).toHaveProperty('code', ERROR_CODES.Forbidden);
  });

  // UserInputError Tests
  test('should instantiate UserInputError with custom message and BAD_USER_INPUT code', () => {
    const customMessage = 'Invalid user input';
    const error = new UserInputError(customMessage);

    expect(error).toBeInstanceOf(UserInputError);
    expect(error.message).toBe(customMessage);
    expect(error.extensions).toHaveProperty(
      'code',
      ApolloServerErrorCode.BAD_USER_INPUT
    );
  });

  // OperationResolutionError Tests
  test('should instantiate OperationResolutionError with custom message and OPERATION_RESOLUTION_FAILURE code', () => {
    const customMessage = 'Failed to resolve operation';
    const error = new OperationResolutionError(customMessage);

    expect(error).toBeInstanceOf(OperationResolutionError);
    expect(error.message).toBe(customMessage);
    expect(error.extensions).toHaveProperty(
      'code',
      ApolloServerErrorCode.OPERATION_RESOLUTION_FAILURE
    );
  });
});
