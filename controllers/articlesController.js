const {Articles, Comments, Users} = require('../models/index');
const {sample} = require('lodash')

function getArticles (req, res, next) {
    Articles.find()
    .then(articles => {
        res.send({articles})
    })
}

function getCommentsByArticleId (req, res, next) {
    let {article_id} = req.params
    Comments.find({belongs_to: `${article_id}`})
    .then(comments => {
        res.send({comments});
    })
}

function addCommentToArticle (req, res, next) {
    let {article_id} = req.params
    const newComment = new Comments({
        body: req.body.body,
        belongs_to: article_id,
        created_by: req.body.created_by
    })
    return newComment.save()
    .then(comment => {
        res.status(201).send({comment})
    })
    .catch(err => {
        console.log(err)
    }) 
}

function articleVote (req, res, next) {
    let {article_id} = req.params;
    let {vote} = req.query;
    let voteInc = vote === 'up' ? 1 : -1
    Articles.findByIdAndUpdate(
        article_id, 
        {$inc : {votes : voteInc}}, 
        {new: true})
    .then(article => {
        res.send({article})
    })
}

module.exports = {
    getArticles, 
    getCommentsByArticleId, 
    addCommentToArticle,
    articleVote
}