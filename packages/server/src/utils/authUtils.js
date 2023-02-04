const bcrypt = require('bcryptjs');

async function hashPassword(password) {
  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(
      password,
      parseInt(process.env.SALT_NUMBER)
    );
  } catch (err) {
    console.log('error');
  }
  return hashPassword;
}

async function validatePassword(password, sample) {
  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(password, sample);
  } catch (err) {
    console.error(err);
  }
  return isValidPassword;
}

exports.hashPassword = hashPassword;
exports.validatePassword = validatePassword;
