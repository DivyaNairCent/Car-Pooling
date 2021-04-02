// user.js
// CarPooling Web App
// Project by Team CodEureka
// Silviya Velani, Student Id: 301167163
// Divya Nair, Student Id: 301169854 
// Jashan Preet Singh, Student ID: 301170664
// Surya Teja Kandru, Student Id: 301109137 
// Aritra Roy, Student ID: 301176508 
// Copyright © 2021 Centennial College. All rights reserved.

let mongoose = require('mongoose');
let passportLocalMongoose = require('passport-local-mongoose');


// creating a model class
let userModel = mongoose.Schema({
    username:{
        type: String,
        default: '',
        trim:true,
        required: 'username is required'

    } ,
    name: String,
    emailId: {
        type: String,
        default: '',
        trim:true,
        required: 'email address  is required'

    } ,
    password:{
        type: String,
        default: '',
        trim:true,
        required: 'password is required'

    } , 
    isEmailVerified: Boolean,
    isActive: Boolean
}, {
    collection: 'user',
    timestamps: true
});

module.exports = mongoose.model('user', userModel);