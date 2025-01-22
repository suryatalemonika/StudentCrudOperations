const { Pool } = require('pg');

const pool = new Pool({
  user: 'monika',       // Replace with your PostgreSQL username
  host: 'localhost',       // Replace with your host (e.g., localhost)
  database: 'firstdatabase', // Replace with your database name
  password: 'monika@24', // Replace with your PostgreSQL password
  port: 5432,               // Default PostgreSQL port
});

module.exports = pool;
