var express = require('express');
var router = express.Router();

var Review = require('../models/review');

router.get('/', function (req, res, next) {
    Review.find({'status': 'show'})
      .exec(function (err, reviews) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            //console.log(reviews);
            res.status(200).json({
                message: 'Success',
                obj: reviews
            });
        });
});
router.post('/', function (req, res, next) {
    var review = new Review({
        name: req.body.name,
        carMake: req.body.carMake,
        carModel: req.body.carModel,
        rating: req.body.rating,
        myReview: req.body.myReview,
        comment: req.body.comment,
        commentBy: req.body.commentBy,
        status: req.body.status
    });
    console.log("from server", review);
    review.save(function (err, result) {
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
