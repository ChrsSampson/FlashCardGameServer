const express = require('express');
const Response = require('./lib/Response');
const app = express();

app.use(express.json());

app.use('/api/test', (req, res) => {
    const response = new Response(200, 'Server is running', null);
    response.send(res);
});

// USER ROUTES
app.use('/api/users', require('./routes/userRouter'));


// error handler
app.use((err, req, res, next) => {
    // check for an error and only respond if there is one
    if(err){
        const response = new Response(400, err.message, null);
        response.send(res);
    }
});

// 404 handler
app.use((req, res, next) => {
    const response = new Response(404, 'Not found', null);
    response.send(res);
});

module.exports = app;