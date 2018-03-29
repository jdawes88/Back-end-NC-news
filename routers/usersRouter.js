const usersRouter = require('express').Router();
const {
    getUserByUsername
} = require('../controllers/usersController')

usersRouter.get('/:username', getUserByUsername);


module.exports = usersRouter; 