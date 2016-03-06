var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

var QuotaSchema = new mongoose.Schema({
    _owner: { type: ObjectId, ref: 'User' },
    _system: { type: ObjectId, ref: 'System' },
    action: { type: String, required: true },
    instances: Number,
    periodMultiplier: Number,
    timeFrame: String                     
});

module.exports = mongoose.model("Quota", QuotaSchema);