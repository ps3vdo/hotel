require("dotenv").config();

const env = process.env;

const config = {
  PG_USER: env.DB_USER,
  PG_PASSWORD: env.DB_PASSWORD,
  PG_HOST: env.DB_HOST,
  PG_PORT: env.DB_PORT,
  PG_DB_NAME: env.DB_NAME,
  APP_PORT: env.PORT,
};

module.exports = Object.freeze(config);
