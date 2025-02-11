require('dotenv').config();
const express = require('express');
const app = express();
const rateLimit = require('express-rate-limit')
const helmet = require('helmet')

app.use(express.json());

require('./connect');

app.use(helmet());

const limiter = rateLimit({
    windox: 15 * 60 * 1000,
    max: 20
});
app.use(limiter)

const userRoute = require('./router/user');

app.use('/api', userRoute)

module.exports = app;

