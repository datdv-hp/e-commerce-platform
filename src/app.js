'use strict';
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const compression = require('compression');

const app = express();

// init middleware
app.use(morgan('dev'));
app.use(helmet());
app.use(compression());

// init database

// init router
app.get('/', (req, res, next) => {
  const strCompress = 'Hello js';
  return res
    .status(200)
    .json({ message: 'Welcome', meta: strCompress.repeat(100000) });
});

// handle error

module.exports = app;