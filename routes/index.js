const express = require('express'),
    router = express.Router();

//Check If user has Login
function ensureAuthenticated(req, res, next) {
    if(req.isAuthenticated()){
        return next();
    } else {
        // req.flash('error_msg', 'You are not logged in');
        res.redirect('/users/login');
    }
}

//Get home page
router.get('/', ensureAuthenticated, (req, res) => {
    res.render('index');
});

module.exports = router;