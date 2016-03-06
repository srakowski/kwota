var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

var SystemSchema = new mongoose.Schema({
    _owner: { type: ObjectId, ref: 'User' },
    name: { type: String, required: true },
    purpose: String,
    quotas: [{ type: ObjectId, ref: 'Quota' }]
});

module.exports = mongoose.model("System", SystemSchema);