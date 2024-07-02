export const createToken = jest.fn(() => 'token');
export const validatePassword = jest.fn(() => true);
export const hashPassword = jest.fn(pass => `mock_hash_${pass}`);
