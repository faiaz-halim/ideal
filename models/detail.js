var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//var mongooseUniqueValidator = require('mongoose-unique-validator');

var schema = new Schema({
  plate: { type: String, required: true },
  make: {type: String },
  model: { type: String },
  year: { type: String },
  vin: { type: String },
  type: { type: String },
  transmission: { type: String },
  engine: { type: String },
  cylinders: { type: Number },
  fuel: { type: String }
});

//schema.plugin( mongooseUniqueValidator );

module.exports = mongoose.model('Detail', schema);
