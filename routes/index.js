var express = require('express');
var passport = require('passport');
var router = express.Router();
var User = require("../models/user");

router.get('/', function(req, res, next) {
    if (req.user) {
        res.render('dashboard', {});
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
        console.log('user sign up successful!');
        res.redirect('/');        
    });
});

router.get("/signin", function (req, res, next) {
    res.render("signin", {});
});

router.post("/signin", passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/signin' 
}));

router.get("/signout", function (req, res) {
    req.logout();
    res.redirect('/');
});

module.exports = router;
