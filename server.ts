import app from './app.js';

const port = process.env.PORT || 8080;

(async () => {
  app.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });
})();
