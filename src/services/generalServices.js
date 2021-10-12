const validate = (pass1, pass2) => {
  return pass1 === pass2;
};

const userExists = (user) => {
  return user !== null;
};
const generalServices = { validate, userExists };
module.exports = generalServices;
