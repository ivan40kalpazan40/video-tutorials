const express = require('express');
const router = express.Router();

const renderRegister = (req, res) => {
  res.render('user/register');
};

router.get('/register', renderRegister);

module.exports = router;
