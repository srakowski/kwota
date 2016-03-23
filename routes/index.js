var express = require('express');
var passport = require('passport');
var router = express.Router();

router.get('/', function(req, res, next) {
    if (req.isAuthenticated()) {
        res.render('app');
    } else {
        res.render('index');
    }
});

router.get('/views/:name', function (req, res, next) {
    res.render(req.params.name);    
});

module.exports = router;
