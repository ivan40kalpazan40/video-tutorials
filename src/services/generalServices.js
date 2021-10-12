const validate = (pass1, pass2) => {
  return pass1 === pass2;
};

const generalServices = { validate };
module.exports = generalServices;
