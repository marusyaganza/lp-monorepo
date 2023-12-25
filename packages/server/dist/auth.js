"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorized = exports.authenticated = exports.getUserFromToken = exports.createToken = exports.validatePassword = exports.hashPassword = exports.ERROR_MESSAGES = void 0;
const apolloCustomErrors_1 = require("./utils/apolloCustomErrors");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
exports.ERROR_MESSAGES = {
    NOT_AUTHENTICATED: 'Login to perform this operation',
    NOT_AUTHORIZED: 'You do not have permission to perform this operation'
};
const { JWT_SECTET, TOKEN_TTL } = process.env;
const hashPassword = async function (password) {
    if (!password) {
        return;
    }
    const salt = bcrypt.genSalt(10);
    let hashedPassword;
    try {
        hashedPassword = await bcrypt.hash(password, parseInt(salt));
    }
    catch (err) {
        console.log('error');
    }
    return hashedPassword;
};
exports.hashPassword = hashPassword;
const validatePassword = async function (password, sample) {
    let isValidPassword = false;
    try {
        isValidPassword = await bcrypt.compare(password, sample);
    }
    catch (err) {
        console.error(err);
    }
    return isValidPassword;
};
exports.validatePassword = validatePassword;
const createToken = ({ id, role }) => {
    if (!JWT_SECTET) {
        return;
    }
    const tokenTtl = TOKEN_TTL || 7;
    const token = jwt.sign({ id, role }, JWT_SECTET, {
        expiresIn: `${tokenTtl}d`
    });
    return token;
};
exports.createToken = createToken;
function getUserFromToken(token) {
    if (!token || !JWT_SECTET) {
        return;
    }
    try {
        const user = jwt.verify(token, JWT_SECTET);
        return user;
    }
    catch (e) {
        console.log('error', e);
        return;
    }
}
exports.getUserFromToken = getUserFromToken;
function authenticated(next) {
    return async (root, args, context, info) => {
        const id = context?.user?.id;
        if (!id) {
            throw new apolloCustomErrors_1.AuthenticationError(exports.ERROR_MESSAGES.NOT_AUTHENTICATED);
        }
        const existingUser = await context?.models?.User?.findOne({ id });
        if (!existingUser) {
            throw new apolloCustomErrors_1.AuthenticationError(exports.ERROR_MESSAGES.NOT_AUTHENTICATED);
        }
        return next(root, args, context, info);
    };
}
exports.authenticated = authenticated;
function authorized(role, next) {
    return async (root, args, context, info) => {
        const id = context?.user?.id;
        if (!id) {
            throw new apolloCustomErrors_1.AuthenticationError(exports.ERROR_MESSAGES.NOT_AUTHORIZED);
        }
        const existingUser = await context?.models?.User?.findOne({ id });
        if (existingUser?.role !== role) {
            throw new apolloCustomErrors_1.AuthenticationError(exports.ERROR_MESSAGES.NOT_AUTHORIZED);
        }
        return next(root, args, context, info);
    };
}
exports.authorized = authorized;
//# sourceMappingURL=auth.js.map