
// user.js
// CarPooling Web App
// Project by Team CodEureka
// Silviya Velani, Student Id: 301167163
// Divya Nair, Student Id: 301169854 
// Jashan Preet Singh, Student ID: 301170664
// Surya Teja Kandru, Student Id: 301109137 
// Aritra Roy, Student ID: 301176508 
// Copyright © 2021 Centennial College. All rights reserved.

let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let passport = require('passport');


 //creating a reference to the model
let userModel = require('../models/user');
let User = userModel.User;

module.exports.displayAddPage = (req, res, next) => {
    res.render('index', {title: 'Register',
    messages: req.flash('registerMessage'),
     displayName: req.user ? req.user.name : ''})          
}

module.exports.processAddPage = (req, res, next) => {
    let newUser = new User({
            username : req.body.username,
            password: req.body.password,
            name:req.body.name,
            emailId : req.body.email,
            isEmailVerified: true,
            isActive: true

    });

    User.register(newUser, req.body.password,(err) =>{
        if(err)
        {
            console.log("Error: Inserting new user");
            if(err.name == "UserExistsError")
            {
                req.flash(
                    'registerMessage',
                    'Registration Error: User Already Exists!'
                );
                console.log('Error: User Already Exists!')
            }
            console.log(err);
            return res.render('index',
            {
                title: "Register",
                messages: req.flash('registerMessage'),
                displayName: req.user ? req.user.name : ''
          
            });
        }
        else
        {
             return passport.authenticate('local')(req, res, () =>
            {
                res.redirect('/users/home');
            });
        }
    });


}

module.exports.displayLoginPage = (req, res, next) => {
    // check if the user is already logged in
    if(!req.user){
        res.render('index',
        {
            title: "Login",
            messages: req.flash('loginMessage'),
            displayName: req.user?req.user.name:''
        })


    }
    else {
        return res.redirect('/users/home')
    }
   
}

module.exports.processLoginPage = (req, res, next) => {
    passport.authenticate('local',
    (err, user, info) => {
        console.log(res.username);
        // server err?
        if(err)
        {
            return next(err);
        }
     
        // is there a user login error?
        if(!user)
        {
            
            req.flash('loginMessage', 'Authentication Error');
            return res.redirect('/users/login');
        }
        req.login(user, (err) => {
            // server error?
            if(err)
            {
                return next(err);
            }


            return res.redirect('/users/home');
        });
    })(req, res, next);
}

module.exports.performLogout = (req, res, next) =>
{
    req.logout();
    return res.redirect('/users/login');
}


///from ride.js controller


// creating a reference to the model
let Ride = require('../models/ride');

module.exports.displayRideAddPage = (req, res, next) => {
    res.render('index', {title: 'Add Ride', displayName: req.user ? req.user.name : ''})          
}

module.exports.processRideAddPage = (req, res, next) => {
    let newRide = Ride({
        "ownerUserId": 1,
        "carModel": req.body.carModel,
        "journeyDate": getDateObject(req.body.journeyDate, req.body.journeyTiming),
        "journeyTiming": req.body.journeyTiming,
        "fromDestination": req.body.fromDestination,
        "toDestination": req.body.toDestination,
        "numberOfSeats": req.body.numberOfSeats,
        "pricePerSeat": req.body.pricePerSeat,
        "acceptingBookingTillDate": getDateObject(req.body.acceptingBookingTillDate, req.body.acceptingBookingTillTime),
        // "acceptingBookingTillTime": req.body.acceptingBookingTillTime,
        "isActive": true,
        "createdAt": new Date()
        
        // "ownerUserId": 1,
        // "carModel": "BMW7",
        // "journeyDate": "2022-05-23T18:25:43.511Z",
        // "journeyTiming": "10:30 am",
        // "fromDestination": "Mumbai",
        // "toDestination": "Pune",
        // "numberOfSeats": 1,
        // "pricePerSeat": 240,
        // "acceptingBookingTillDate": "2022-05-23T18:25:43.511Z",
        // "isActive": true,
        // "createdAt": new Date()

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
            // res.render('index', {title: 'List Ride'});
            res.redirect('/rides');
        }
    });

}

function getDateObject(journeyDate, journeyTiming) {
    // var dateString = "23/10/2015"; // Oct 23

    var dateParts = journeyDate.split("/");

    var dateObject = new Date(journeyDate + " " + journeyTiming);
    return dateObject;
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
            res.render('index', {title: 'List Ride', RideList: rideList, displayName: req.user ? req.user.name : ''});
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
            res.redirect('/rides');
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
            res.render('index', {title: 'Edit Ride', displayName: req.user ? req.user.name : '', ride: rideToEdit, 
        })
            // displayName: req.user ? req.user.displayName : ''})
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

/// from index.js controller

module.exports.displayHomePage = (req, res, next) => {
    console.log(req.user);
    res.render('index', {title: 'Home', displayName: req.user ? req.user.name : ''});
}

module.exports.displayAboutPage = (req, res, next) => {
    res.render('index', {title: 'About', displayName: req.user ? req.user.name : ''});
}

module.exports.displayContactPage = (req, res, next) => {
    res.render('index', {title: 'Contact', displayName: req.user ? req.user.name : ''});
}

