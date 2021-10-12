const express = require('express');
const router = express.Router();

const userHomePage = (req, res) => {
    res.render('user/user-home')
}

const renderRegister = (req, res) => {
  res.render('user/register');
};
const renderLogin = (req, res) => {
  res.render('user/login');
};

router.get('/register', renderRegister);
router.get('/login', renderLogin);
router.get('/', userHomePage)

module.exports = router;
