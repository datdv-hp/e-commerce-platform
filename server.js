const app = require('./src/app');

const PORT = process.env.PORT || 3055;
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
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
