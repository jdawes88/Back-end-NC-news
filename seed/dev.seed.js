const {DB_URL} = require('../config/index');
const mongoose = require('mongoose');
mongoose.Promise = Promise;
const {seedDB} = require('./seed');
const {articlesData, topicsData, usersData} = require('../seed/devData/index'); 


mongoose.connect(DB_URL)
.then(() =>{
    return seedDB(DB_URL, topicsData, usersData, articlesData)
})
.then(() => {
    return mongoose.disconnect();
})
