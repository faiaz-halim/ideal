var express = require('express');
var router = express.Router();

var Booking = require('../models/booking');

router.get('/', function (req, res, next) {
    Booking.find()
        .exec(function (err, bookings) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Success',
                obj: bookings
            });
        });
});
router.get('/:id', function (req, res, next) {
    Booking.findById(req.params.id)
        .exec(function (err, booking) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Success',
                obj: booking
            });
        });
});
router.get('/:owner/:status', function (req, res, next) {
    Booking.find({owner: req.params.owner, status: req.params.status})
        .exec(function (err, bookings) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Success',
                obj: bookings
            });
        });
});
router.post('/', function (req, res, next) {
    var booking = new Booking({
      bookingDate: req.body.bookingDate,
      time: req.body.time,
      owner: req.body.owner,
      vehicle: req.body.vehicle,
      type: req.body.type,
      description:req.body.description,
      status:req.body.status
    });
    booking.save(function (err, result) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        res.status(201).json({
            message: 'Booking Saved',
            obj: result
        });
    });
});

router.patch('/:id', function (req, res, next) {
    Booking.findById(req.params.id, function (err, booking) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if (!booking) {
            return res.status(500).json({
                title: 'No Booking Found!',
                error: {message: 'Booking not found'}
            });
        }
        booking.bookingDate = req.body.bookingDate,
        booking.time = req.body.time,
        booking.owner = req.body.owner,
        booking.vehicle = req.body.vehicle,
        booking.type = req.body.type,
        booking.description = req.body.description,
        booking.status = req.body.status

        booking.save(function(err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Booking Updated',
                obj: result
            });
        });
    });
});

router.delete('/:id', function(req, res, next) {
    Booking.findById(req.params.id, function (err, booking) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if (!booking) {
            return res.status(500).json({
                title: 'No Booking Found!',
                error: {message: 'Booking not found'}
            });
        }
        booking.remove(function(err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Booking Deleted',
                obj: result
            });
        });
    });
});

module.exports = router;
