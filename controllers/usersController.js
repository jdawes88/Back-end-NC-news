const {Users} = require('../models/index');

function getUserByUsername (req, res, next) {
    const {username} = req.params
    Users.findOne({username: username})
    .then(user => {
        if(!user){
            if (err.name === 'CastError'){
                return next({status : 400, message: `Could not retrieve comments for ${article_id}. Please try another article id.`, error: err})
            } else {
                return next(err)
            }
        } else {
            return res.send({user})
        }
    })
    .catch(err => {
        if (err.name === 'CastError'){
            return next({status : 400, message: `Could not retrieve comments for ${article_id}. Please try another article id.`, error: err})
        } else {
            return next(err)
        }
    })
}

module.exports = {getUserByUsername}