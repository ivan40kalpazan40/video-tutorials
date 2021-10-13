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

const renderDetails = async (req, res) => {
  const courseId = req.params.id;
  const course = await courseServices.getOne(courseId);
  res.render('course/details', { course, user: req.user });
};

const renderEdit = async (req, res) => {
  const courseId = req.params.id;
  const course = await courseServices.getOne(courseId);
  res.render('course/edit', { course, user: req.user });
};

const editCourse = async (req, res) => {
  const courseId = req.params.id;
  const { title, description, imageUrl, isPublic } = req.body;
  try {
    const course = await courseServices.update(courseId, {
      title,
      description,
      imageUrl,
      isPublic: Boolean(isPublic),
    });
    res.redirect('/');
  } catch (error) {
    console.log('Course update failed!');
    res.redirect(`/course/${courseId}/edit`);
  }
};

const deleteCourse = () => {
  console.log('FROM DELETE');
};

router.get('/create', renderCreate);
router.post('/create', createCourse);
router.get('/:id/details', renderDetails);
router.get('/:id/edit', renderEdit);
router.post('/:id/edit', editCourse);
router.get('/:id/delete', deleteCourse);
module.exports = router;
