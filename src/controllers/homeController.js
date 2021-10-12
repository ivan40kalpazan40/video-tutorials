const express = require('express');
const router = express.Router();

const renderHome = (req, res) => {
  res.render('index', { user: req.user });
};

router.get('/', renderHome);

module.exports = router;
