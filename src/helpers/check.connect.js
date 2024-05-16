'use strict';
const mongoose = require('mongoose');
const os = require('os');
const MONITOR_INTERVAL = 5000; // 5 seconds
const countConnect = () => {
  const numConnection = mongoose.connections.length;
  console.log('Number of connections: ', numConnection);
};

const checkOverload = () => {
  setInterval(() => {
    const numConnection = mongoose.connections.length;
    const numCores = os.cpus().length;
    const memoryUsage = process.memoryUsage().rss;
    console.log(`Active connections:: ${numConnection}`);
    console.log('Memory usage: ', `${memoryUsage / 1024 / 1024} MB`);
    const maxConnection = numCores * 5;
    if (numConnection > maxConnection) {
      console.log('Overload connections');
    }
  }, MONITOR_INTERVAL);
};
module.exports = { countConnect, checkOverload };
