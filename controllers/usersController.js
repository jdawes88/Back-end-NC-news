const {Users} = require('../models/index');

function getUserById (req, res, next) {
    const {user_id} = req.params
    Users.findById(user_id)
    .then(user => {
        res.send({user})
    })
}

module.exports = {getUserById}