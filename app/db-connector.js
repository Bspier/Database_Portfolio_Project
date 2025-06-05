const mysql = require('mysql');

const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'your_local_user',
  password: process.env.DB_PASSWORD || 'your_local_password',
  database: process.env.DB_NAME || 'your_local_db_name',
});

module.exports.pool = pool;