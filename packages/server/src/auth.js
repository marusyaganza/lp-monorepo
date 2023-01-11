const { AuthenticationError } = require('apollo-server');
const jwt = require('jsonwebtoken');
const { JWT_SECTET } = process.env;

const createToken = ({ id, role }) => jwt.sign({ id, role }, JWT_SECTET);

/**retrieve user data from the token */
const getUserFromToken = token => {
  try {
    const user = jwt.verify(token, JWT_SECTET);
    return user;
  } catch (e) {
    console.log('error', e);
    return null;
  }
};

const authenticated = next => (root, args, context, info) => {
  if (!context.user) {
    throw new AuthenticationError('Login to perform this operation');
  }
  return next(root, args, context, info);
};

const authorized = (role, next) => (root, args, context, info) => {
  //   console.log('auth', context.user, role);
  if (!context.user || context.user.role !== role) {
    throw new AuthenticationError(
      'You do not have permission to perform this operation'
    );
  }
  return next(root, args, context, info);
};

module.exports = {
  createToken,
  getUserFromToken,
  authenticated,
  authorized
};
