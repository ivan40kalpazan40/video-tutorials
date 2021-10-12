const User = require('../models/User');
const generalServices = require('./generalServices');

const create = async (username, password, password2) => {
  const isValid = generalServices.validate(password, password2);
  if (isValid) {
    try {
      const user = await User.create({ username, password });
      return user;
    } catch (error) {
      throw error;
    }
  } else {
    throw new Error('Passwords do not match');
  }
};

const userServices = {
  create,
};
module.exports = userServices;
