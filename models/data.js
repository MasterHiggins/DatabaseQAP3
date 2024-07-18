const { Pool } = require('pg');

//Database parameters
const pool = new Pool({
    user: 'admin',
    host: 'localhost',
    database: 'user_emails',
    password: 'admin',
    port: 5432,
});

module.exports = pool;
