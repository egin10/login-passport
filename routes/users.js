const express = require('express'),
router = express.Router();

//Login
router.get('/login', (req, res)=>{
    res.render('login');
});

//Regiter
router.get('/register', (req, res)=>{
    res.render('register');
});

//Regiter Post
router.post('/register', (req, res)=>{
    let newUser = {
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        password2: req.body.password2
    };

    // console.log(JSON.stringify(newUser));

    //validation
    req.checkBody('name', 'Name is required').notEmpty();

    let errors = req.validationErrors();

    if(errors){
        console.log('YES');
    }else{
        console.log('NO');
    }
});

module.exports = router;