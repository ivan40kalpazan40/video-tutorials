const Course = require('../models/Course');

const getAll = async () => {
  const courses = await Course.find({}).lean();
  return courses;
};

const getOne = async (id) => {
  const course = await Course.findById(id).lean();
  return course;
};

const getCourse = async (id) => {
  const course = await Course.findById(id);
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

const deleteOne = async (id) => {
  return await Course.findByIdAndDelete(id);
};

const courseServices = {
  create,
  update,
  deleteOne,
  getAll,
  getOne,
  getCourse,
};
module.exports = courseServices;
