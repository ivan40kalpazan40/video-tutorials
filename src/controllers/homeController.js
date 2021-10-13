const express = require('express');
const courseServices = require('../services/courseServices');
const { homeLogged } = require('../middleware/authMiddleware');
const router = express.Router();

const renderHome = async (req, res) => {
  const courses = await courseServices.getAll();
  res.render('index', { courses, user: req.user });
};

router.get('/', homeLogged, renderHome);

module.exports = router;
