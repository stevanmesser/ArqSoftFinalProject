import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import 'express-async-errors';
import routes from './routes';

import '~/database/connect';

class App {
  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
    this.exceptionHandler();

    this.server.listen(process.env.PORT);
  }

  middlewares() {
    this.server.use(cors());
    this.server.use(express.json());
  }

  routes() {
    this.server.use(routes);
  }

  exceptionHandler() {
    this.server.use(async (err, req, res, next) => {
      if (process.env.NODE_ENV === 'development') {
        console.error(err);

        return res.status(500).json({ error: err });
      }

      return res.status(500).json({ error: 'Internal server error' });
    });
  }
}

export default new App().server;
