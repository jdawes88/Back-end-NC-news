const {Users} = require('../models/index');

function getAllUsers (req, res, next) {
    Users.find()
    .then(users => {
        if(!users){
            if (err.name === 'CastError'){
                return next({status : 400, message: `Could not retrieve users. Please try another route`, error: err})
            } else {
                return next(err)
            }
        } else {
            return res.send({users})
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

module.exports = {getUserByUsername, getAllUsers}