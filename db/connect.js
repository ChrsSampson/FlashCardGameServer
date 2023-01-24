// establish database connection
const { Client } = require('pg');

const config = {
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT
}


const client = new Client();

client.connect()
    .then(() => console.log('connected to database'))
    .catch(err => console.error('connection error', err.stack));

module.exports = client;