// establish database connection
const { Client } = require('pg');


const client = new Client(process.env.DB_URI);

client.connect((err) => {
    if (err) {
        console.log(err);
        throw err;
    } else {
        console.log('Database connected');
    }
});

module.exports = client;