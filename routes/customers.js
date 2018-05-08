var express = require('express');
var router = express.Router();

var Customer = require('../models/customer');

router.get('/', function (req, res, next) {
    Customer.find()
        .exec(function (err, customers) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Success',
                obj: customers
            });
        });
});
router.get('/:email', function (req, res, next) {
    Customer.find( { 'email':req.params.email } )
        .exec(function (err, customer) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            } else{
            return res.status(200).json({
                message: 'Success',
                obj: customer
            });
          }
        });
});
router.post('/', function (req, res, next) {
    var customer = new Customer({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      services: req.body.services,
      carPlates: req.body.carPlates
    });
    customer.save(function (err, result) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        res.status(201).json({
            message: 'Customer Saved',
            obj: result
        });
    });
});

router.patch('/:id', function (req, res, next) {
    Customer.findById(req.params.id, function (err, customer) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if (!customer) {
            return res.status(500).json({
                title: 'No Customer Found!',
                error: {message: 'Customer not found'}
            });
        }
        customer.services = req.body.services,
        customer.carPlates = req.body.carPlates
        customer.save(function(err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Customer Updated',
                obj: result
            });
        });
    });
});

router.delete('/:id', function(req, res, next) {
    Customer.findById(req.params.id, function (err, customer) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if (!customer) {
            return res.status(500).json({
                title: 'No Message Found!',
                error: {message: 'Message not found'}
            });
        }
        customer.remove(function(err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Customer Deleted',
                obj: result
            });
        });
    });
});

module.exports = router;
