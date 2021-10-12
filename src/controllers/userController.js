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
    .create(username, password, repeatPassword)
    .then((user) => {
      res.redirect('/user/login');
    })
    .catch((err) => {
      console.log(err.message);
      res.redirect('/user/register');
    });
  const user = console.log('REGISTER USER POST REQUEST');
};

const renderLogin = (req, res) => {
  res.render('user/login');
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await userServices.logUser(username, password);
    res.cookie('mycookie', 'sgfsgfdafd');
    res.redirect('/user');
  } catch (error) {
    console.log(error.message);
    res.redirect('/user/login');
  }
};

router.get('/register', renderRegister);
router.post('/register', registerUser);
router.get('/login', renderLogin);
router.post('/login', loginUser);
router.get('/', userHomePage);

module.exports = router;
