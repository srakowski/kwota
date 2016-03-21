var express = require('express');
var ObjectId = require('mongoose').Schema.Types.ObjectId;
var System = require('../models/system');
var router = express.Router();

// GET /api/system
router.get("/", function (req, res) {
    
    System.find({ _owner: req.user._id }, 
        function (err, systems) {
            if (err) {
                res.send(err);
            } else {
                res.json(systems);
            }            
        });
                              
});

// POST /api/system
router.post("/", function (req, res) {
    
    var system = new System({
        _owner: req.user._id,
        name: req.body.name   
    });
            
    system.save(function (err, newSystem) {
        if (err) {
            res.send(err);
        } else {
            res.json({ message: "success"});
        }              
    });
        
});

module.exports = router;
