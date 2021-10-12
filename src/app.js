const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const path = require('path');
const cookieParser = require('cookie-parser');

const app = express();
require('./config/handlebars')(app);
app.use(express.static(path.resolve(__dirname, './public')));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(routes);

mongoose
  .connect('mongodb://localhost:27017/tutorials')
  .then(() => {
    console.log('Connected to DB');
  })
  .then(() => {
    app.listen(
      3000,
      console.log.bind(console, 'This server works at port 3000 ....')
    );
  })
  .catch((err) => {
    console.log('CONNECTION ERROR :: ' + err.message);
  });
