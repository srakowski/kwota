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
        action: req.body.action,
        instances: Number(req.body.instances)   
    });
            
    quota.save(function (err, newQuota) {
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            res.json({ message: "success"});
        }              
    });
        
});

// POST /api/quota/fill
router.post("/fill", function (req, res) {    
    Quota.findOne({ _id: req.body.id, _owner: req.user._id }, function (err, quota) {
        quota.fills.push({
            note: req.body.note            
        });                
        quota.save(function (err, quota) {
            res.json({ message: "success" });            
        });
    });        
});

// POST /api/quota/reset
router.post("/reset", function (req, res) {    
    Quota.update({ _id: req.body.id, _owner: req.user._id }, { $set: { fills: [] }}, function (err) {
        res.json({ message: "success" });
    });        
});

module.exports = router;
