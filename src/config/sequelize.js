// eslint-disable-line

const dotenv = require('dotenv');

dotenv.config();

const environment = process.env;

const port = environment.DB_PORT || 5432;
const database = environment.DB_NAME || 'sms-manager';
const user = environment.DB_USER || 'postgres';
const password = environment.DB_PASS || '';
const host = environment.DB_HOST || 'localhost';
const databaseUrl = environment.DATABASE_URL;

const url =
  databaseUrl || `postgres://${user}:${password}@${host}:${port}/${database}`;

module.exports = {
  development: {
    url,
    dialect: 'postgres',
  },
  production: {
    url,
    dialect: 'postgres',
  },
  test: {
    url: `${url}_test`,
    dialect: 'postgres',
  },
};
