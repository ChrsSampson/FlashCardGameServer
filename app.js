const express = require('express');

const app = express();


if(process.env.NODE_ENV === 'test') {
    app.get('/test', (req, res) => {
        res.send('up')
    });
}


app.use('/auth', require('./routes/auth'));

module.exports = app;