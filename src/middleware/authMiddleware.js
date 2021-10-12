const jwt = require('jsonwebtoken');
const SECRET = 'izpravisebegenieidvame';

exports.auth = function (req, res, next) {
  const token = req.cookies['mycookie'];
  if (token) {
    jwt.verify(token, SECRET, (err, decodedToken) => {
      if (err) {
        throw err;
      }
      req.user = decodedToken;
      next();
    });
  } else {
    next();
  }
};
