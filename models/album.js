var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
  name: {type: String, required: true},
  images:[{type: String, required: true}],
  howMany:{ type: Number, required: true },
  time: { type: String, required: true }
});

module.exports = mongoose.model('Album', schema);
