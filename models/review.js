var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    name: { type: String, required: true },
    carMake: { type: String, required: true },
    carModel: { type: String, required: true },
    rating: { type: Number, required: true },
    myReview: { type: String, required: true },
    comment: { type: String },
    commentBy: { type: String },
    status: { type: String, required: true }
});

module.exports = mongoose.model('Review', schema);
