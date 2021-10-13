const express = require('express');
const User = require('../models/User');
const Course = require('../models/Course');
const courseServices = require('../services/courseServices');
const userServices = require('../services/userServices');
const router = express.Router();

const renderCreate = (req, res) => {
  res.render('course/create', { user: req.user });
};

const createCourse = async (req, res) => {
  const { title, description, imageUrl, isPublic } = req.body;
  const userId = req.user._id;
  try {
    const user = await userServices.getUser(userId);

    const course = await courseServices.create({
      title,
      description,
      imageUrl,
      isPublic: Boolean(isPublic),
    });
    await user.becomeAuthor(course);
    user.save();
    res.redirect('/');
  } catch (error) {
    console.log(error.message);
    res.redirect('/course/create');
  }
};

const renderDetails = async (req, res) => {
  const courseId = req.params.id;
  const userId = req.user._id;
  try {
    const user = await userServices.getUser(userId);
    const course = await courseServices.getOne(courseId);
    const isEnrolled = await user.isEnrolled(courseId);
    const isAuthor = await user.isAuthor(courseId);
    res.render('course/details', {
      course,
      user: req.user,
      isEnrolled,
      isAuthor,
    });
  } catch (error) {
    console.log(error.message);
    res.redirect(`/course/${courseId}/details`);
  }
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

const deleteCourse = async (req, res) => {
  const courseId = req.params.id;
  await courseServices.deleteOne(courseId);
  res.redirect('/');
};

const enrollUser = async (req, res) => {
  const userId = req.user._id;
  const courseId = req.params.id;
  try {
    const user = await userServices.getUser(userId);
    const course = await courseServices.getCourse(courseId);
    await user.enroll(course);
    await course.addEnrolledUsers(user);
    await course.save();
    await user.save();
    res.redirect(`/course/${courseId}/details`);
  } catch (error) {
    console.log(error.message);
    res.redirect(`/`);
  }
};

router.get('/create', renderCreate);
router.post('/create', createCourse);
router.get('/:id/details', renderDetails);
router.get('/:id/edit', renderEdit);
router.post('/:id/edit', editCourse);
router.get('/:id/delete', deleteCourse);
router.get('/:id/enroll', enrollUser);
module.exports = router;
