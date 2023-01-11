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

exports.AuthenticationError = AuthenticationError;
exports.UserInputError = UserInputError;
