const express = require('express');
const { homeLogged } = require('../middleware/authMiddleware');
const router = express.Router();

const renderHome = (req, res) => {
  res.render('index', { user: req.user });
};

router.get('/', homeLogged, renderHome);

module.exports = router;
