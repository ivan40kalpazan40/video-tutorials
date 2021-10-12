const express = require('express');
const homeController = require('./controllers/homeController');
const router = express.Router();

const pageNotFound = (req, res) => {
  res.status(404).redirect(`/`);
};
router.use(homeController);
router.use('*', pageNotFound);

module.exports = router;
