const commentsRouter = require('express').Router();
const {
    commentVote,
    deleteComment
} = require('../controllers/commentsController')

commentsRouter.put('/:comment_id', commentVote)
commentsRouter.delete('/:comment_id', deleteComment)

module.exports = commentsRouter