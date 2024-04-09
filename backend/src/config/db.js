// config/db.js

const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.POSTGRES_CONNECTION_STRING,
  ssl: {
    rejectUnauthorized: false // Ignore self-signed certificates
  }
});

module.exports = pool;
