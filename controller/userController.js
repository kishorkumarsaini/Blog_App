const User = require('../database/models/User');
const bcrypt = require('bcrypt');

//user creation page

exports.CreateNewUser = (req, res) => {
    res.render('register');
}

exports.StoreNewUser = (req, res) => {

    User.create(req.body, (error, user) => {
        if (error) return res.redirect('register');

        res.redirect('/');
    })
}


//login user

exports.login = (req, res) => {
    res.render('login');
}


exports.loginUser = (req, res) => {

    const { email, password } = req.body;
    console.log(email, password);

    User.findOne({ email }, (error, user) => {
        if (user) {
            //compare password
            bcrypt.compare(password, user.password, (error, same) => {
                if (same) {
                    //store user session
                    req.session.userid = user._id;
                    res.redirect('/')
                } else {
                    res.redirect('/login');
                }
            })

        } else {
            res.redirect('/login');
        }
    })
}


exports.logout = (req, res) => {
    req.session.destroy(() => {
        res.redirect('/');
    })
}