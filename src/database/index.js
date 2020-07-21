import 'dotenv/config';
import knex from 'knex';

const connection = knex({
  client: process.env.DB_CLIENT,
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
  },
  useNullAsDefault: true,
});

export default connection;
