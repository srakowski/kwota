var express = require('express');
var passport = require('passport');
var ObjectId = require('mongoose').Schema.Types.ObjectId;
var System = require('../models/system');
var router = express.Router();

router.get("/", 
    function (req, res) {
        System.find({ _owner: req.user._id }, function (err, docs) {
            res.render('systems/index', { systems: docs });          
        });              
    }
);

router.get("/create",
    function (req, res) {
        res.render('systems/create');        
    }
);

router.post("/create",
    function (req, res, next) {
        (new System({
            _owner: req.user._id,
            name: req.body.name,
            purpose: req.body.purpose            
        })).save(function (err, newSystem) {
            if (err) {
                return next(err);
            }
            
            res.redirect('/systems');                        
        });
    }
);

router.get("/:id", function (req, res, next) {
    System.findOne({ _id: req.params.id }, function (err, system) {
        if (err) {
            return next(err);
        }        
        res.render("systems/system", system);        
    });        
});

module.exports = router;
