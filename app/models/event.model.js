const mongoose = require('mongoose');

const EventSchema = mongoose.Schema({
  //  id: Number,
    name: String,
    type: String,
    length:Number,
    views:String
}, {
    timestamps: true
});

module.exports = mongoose.model('Event', EventSchema);