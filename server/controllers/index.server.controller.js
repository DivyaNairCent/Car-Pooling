// index.server.controller.js
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

module.exports.displayHomePage = (req, res, next) => {
    console.log(req.body.user);
    res.render('index', {title: 'Home'});
}

module.exports.displayAboutPage = (req, res, next) => {
    res.render('index', {title: 'About'});
}

// module.exports.displayAddRidePage = (req, res, next) => {
//     res.render('index', {title: 'Add Ride'});
// }

// module.exports.displayListRidePage = (req, res, next) => {
//     res.render('index', {title: 'List Ride'});
// }

module.exports.displayContactPage = (req, res, next) => {
    res.render('index', {title: 'Contact'});
}


// exports.displayInfo=function(req,res){
//     var username=req.body.username;
//     var session=req.session;
//     session.username=username;console.log("usernameinsession:"+session.username);

// res.render('display',
// {username:username});
// };


