require('dotenv').config();
const { Pool, Client } = require('pg');
const connectionString = process.env.DB_URL;

const dbConnect = async () => {
    
    const pool = new Pool({
        connectionString: connectionString,
    })
    pool.connect();
    const client = new Client({
        connectionString: connectionString,
    })
    client.connect()
}

module.exports = dbConnect;