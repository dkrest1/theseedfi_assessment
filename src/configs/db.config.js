const { Pool } = require("pg");

// create a new PostgreSQL connection pool using the connection string
const pool = new Pool({
    connectionString: process.env.DB_URL
});

module.exports = pool;
