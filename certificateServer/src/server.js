import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import routes from './routes';
import '~/database/connect';

class App {
  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();

    this.server.listen(process.env.PORT);
  }

  middlewares() {
    this.server.use(cors());
    this.server.use(express.json());
  }

  routes() {
    this.server.use(routes);
  }
}

export default new App().server;
