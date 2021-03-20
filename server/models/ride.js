let mongoose = require('mongoose');

// creating a model class
let rideModel = mongoose.Schema({
    ownerUserId: Number,
    carModel: String,
    journeyDate: Date,
    journeyTiming: String,
    fromDestination: String,
    toDestination: String,
    numberOfSeats: Number,
    pricePerSeat: Number,
    acceptingBookingTillDate: Date,
    isActive: Boolean,
}, {
    collection: 'ride',
    timestamps: true
});

module.exports = mongoose.model('ride', rideModel);