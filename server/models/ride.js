// ride.js
// CarPooling Web App
// Project by Team CodEureka
// Silviya Velani, Student Id: 301167163
// Divya Nair, Student Id: 301169854 
// Jashan Preet Singh, Student ID: 301170664
// Surya Teja Kandru, Student Id: 301109137 
// Aritra Roy, Student ID: 301176508 
// Copyright © 2021 Centennial College. All rights reserved.

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