const User = require('../database/models/User');

module.exports = (req, res, next) => {

    User.findById(req.session.userid, (error, user) => {
        if (error || !user) {
            return res.redirect('/');
        }
        next();
    })
}