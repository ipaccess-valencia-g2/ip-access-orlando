// connection.js

const mysql = require('mysql2');
require('dotenv').config();

// Log database config
console.log('Initializing database connection with the following settings:');
console.log({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER,
  database: process.env.DB_NAME
});

// Create a promise-based connection pool
const pool = mysql
  .createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    connectTimeout: 10000
  })
  .promise();

// Optional: test the database connection at startup
pool.getConnection()
  .then(conn => {
    console.log('Database connection successful');
    conn.release();
  })
  .catch(err => {
    console.error('Database connection failed:', err.message);
  });

module.exports = pool;
