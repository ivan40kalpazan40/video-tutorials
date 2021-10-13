const jwt = require('jsonwebtoken');
const SECRET = 'izpravisebegenieidvame';

const validate = (pass1, pass2) => {
  return pass1 === pass2;
};

const userExists = (user) => {
  return user !== null;
};

const createToken = (user) => {
  const payload = {
    _id: user._id,
    username: user.username,
    enrolledIn: user.enrolledIn,
  };
  return new Promise((resolve, reject) => {
    jwt.sign(payload, SECRET, (err, token) => {
      if (err) {
        reject(err);
      } else {
        resolve(token);
      }
    });
  });
};
const generalServices = { validate, userExists, createToken };
module.exports = generalServices;
