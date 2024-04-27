const app = require('./src/app');

const server = app.listen(3055, () => {
  console.log('Server running on port 3055');
});

process.on('SIGINT', () => {
  server.close((error) => {
    if (error) {
      console.error('Server closed with error::: ' + error);
      process.exit(1);
    }
    console.log('Server closed');
    process.exit(0);
  });
});
