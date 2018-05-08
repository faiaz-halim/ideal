var express = require('express');
var router = express.Router();

var Car = require('../models/car');

router.get('/', function (req, res, next) {
    Car.find()
        .exec(function (err, cars) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Success',
                obj: cars
            });
        });
});
router.post('/', function (req, res, next) {
    var car = new Car({
        name: req.body.name,
        models: req.body.models,
    });
    console.log("from server", car);
    car.save(function (err, result) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        res.status(201).json({
            message: 'Saved message',
            obj: result
        });
    });
});
module.exports = router;
