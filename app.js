if(!process.env.NODE_ENV)process.env.NODE_ENV = 'dev';
const {DB_URL} = require('./config/index');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
mongoose.Promise = Promise;
const apiRouter = require('./routers/apiRouter')
const bodyParser = require('body-parser');

app.use(bodyParser.json());

mongoose.connect(DB_URL)
    .then(() => {
        console.log(`connected to DB ${DB_URL}`);
    })

app.use('/api', apiRouter)

module.exports = app
