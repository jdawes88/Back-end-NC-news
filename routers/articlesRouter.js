const articlesRouter = require('express').Router();
const {
    getArticles,
    getCommentsByArticleId,
    addCommentToArticle,
    articleVote
} = require('../controllers/articlesController')

articlesRouter.get('/', getArticles);
articlesRouter.get('/:article_id/comments', getCommentsByArticleId);
articlesRouter.post('/:article_id/comments', addCommentToArticle);
articlesRouter.put('/:article_id', articleVote);

module.exports = articlesRouter;