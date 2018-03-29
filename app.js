if(!process.env.NODE_ENV) process.env.NODE_ENV = 'dev';
const DB_URL = process.env.DB_URL || require('./config/index').DB_URL;
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

app.use('/*', (req, res, next) => {
    return res.status(404).send('Error: Page not found!')
});

app.use((err, req, res, next) => {
    if (err.status === 400){
        return res.status(400).send(err.message)
    }
    else next(err)
})

app.use((err, req, res, next) => {
    res.status(500).send({message: 'Internal server error!'});
})

module.exports = app
