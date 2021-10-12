const express = require('express');
const handlebarsInit = require('./config/handlebars');
const path = require('path');

const app = express();
require('./config/handlebars')(app);
app.use(express.static(path.resolve(__dirname, './public')));
app.get('/', (req, res) => {
  res.render('index');
});

app.listen(
  3000,
  console.log.bind(console, 'This server works at port 3000 ....')
);
