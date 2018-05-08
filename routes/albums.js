var express = require('express');
var router = express.Router();

var Album = require('../models/album');

router.get('/', function (req, res, next) {
    Album.find()
        .exec(function (err, albums) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Success',
                obj: albums
            });
        });
});

router.post('/', function (req, res, next) {
    var album = new Album({
        name: req.body.name,
        images: req.body.images,
        howMany: req.body.howMany,
        time: req.body.time
    });
    console.log("from server", req.body.name)
    album.save(function (err, result) {
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
