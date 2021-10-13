const express = require('express');
const userServices = require('../services/userServices');
const generalServices = require('../services/generalServices');
const router = express.Router();

const userHomePage = (req, res) => {
  res.render('user/user-home', { user: req.user });
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
    const token = await generalServices.createToken(user);
    res.cookie('mycookie', token);
    res.redirect('/user');
  } catch (error) {
    console.log(error.message);
    res.redirect('/user/login');
  }
};

const logoutUser = (req, res) => {
  res.clearCookie('mycookie').redirect('/');
};

router.get('/register', renderRegister);
router.post('/register', registerUser);
router.get('/login', renderLogin);
router.post('/login', loginUser);
router.get('/logout', logoutUser);
router.get('/', userHomePage);

module.exports = router;
