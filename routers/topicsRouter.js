const topicsRouter = require('express').Router();
const {
    getTopics,
    getArticlesbyTopics
} = require('../controllers/topicsController')

topicsRouter.get('/', getTopics);
topicsRouter.get('/:topic_id/articles', getArticlesbyTopics)

module.exports = topicsRouter;