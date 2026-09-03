const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "spotify",
  password: process.env.db_password,
  port: 1111,
});

module.exports = pool;
