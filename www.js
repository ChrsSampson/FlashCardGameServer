const dotenv = require('dotenv');
const app = require('./app');

// env variables
dotenv.config({path: `${__dirname}/.env.${process.env.NODE_ENV}.local`});

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
})
