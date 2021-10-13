const Course = require('../models/Course');

const create = async (addCourse) => {
  const course = await Course.create(addCourse);
  return course;
};

const courseServices = { create };
module.exports = courseServices;
