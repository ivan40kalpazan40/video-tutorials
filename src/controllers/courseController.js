const express = require('express');
const router = express.Router();

const renderCreate = (req, res) => {
  res.render('course/create');
};

const renderDetails = (req, res) => {
  res.render('course/details');
};
router.use('/create', renderCreate);
router.use('/details', renderDetails);

module.exports = router;
