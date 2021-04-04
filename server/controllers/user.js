
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
    res.render('index', {title: 'Register', displayName: req.user ? req.user.displayName : ''})          
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
                message: req.flash('registerMessage'),
                displayName: req.user ? req.user.displayName : ''
          
            });
        }
        else
        {
             return passport.authenticate('local')(req, res, () =>
            {
                res.redirect('/');
            });
        }
    });


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


            return res.redirect('/');
        });
    })(req, res, next);
}

module.exports.performLogout = (req, res, next) =>
{
    req.logout();
    res.redirect('/login');
}