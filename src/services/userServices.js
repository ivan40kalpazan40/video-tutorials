const User = require('../models/User');
const bcrypt = require('bcrypt');
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

const logUser = async (username, password) => {
  try {
    const user = await User.findOne({ username });
    if (generalServices.userExists(user)) {
      const isValid = await user.validatePassword(password);
      if (isValid) {
        return user;
      } else {
        throw new Error('User and/or password do not match!');
      }
    } else {
      throw new Error('User and/or password do not match!');
    }
  } catch (error) {
    throw error;
  }
};

const userServices = {
  create,
  logUser,
};
module.exports = userServices;
