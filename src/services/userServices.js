const User = require('../models/User');

const create = async (username, password) => {
  const user = await User.create({ username, password });
  return user;
};

const userServices = {
  create,
};
module.exports = userServices;
