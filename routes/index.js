const express = require('express'),
router = express.Router();

//Get home page
router.get('/', (req, res)=>{
    res.render('index');
});

module.exports = router;