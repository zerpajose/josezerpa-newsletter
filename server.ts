import app from './app.js';
import config from './config/environment.js';

(async () => {
  const port = process.env.PORT ? Number(process.env.PORT) : 8080;
  app.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });
})();
