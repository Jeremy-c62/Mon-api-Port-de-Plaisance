require('dotenv').config();
const express = require('express');
const app = express();
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const helmet = require('helmet');


app.use(cors({
    origin: "http://localhost:3000"
}));


app.use(express.json());


require('./connect');


app.use(helmet());


const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 20, // Limiter à 20 requêtes par IP
});
app.use(limiter);

const userRoute = require('./router/user');
app.use('/api', userRoute);


app.get('/', (req, res) => {
    res.send('Bienvenue sur l\'API');
});

module.exports = app;
