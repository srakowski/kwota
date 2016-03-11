var express = require('express');
var passport = require('passport');
var ObjectId = require('mongoose').Schema.Types.ObjectId;
var Quota = require('../models/quota');
var System = require('../models/system');
var router = express.Router();

router.get("/create",
    function (req, res) {
        System.find({ _owner: req.user._id }, function (err, systems) {
            Quota.find({ _owner: req.user._id }, function (err, quotas) {
                res.render('quotas/create', { systems: systems });
            });          
        });           
    }
);

router.post("/create",
    function (req, res, next) {
        console.log(req.user._id);
        console.log(req.body.systemId);
        console.log(req.body.action);
        console.log(req.body.quantity);
        console.log(req.body.periodMultiplier);
        console.log(req.body.timeFrame);
        (new Quota({
            _owner: req.user._id,
            _system: req.body.systemId,
            action: req.body.action,
            instances: req.body.quantity,
            periodMultiplier: req.body.periodMultiplier,
            timeFrame: req.body.timeFrame   
        })).save(function (err, newQuota) {
            if (err) {
                return next(err);
            }            
            res.redirect('/');                   
        });
    }
);

module.exports = router;
