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