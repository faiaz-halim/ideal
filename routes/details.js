var express = require('express');
var router = express.Router();

var Detail = require('../models/detail');

router.get('/', function (req, res, next) {
    Detail.find()
        .exec(function (err, carDetails) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Success',
                obj: carDetails
            });
        });
});
router.get('/:plate', function (req, res, next) {
    Detail.find( { 'plate':req.params.plate } )
        .exec(function (err, carDetail) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Success',
                obj: carDetail
            });
        });
});
router.post('/', function (req, res, next) {

    var detail = new Detail({
      plate: req.body.plate,
      make: req.body.make,
      model: req.body.model,
      year: req.body.year,
      vin: req.body.vin,
      type:req.body.type,
      transmission:req.body.transmission,
      engine: req.body.engine,
      cylinders: req.body.cylinders,
      fuel: req.body.fuel,
    });
    detail.save(function (err, result) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred ',
                error: err
            });
        }
        res.status(201).json({
            message: 'Car Detail Saved',
            obj: result
        });
    });
});

router.patch('/:id', function (req, res, next) {
    Detail.findById(req.params.id, function (err, detail) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if (!detail) {
            return res.status(500).json({
                title: 'No Booking Found!',
                error: {message: 'Car Detail not found'}
            });
        }
        detail.plate = req.body.plate,
        detail.make = req.body.make,
        detail.model = req.body.model,
        detail.year = req.body.year,
        detail.vin = req.body.vin,
        detail.type =req.body.type,
        detail.transmission =req.body.transmission,
        detail.engine = req.body.engine,
        detail.cylinder = req.body.cylinder,
        detail.fuel = req.body.fuel,

        detail.save(function(err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Car Detail Updated',
                obj: result
            });
        });
    });
});

router.delete('/:id', function(req, res, next) {
    Detail.findById(req.params.id, function (err, detail) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if (!detail) {
            return res.status(500).json({
                title: 'No Car Detail Found!',
                error: {message: 'Booking not found'}
            });
        }
        detail.remove(function(err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Car Detail Deleted',
                obj: result
            });
        });
    });
});

module.exports = router;
