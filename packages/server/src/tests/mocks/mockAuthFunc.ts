import { validatePassword, createToken, hashPassword } from '../../auth';

export const mockCreateToken = jest.fn(
  data => `token_${JSON.stringify(data || '')}`
) as typeof createToken;

export const mockValidatePassword = jest.fn(
  async () => true
) as typeof validatePassword;

export const mockHashPassword = jest.fn(
  async pass => `mock_hash_${pass}`
) as typeof hashPassword;
