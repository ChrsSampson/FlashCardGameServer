const express = require('express');

const app = express();

app.use(express.json());

app.use('/test', (req, res) => {
    res.send('up')
});


// app.use('/auth', require('./routes/auth'));

app.use('/users', require('./routes/userRouter'));


// error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({error: err.message});
});

module.exports = app;