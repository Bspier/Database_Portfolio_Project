const mysql = require('mysql2');
const url = require('url');

let config;

if (process.env.MYSQL_URL) {
  console.log("MYSQL_URL:", process.env.MYSQL_URL); // Optional debug line

  const dbUrl = new URL(process.env.MYSQL_URL); // modern, not deprecated

  config = {
    connectionLimit: 10,
    host: dbUrl.hostname,
    user: dbUrl.username,
    password: dbUrl.password,
    database: dbUrl.pathname.replace('/', ''), // 'railway'
    port: dbUrl.port || 3306
  };
} else {
  // fallback for local development
  config = {
    connectionLimit: 10,
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'railway',
  };
}

const pool = mysql.createPool(config);
module.exports.pool = pool;