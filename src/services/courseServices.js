const Course = require('../models/Course');

const getAll = async () => {
  const courses = await Course.find({}).lean();
  return courses;
};

const getOne = async (id) => {
  const course = await Course.findById(id).lean();
  return course;
};

const create = async (addCourse) => {
  const course = await Course.create(addCourse);
  return course;
};

const update = async (id, newCourse) => {
  const course = await Course.findByIdAndUpdate(id, newCourse, {
    runValidators: true,
  });
  return course;
};

const courseServices = { create, update, getAll, getOne };
module.exports = courseServices;
