const {Topics, Articles} = require('../models/index');

function getTopics (req, res, next) {
    Topics.find()
    .then(topics => {
        res.send({topics})
    })
}

function getArticlesbyTopics (req, res, next) {
    let topic_id = req.params.topic_id;
    Articles.find({belongs_to: `${topic_id}`})
    .then(articles => {
        res.send({articles})
    })
}

module.exports = {getTopics, getArticlesbyTopics}