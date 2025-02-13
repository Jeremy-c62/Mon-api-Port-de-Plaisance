
const mongoose = require('mongoose');
const USER = process.env.USER_DB
const PASSWORD = process.env.PASSWORD_DB
const NAME = process.env.NAME_DB

const uri = `mongodb+srv://${USER}:${PASSWORD}@${NAME}.pikrp.mongodb.net/?retryWrites=true&w=majority`;

mongoose.connect(uri)
    .then(() => console.log('connected to MongoDB'))
    .catch(err => {
        console.error('Failed to connect to MongoDB:', err);
    });