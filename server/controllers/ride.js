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
            res.redirect('/listride');
        }
    });

}

module.exports.displayRideList = (req, res, next) => {
    console.log("Entered")
    Ride.find().exec((err, rideList) => {
        if(err)
        {
            return console.error(err);
        }
        else
        {
            console.log("Something");
            // console.log(RideList);
            res.render('index', {title: 'List Ride', RideList: rideList});
            // res.render('/index', {title: 'Home'});      
        }
    });
}

/* GET router for the DELETE Ride page - DELETE */
module.exports.performRideDeletion =  (req, res, next) => {
    let id = req.params.id;
    Ride.deleteOne({_id: id}, (err) =>{
        if(err) {
            console.log(err);
            res.end(err);
        } else {
            // refresh ride list
            res.redirect('/listride');
        }
    });
};


/* GET router for the EDIT Ride page - UPDATE */
module.exports.displayEditRide =  (req, res, next) => {
    let id = req.params.id;
    Ride.findById(id, (err, rideToEdit) =>{
        if(err) {
            console.log(err);
            res.end(err);
        } else {
            // show the edit view
            res.render('index', {title: 'Edit Ride', ride: rideToEdit, 
            displayName: req.user ? req.user.displayName : ''})
        }
    });
};

/* POST router for the EDIT Ride page - UPDATE */
module.exports.processRideUpdate = (req, res, next) => {
    let id = req.params.id;
    let updatedRide = Ride ({
        _id: id,
        "ownerUserId": req.body.ownerUserId,
        "carModel": req.body.carModel,
        "journeyDate": req.body.journeyDate,
        "journeyTiming": req.body.journeyTiming,
        "fromDestination": req.body.fromDestination,
        "toDestination": req.body.toDestination,
        "numberOfSeats": req.body.numberOfSeats,
        "pricePerSeat": req.body.pricePerSeat,
        "acceptingBookingTillDate": req.body.acceptingBookingTillDate,
    });

    Ride.updateOne({_id: id}, updatedRide, (err) => {
        if(err){
            console.log(err);
            res.end(err); 
        } else {
            // refresh ride list
            res.redirect('/rides');
        }
    });
};