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

// creating a reference to the model
let User = require('../models/ride');

module.exports.displayAddPage = (req, res, next) => {
    res.render('user/add', {title: 'Add Ride'})          
}

module.exports.processAddPage = (req, res, next) => {
    let newUser = User({
        "username": req.body.username,
        "name": req.body.name,
        "emailId": req.body.emailId,
        "password": req.body.password,
        "isEmailVerified": req.body.isEmailVerified,
        "isActive": true
    });

    User.create(newUser, (err, User) =>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            // refresh the user list
            res.redirect('/user-list');
        }
    });

}