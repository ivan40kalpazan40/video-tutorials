const path = require('path');
const handlebars = require('express-handlebars');
const handlebarsInit = (app) => {
  app.set('views', path.resolve('./src/views'));
  app.engine('hbs', handlebars({ extname: '.hbs' }));
  app.set('view engine', 'hbs');
};

module.exports = handlebarsInit;
