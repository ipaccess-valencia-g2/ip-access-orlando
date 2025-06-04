const mysql = require('mysql2');
require('dotenv').config();

// Create a promise-based pool
const pool = mysql
  .createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  })
  .promise();

// Optional: simple connection test
pool.getConnection()
  .then(conn => {
    console.log('Connected to AWS RDS');
    conn.release(); // release the connection back to the pool
  })
  .catch(err => {
    console.error('Connection failed:', err.message);
  });

module.exports = pool;
