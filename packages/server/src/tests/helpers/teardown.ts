module.exports = async () => {
  const mongoose = require('mongoose');
  await mongoose.connection.close();
};
