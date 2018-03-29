const {Users} = require('../models/index');

function getUserByUsername (req, res, next) {
    const {username} = req.params
    Users.findOne({username: username})
    .then(user => {
        if(!user){
            return next({status: 400, message: `Could not find user ${username}. Please try another username`, error: err})
        } else {
            return res.send({user})
        }
    })
    .catch(err => {
        return next({status: 400, message: `Could not find user ${username}. Please try another username`, error: err})
    })
}

module.exports = {getUserByUsername}