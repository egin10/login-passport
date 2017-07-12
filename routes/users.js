const express = require('express'),
    router = express.Router(),
    User = require('./../models/user');

//Login
router.get('/login', (req, res) => {
    res.render('login');
});

//Regiter
router.get('/register', (req, res) => {
    res.render('register');
});

//Regiter Post
router.post('/register', (req, res) => {
    let name = req.body.name,
        email = req.body.email,
        username = req.body.username,
        password = req.body.password,
        password2 = req.body.password2;

    // console.log(JSON.stringify(newUser));

    //validation
    req.checkBody('name', 'Name is required').notEmpty();
    req.checkBody('email', 'Email is required').notEmpty();
    req.checkBody('email', 'Email is not valid').isEmail();
    req.checkBody('username', 'Username is required').notEmpty();
    req.checkBody('password', 'Password is required').notEmpty();
    req.checkBody('password2', 'Password do not match').equals(req.body.password);

    let errors = req.validationErrors();

    if (errors) {
        res.render('register', {
            errors: errors
        });
    } else {
        let newUser = new User({
            name: name,
            email: email,
            username: username,
            password: password
        });

        User.createUser(newUser, (err, user) => {
            if (err) throw err;
            console.log(user);
        });

        req.flash('success_msg', 'You are registered and can now login');
        res.redirect('/users/login');
    }
});

module.exports = router;