var express = require('express');
var passport = require('passport');
var ObjectId = require('mongoose').Schema.Types.ObjectId;
var Quota = require('../models/quota');
var router = express.Router();

// GET /api/quota
router.get("/", function (req, res) {
    
    Quota.find({ _owner: req.user._id }, 
        function (err, quotas) {
            if (err) {
                res.send(err);
            } else {
                res.json(quotas);
            }            
        });
                              
});

// POST /api/quota
router.post("/", function (req, res) {
    
    var quota = new Quota({
        _owner: req.user._id,
        _system: req.body.systemId,
        action: req.body.action,
        instances: req.body.quantity,
        periodMultiplier: req.body.periodMultiplier,
        timeFrame: req.body.timeFrame   
    });
            
    quota.save(function (err, newQuota) {
        if (err) {
            res.send(err);
        } else {
            res.json({ message: "success"});
        }              
    });
        
});

module.exports = router;
