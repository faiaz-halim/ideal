var express = require('express');
var router = express.Router();

var Message = require('../models/message');

router.post('/', function (req, res, next) {
    var message = new Message({
        name: req.body.name,
        email: req.body.email,
        subject: req.body.subject,
        body: req.body.body,
        status: req.body.status
    });
    console.log("from server", message);
    message.save(function (err, result) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        res.status(201).json({
            message: 'Message Saved',
            obj: result
        });
    });
});
module.exports = router;
