const express = require('express');
const courseServices = require('../services/courseServices');
const router = express.Router();

const renderCreate = (req, res) => {
  res.render('course/create', { user: req.user });
};

const createCourse = async (req, res) => {
  const { title, description, imageUrl, isPublic } = req.body;
  try {
    const course = await courseServices.create({
      title,
      description,
      imageUrl,
      isPublic: Boolean(isPublic),
    });
    res.redirect('/');
  } catch (error) {
    console.log(error.message);
    res.redirect('/course/create');
  }
};

const renderDetails = (req, res) => {
  res.render('course/details');
};
router.get('/create', renderCreate);
router.post('/create', createCourse);
router.get('/details', renderDetails);

module.exports = router;
