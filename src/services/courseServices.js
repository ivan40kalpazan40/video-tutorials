const Course = require('../models/Course');

const getAll = async () => {
  const courses = await Course.find({}).lean();
  return courses;
};

const create = async (addCourse) => {
  const course = await Course.create(addCourse);
  return course;
};

const courseServices = { create, getAll };
module.exports = courseServices;
