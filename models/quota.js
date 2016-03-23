var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

var QuotaSchema = new mongoose.Schema({
    _owner: { type: ObjectId, ref: 'User' },
    action: { type: String, required: true },
    instances: { type: Number, required: true },
    fills: [{
        note: String,
        dateFilled: { type: Date, default: Date.now }       
     }]
});

module.exports = mongoose.model("Quota", QuotaSchema);