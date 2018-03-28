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
        res.send({comment})
    })
}

function deleteComment (req, res, next) {
    let {comment_id} = req.params
    Comments.findByIdAndRemove(comment_id)
    .then(deletedComment => {
        Comments.find()
        .then(newComments => {
            res.send({newComments})
        })
        
    })
}

module.exports = {commentVote, deleteComment}