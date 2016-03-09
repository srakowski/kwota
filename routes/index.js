var express = require('express');
var passport = require('passport');
var router = express.Router();
var User = require("../models/user");
var System = require('../models/system');
var Quota = require('../models/quota');

router.get('/', function(req, res, next) {
    if (req.isAuthenticated()) {
        System.find({ _owner: req.user._id }, function (err, systems) {
            Quota.find({ _owner: req.user._id }, function (err, quotas) {
                res.render('home', { systems: systems, quotas: quotas });
            });          
        });
    } else {
        res.render('index', {});
    }
});

router.get("/signup", function (req, res, next) {
    res.render('signup', {});        
});

router.post("/signup", function (req, res, next) {
    console.log("signing up user");
    User.register(new User({ email: req.body.email }), req.body.password, function (err) {
        if (err) {
            console.log('error while user register!', err);
            return next(err);
        }      
        passport.authenticate('local')(req, res, function () {
          res.redirect('/');
        });        
    });
});

router.get("/signin", function (req, res, next) {
    res.render("signin", {});
});

router.post("/signin", passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/signin' 
}));

router.get("/signout",
    function (req, res) {    
        req.logout();
        res.redirect('/');
    }
);

module.exports = router;
