const express = require('express');
const path = require('path');
const handlebars = require('express-handlebars');

const app = express();
app.set('views', path.resolve('./src/views'));
app.engine('hbs', handlebars({ extname: '.hbs' }));
app.set('view engine', 'hbs');

app.get('/', (req, res) => {
  res.render('index');
});

app.listen(
  3000,
  console.log.bind(console, 'This server works at port 3000 ....')
);
