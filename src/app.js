const express = require('express');
const routes = require('./routes');
const path = require('path');

const app = express();
require('./config/handlebars')(app);
app.use(express.static(path.resolve(__dirname, './public')));
app.use(routes);

app.listen(
  3000,
  console.log.bind(console, 'This server works at port 3000 ....')
);
