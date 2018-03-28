const usersRouter = require('express').Router();
const {
    getUserById
} = require('../controllers/usersController')

usersRouter.get('/:user_id', getUserById);


module.exports = usersRouter; 