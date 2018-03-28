if(!process.env.NODE_ENV) process.env.NODE_ENV = 'dev'
const mongoose = require('mongoose');
mongoose.Promise = Promise;
const path = process.env.NODE_ENV;
const {Users, Articles, Comments, Topics} = require('../models/index');
const {articlesData, topicsData, usersData} = require(`./${path}Data`);
const {DB_URL} = require('../config/index');
const faker = require('faker');
const {sample} = require('lodash');

function seedArticles(articles, topicIds, userDoc){
    return articles.map(article => {
        let {title, body, belongs_to, votes, created_by} = article;
        belongs_to = topicIds[article.topic];
        created_by = userDoc[Math.floor(Math.random()*userDoc.length)]._id;
        return {title, body, belongs_to, votes, created_by}
    })
}

function generateId (data, docs) {
    return data.reduce((acc, item, i) => {
        acc[item.slug] = docs[i]._id;
        return acc;
    }, {})
}

function seedComments (articles, users) {
    let n = 0;
    if(process.env.NODE_ENV === 'test')n = 25 
    else n = 500;
    
    return Array.from(new Array(n), (x, i) => {i}).map(i => {
        return {
            body: faker.lorem.sentences(),
            belongs_to: sample(articles)._id,
            created_at: new Date().getTime(),
            votes: faker.random.number(),
            created_by: sample(users)._id
        }
    })
}


function seedDB() {
    return mongoose.connection.dropDatabase()
    .then(() => {
        console.log(`🖐🎤 Dropped database ${DB_URL}`)
        return Promise.all([Topics.insertMany(topicsData), Users.insertMany(usersData)]) 
    })
    .then(([topicsDoc, usersDoc]) => {
        const topicId = generateId(topicsData, topicsDoc);
        const newArticles = seedArticles(articlesData, topicId, usersDoc)
        ;
        return Promise.all([topicsDoc, usersDoc, Articles.insertMany(newArticles)]);
    })
    .then(([topicsDoc, usersDoc, articlesDoc]) => {
        const comments = seedComments(articlesDoc, usersDoc);
        return Promise.all([topicsDoc, usersDoc, articlesDoc, Comments.insertMany(comments)]);
    })
}


module.exports = {seedDB}
