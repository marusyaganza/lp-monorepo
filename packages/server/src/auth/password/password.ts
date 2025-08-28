import bcrypt from 'bcryptjs';

const { SALT_NUMBER } = process.env;

export async function hashPassword(
  password: string
): Promise<string | undefined> {
  if (!password) {
    return;
  }
  const salt = await bcrypt.genSalt(parseInt(SALT_NUMBER || '10'));
  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, parseInt(salt));
  } catch (err) {
    console.error('hashing password error', err);
  }
  return hashedPassword;
}

export async function validatePassword(
  password: string,
  sample: string
): Promise<boolean> {
  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(password, sample);
  } catch (err) {
    console.error('validating password error', err);
  }
  return isValidPassword;
}
