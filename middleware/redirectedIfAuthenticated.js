const User = require('../database/models/User');

module.exports = (req, res, next) => {

    if (req.session.userid) {
        return res.redirect('/');
    }
    next();
}