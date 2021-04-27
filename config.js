require("dotenv").config();

const env = process.env;

const config = {
  PG_USER: env.PG_USER,
  PG_PASSWORD: env.PG_PASSWORD,
  PG_HOST: env.PG_HOST,
  PG_PORT: env.PG_PORT,
  PG_DB_NAME: env.PG_DB_NAME,
};

module.exports = Object.freeze(config);
