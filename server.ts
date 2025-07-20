import app from './app.js';
import config from './config/environment.js';

(async () => {
  app.listen(config.port, () => {
    console.log(`Server started on port ${config.port}`);
  });
})();
