var express = require('express');
var passport = require('passport');
var router = express.Router();
var User = require("../models/user");
var validator = require('validator');

router.get("/up", function (req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect("/");
    }
        
    res.render('sign/up');        
});

router.post("/up", function (req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect("/");
    }
    
    var email = validator.trim(req.body.email);    
    if (!validator.isEmail(email)) {
        return res.render('sign/up', { error: "Invalid email address"});        
    }
                           
    User.register(new User({ email: req.body.email }), req.body.password, function (err) {
        if (err) {
            return res.render('sign/up', { error: err.message});            
        }        
                                
        passport.authenticate('local')(req, res, function () {                               
            res.redirect('/');
        });        
    });
});

router.get("/in", function (req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect("/");
    }
    
    res.render("sign/in");
});

router.post('/in', function(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect("/");
    }
    
    passport.authenticate('local', function(err, user, info) {
        if (err) {
            return res.render('sign/in', { error: err.message});
        }
        
        if (!user) { 
            return res.render('sign/in', { error: "Invalid email/password"}); 
        }
        
        req.logIn(user, function(err) {
            if (err) { return next(err); }
            return res.redirect('/');
        });
        
    })(req, res, next);
});

router.get("/out",
    function (req, res) {    
        req.logout();
        res.redirect('/');
    }
);

module.exports = router;
