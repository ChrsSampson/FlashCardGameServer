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
    .catch(err => {
        console.log(err)
        throw new Error('Database fault');
        process.exit(1);
    });

module.exports = client;