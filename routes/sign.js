var express = require('express');
var passport = require('passport');
var router = express.Router();
var User = require("../models/user");
var validator = require('validator');

router.get("/up", function (req, res, next) {
    res.render('sign/up');        
});

router.post("/up", function (req, res, next) {
    var email = validator.trim(req.body.email);    
    if (!validator.isEmail(email)) {
        res.render('sign/up', { error: "Invalid email address"});
        return;
    }
                           
    User.register(new User({ email: req.body.email }), req.body.password, function (err) {
        if (err) {
            res.render('sign/up', { error: err.message});
            return;
        }        
        passport.authenticate('local')(req, res, function () {
          res.redirect('/');
        });        
    });
});

router.get("/in", function (req, res, next) {
    res.render("sign/in", {});
});

router.post("/in", passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/sign/in' 
}));

router.get("/out",
    function (req, res) {    
        req.logout();
        res.redirect('/');
    }
);

module.exports = router;
