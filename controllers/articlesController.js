const {Articles, Comments, Users} = require('../models/index');
const {sample} = require('lodash')

function getCommentsCount (comments) {
    return comments.reduce((acc, comment) => {
        acc[comment.belongs_to] = (acc[comment.belongs_to]) ? acc[comment.belongs_to] +1 : 1
        return acc 
    }, {})
}

function getArticles (req, res, next) {
    Articles.find()
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

function getArticleById (req, res, next) {
    const {article_id} = req.params;
    return Articles.findById(article_id)
    .populate('created_by', 'name')
    .then(user => {
        if(!user){
            if (err.name === 'CastError'){
                return next({status : 400, message: `Could not retrieve article for ${article_id}. Please try another username.`, error: err})
            } else {
                return next(err)
            }
        } else {
            return res.send({user})
        }
    })
    .catch(err => {
        if (err.name === 'CastError'){
            return next({status : 400, message: `Could not retrieve article for ${article_id}. Please try another username.`, error: err})
        } else {
            return next(err)
        }
    })
}

function getCommentsByArticleId (req, res, next) {
    let {article_id} = req.params
    Comments.find({belongs_to: `${article_id}`})
    .populate('created_by', 'name')
    .then(comments => {
        return res.send({comments});
    })
    .catch(err => {
        if (err.name === 'CastError'){
            return next({status : 400, message: `Could not retrieve comments for ${article_id}. Please try another article id.`, error: err})
        } else {
            return next(err)
        }
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
        return res.status(201).send({comment})
    })
    .catch(err => {
        if (err.name === 'CastError'){
            return next({status : 400, message: `Could not add comment for ${article_id}. Please try another article id.`, error: err})
        } else {
            return next(err)
        }
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
        return res.send({article})
    })
    .catch(err => {
        if (err.name === 'CastError'){
            return next({status : 400, message: `Could not retrieve comments for ${article_id}. Please try another article id.`, error: err})
        } else {
            return next(err)
        } 
    })
}

module.exports = {
    getArticles, 
    getCommentsByArticleId, 
    addCommentToArticle,
    articleVote,
    getArticleById
}