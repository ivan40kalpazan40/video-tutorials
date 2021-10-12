const express = require('express');
const userServices = require('../services/userServices');
const router = express.Router();

const userHomePage = (req, res) => {
  res.render('user/user-home');
};

const renderRegister = (req, res) => {
  res.render('user/register');
};

const registerUser = (req, res) => {
  const { username, password, repeatPassword } = req.body;
  userServices
    .create(username, password)
    .then((user) => {
      console.log(user);
      res.redirect('/user/login');
    })
    .catch((err) => {
      console.log(err.message);
      res.send(err.message);
    });
  const user = console.log('REGISTER USER POST REQUEST');
};
const renderLogin = (req, res) => {
  res.render('user/login');
};

router.get('/register', renderRegister);
router.post('/register', registerUser);
router.get('/login', renderLogin);
router.get('/', userHomePage);

module.exports = router;
