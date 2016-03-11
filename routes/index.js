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

module.exports = router;
