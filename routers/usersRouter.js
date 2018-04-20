const usersRouter = require('express').Router();
const {
    getUserByUsername,
    getAllUsers
} = require('../controllers/usersController')

usersRouter.get('/:username', getUserByUsername);
usersRouter.get('/', getAllUsers);


module.exports = usersRouter; 