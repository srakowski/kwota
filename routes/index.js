var express = require('express');
var passport = require('passport');

var router = express.Router();

router.get('/', function(req, res, next) {
    if (req.isAuthenticated()) {                                
        res.render('quotas');
    } else {
        res.render('index');
    }
});

router.get('/new', function (req, res, next) {
    if (!req.isAuthenticated()) {
        return res.redirect('/sign/in');
    }    
    
    res.render('newQuota');
});

module.exports = router;
