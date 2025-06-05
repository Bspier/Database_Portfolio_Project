const mysql = require('mysql');
const url = require('url');

let config;

if (process.env.DATABASE_URL) {
  const dbUrl = url.parse(process.env.DATABASE_URL);
  const [user, password] = dbUrl.auth.split(':');

  config = {
    connectionLimit: 10,
    host: dbUrl.hostname,
    user,
    password,
    database: dbUrl.pathname.replace('/', ''), // remove leading slash
    port: dbUrl.port || 3306
  };
} else {
  // fallback for local development
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