import 'dotenv/config';

import express from 'express';
import axios from 'axios';
import routes from './routes';

import './database';

class App {
  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(express.json());
    setInterval(async () => {
      if (new Date().getMinutes() === 30) {
        await axios.post(`${process.env.BASE_URL}/city-infos`);
        console.log('...');
      }
    }, 59999);
  }

  routes() {
    this.server.use(routes);
  }
}

export default new App().server;
