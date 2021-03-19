let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// creating a reference to the model
let Ride = require('../models/ride');

module.exports.displayAddPage = (req, res, next) => {
    res.render('ride/add', {title: 'Add Ride'})          
}

module.exports.processAddPage = (req, res, next) => {
    let newRide = Ride({
        "ownerUserId": req.body.ownerUserId,
        "carModel": req.body.carModel,
        "journeyDate": req.body.journeyDate,
        "journeyTiming": req.body.journeyTiming,
        "fromDestination": req.body.fromDestination,
        "toDestination": req.body.toDestination,
        "numberOfSeats": req.body.numberOfSeats,
        "pricePerSeat": req.body.pricePerSeat,
        "acceptingBookingTillDate": req.body.acceptingBookingTillDate,
        "isActive": true,
        "createdAt": new Date()
    });

    Ride.create(newRide, (err, Ride) =>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            // refresh the ride list
            res.redirect('/ride-list');
        }
    });

}