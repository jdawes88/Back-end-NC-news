const {Topics, Articles} = require('../models/index');

function getTopics (req, res, next) {
    Topics.find()
    .then(topics => {
        res.send({topics})
    })
    .catch(next)
}

function getArticlesbyTopics (req, res, next) {
    let topic_id = req.params.topic_id;
    Articles.find({belongs_to: `${topic_id}`})
    .then(articles => {
        return res.send({articles})
    })
    .catch(err => {
        return next({status: 400, message: `Could not get articles from ${topic_id}. Please try another topic id`, error: err})
    })
}

module.exports = {getTopics, getArticlesbyTopics}