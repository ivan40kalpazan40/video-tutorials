const express = require('express');
const router = express.Router();

const renderCreate = (req, res) => {
  res.render('course/create');
};

router.use('/create', renderCreate);

module.exports = router;
