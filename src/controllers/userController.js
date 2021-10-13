const express = require('express');
const userServices = require('../services/userServices');
const courseServices = require('../services/courseServices');
const generalServices = require('../services/generalServices');
const { homeNotLogged } = require('../middleware/authMiddleware');
const router = express.Router();

const userHomePage = async (req, res) => {
  const courses = await courseServices.getAll();
  res.render('user/user-home', { courses, user: req.user });
};

const renderRegister = (req, res) => {
  res.render('user/register');
};

const registerUser = async (req, res) => {
  const { username, password, repeatPassword } = req.body;
  try {
    const user = await userServices.create(username, password, repeatPassword);
    res.redirect('/user/login');
  } catch (error) {
    console.log(error.message);
    res.redirect('/user/register');
  }
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
router.get('/', homeNotLogged, userHomePage);

module.exports = router;
