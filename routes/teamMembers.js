var express = require('express');
var router = express.Router();

var TeamMember = require('../models/teamMember');

router.get('/', function (req, res, next) {
    TeamMember.find()
        .exec(function (err, teamMembers) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Success',
                obj: teamMembers
            });
        });
});
router.post('/', function (req, res, next) {
    var teamMember = new TeamMember({
        name: req.body.name,
        position: req.body.position,
        picture: req.body.picture,
        status: req.body.status
    });
    console.log("from server", teamMember);
    teamMember.save(function (err, result) {
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
