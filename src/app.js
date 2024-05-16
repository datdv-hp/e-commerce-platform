'use strict';
require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const compression = require('compression');
const router = require('./routes');
const { NotFoundError } = require('./core/error.response');
const { errorHandler } = require('./middlewares/handler');

const app = express();

// init middleware
app.use(morgan('dev'));
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// init database
require('./dbs/init.mongodb');

// routes
app.use('/api/v1', router);

// handle NOT_FOUND
app.use((_, __, next) => {
  next(new NotFoundError());
});

app.use(errorHandler);

module.exports = app;
