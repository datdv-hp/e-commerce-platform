'use strict';
const mongoose = require('mongoose');
const { countConnect } = require('../helpers/check.connect');

const { MONGO_HOST, MONGO_PORT, MONGO_DATABASE_NAME, MONGO_PREFIX, NODE_ENV } =
  process.env;
const connectString = `${MONGO_PREFIX}://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DATABASE_NAME}`;

class Database {
  constructor() {
    this.connect();
  }

  connect(type = 'mongodb') {
    if (NODE_ENV === 'development') {
      mongoose.set('debug', true);
      mongoose.set('debug', { color: true });
    }
    mongoose
      .connect(connectString, { maxPoolSize: 50 })
      .then(() => {
        console.log('Connected to MongoDB');
        countConnect();
      })
      .catch((err) => console.error('Could not connect to MongoDB', err));
  }

  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return this.instance;
  }
}

const instanceMongoDb = Database.getInstance();

module.exports = instanceMongoDb;
