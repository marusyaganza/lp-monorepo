import bcrypt from 'bcryptjs';
import { validatePassword, hashPassword } from './password';

describe('validatePassword', () => {
  test('with valid data', async () => {
    const password = 'encrypted_password';
    const sample = 'password';
    // @ts-expect-error: ts do not hanle this mocking case
    bcrypt.compare.mockReturnValueOnce(true);
    const result = await validatePassword(password, sample);
    expect(bcrypt.compare).toHaveBeenCalledWith(password, sample);
    expect(result).toEqual(true);
  });

  test('should return false with empty data', async () => {
    // @ts-expect-error: testing empty args case
    const result = await validatePassword();
    expect(result).toBe(false);
  });

  test('should return false with wrong password', async () => {
    const password = 'encrypted_password';
    const sample = 'wrong_password';
    const result = await validatePassword(password, sample);
    expect(result).toBe(false);
    expect(bcrypt.compare).toHaveBeenCalledWith(password, sample);
  });
});

describe('hashPassword', () => {
  test('should return hash with valid data', async () => {
    const password = 'password';
    const result = await hashPassword(password);
    expect(bcrypt.hash).toHaveBeenCalledWith(password, 5);
    expect(bcrypt.genSalt).toHaveBeenCalledWith(3);
    expect(result).toEqual('mock_hash_password_salt_5');
  });

  test('should return undefined with empty data', async () => {
    // @ts-expect-error: testing empty args case
    const result = await hashPassword(undefined);
    expect(result).toBe(undefined);
  });
});
