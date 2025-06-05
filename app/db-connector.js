const mysql = require('mysql');

let config;

if (process.env.DB_URL) {
  const dbUrl = new URL(process.env.DB_URL);

  config = {
    connectionLimit: 10,
    host: dbUrl.hostname,
    user: dbUrl.username,
    password: dbUrl.password,
    database: dbUrl.pathname.substring(1), // remove leading '/'
    port: dbUrl.port || 3306
  };
} else {
  // Local fallback
  config = {
    connectionLimit: 10,
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'your_local_user',
    password: process.env.DB_PASSWORD || 'your_local_password',
    database: process.env.DB_NAME || 'your_local_db_name',
  };
}

const pool = mysql.createPool(config);
module.exports.pool = pool;