const {Users} = require('../models/index');

function getUserByUsername (req, res, next) {
    const {username} = req.params
    return Users.findOne({username: username})
    .then(user => {
        if(!user){
            if (err.name === 'CastError'){
                return next({status : 400, message: `Could not retrieve user for ${username}. Please try another username.`, error: err})
            } else {
                return next(err)
            }
        } else {
            return res.send({user})
        }
    })
    .catch(err => {
        if (err.name === 'CastError'){
            return next({status : 400, message: `Could not retrieve user for ${username}. Please try another username.`, error: err})
        } else {
            return next(err)
        }
    })
}

module.exports = {getUserByUsername}