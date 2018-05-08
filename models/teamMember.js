var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
  name: { type: String, required: true },
  position: { type: String, required: true },
  picture:{ type: String, required: true },
  status: { type: String, required: true }
});

module.exports = mongoose.model('TeamMember', schema);
