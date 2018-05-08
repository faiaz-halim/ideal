var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongooseUniqueValidator = require('mongoose-unique-validator');

var schema = new Schema({
    bookingDate: { type: String, required: true },
    time: { type: String, required: true },
    //owner: { type: Schema.Types.ObjectId, ref: 'Customer'} ,
    owner: { type: String, required: true } ,
    vehicle: { type: String, required: true },
    type: [ { type: String, required: true } ],
    description: { type: String },
    status: { type: String },
});

schema.plugin( mongooseUniqueValidator );

module.exports = mongoose.model('Booking', schema);
