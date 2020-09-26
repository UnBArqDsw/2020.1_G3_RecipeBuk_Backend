require('dotenv').config();
const { Pool, Client } = require('pg');
const connectionString = process.env.DB_URL;

const pool = new Pool({
  connectionString: connectionString,
})

module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback)
  },
}
