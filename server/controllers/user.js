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
// enable jwt
let jwt = require('jsonwebtoken');
let DB = require('../config/db');

 //creating a reference to the model
let userModel = require('../models/user');
let User = userModel.User;

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

    /* POST Route for processing the Add page - CREATE Operation */
router.post('/add', userController.processAddPage);

}

module.exports.displayLoginPage = (req, res, next) => {
    // check if the user is already logged in
    res.render('index',
        {
            title: "Login",
            //messages: req.flash('loginMessage'),
        });
}

module.exports.processLoginPage = (req, res, next) => {
    passport.authenticate('local',
    (err, user, info) => {
        // server err?
        if(err)
        {
            return next(err);
        }
     
        // is there a user login error?
        if(!user)
        {
            console.log(res);
            req.flash('loginMessage', 'Authentication Error');
            return res.redirect('/users/login');
        }
        req.login(user, (err) => {
            // server error?
            if(err)
            {
                return next(err);
            }

            const payload = 
            {
                id: user._id,
                displayName: user.name,
                username: user.username,
                email: user.email
            }

            const authToken = jwt.sign(payload, DB.Secret, {
                expiresIn: 604800 // 1 week
            });

            /* TODO - Getting Ready to convert to API
            res.json({success: true, msg: 'User Logged in Successfully!', user: {
                id: user._id,
                displayName: user.displayName,
                username: user.username,
                email: user.email
            }, token: authToken});
            */

            return res.redirect('/');
        });
    })(req, res, next);
}

module.exports.performLogout = (req, res, next) =>
{
    req.logout();
    res.redirect('/login');
}
