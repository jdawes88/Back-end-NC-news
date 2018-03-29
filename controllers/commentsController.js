const {Articles, Comments, Users} = require('../models/index');
const {sample} = require('lodash')

function commentVote (req, res, next) {
    let {comment_id} = req.params;
    let {vote} = req.query;
    let voteInc = vote === 'up' ? 1 : -1
    Comments.findByIdAndUpdate(
        comment_id, 
        {$inc : {votes : voteInc}}, 
        {new: true})
    .then(comment => {
        return res.send({comment})
    })
    .catch(err => {
        return next({status: 400, message: `Could not update votes for ${comment_id}. Please try another comment id`, error: err})
    })
}

function deleteComment (req, res, next) {
    let {comment_id} = req.params
    Comments.findByIdAndRemove(comment_id)
    .then(deletedComment => {
        return Comments.find()
    })
    .then(newComments => {
        return res.send({newComments})
    })
    .catch(err => {
        return next({status: 400, message: `Could not delete comment ${comment_id}. Please try another comment id`, error: err})
    })
}

module.exports = {commentVote, deleteComment}