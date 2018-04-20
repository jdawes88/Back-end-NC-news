const {Topics, Articles} = require('../models/index');

function getCommentsCount (comments) {
    return comments.reduce((acc, comment) => {
        acc[comment.belongs_to] = (acc[comment.belongs_to]) ? acc[comment.belongs_to] +1 : 1
        return acc 
    }, {})
}

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
    .populate('created_by', 'name').lean()
    .then(articles => {
        return Promise.all([articles, Comments.find()])
    })
    .then(([articles, comments]) => {
        return Promise.all([articles, getCommentsCount(comments)])
    })
    .then(([articles, commentsCount]) => {
        return articles.map(article => {
            article.comments = commentsCount[article._id] || 0;
            return article
        })
        return articles.save()
    })
    .then(articles => {
        return res.send({articles})
    })
    .catch(next)
}

module.exports = {getTopics, getArticlesbyTopics}