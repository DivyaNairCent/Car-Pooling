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
let User = require('../models/user');

let userController = require('../controllers/user');

/* GET Route for displaying the Add page - CREATE Operation */
router.get('/add', userController.displayAddPage);

/* POST Route for processing the Add page - CREATE Operation */
router.post('/add', userController.processAddPage);

/* POST Route for processing the Add page - CREATE Operation */
router.get('/login', userController.displayLoginPage);

/*POST  Route for processing the Login Page */
router.post('/login', userController.processLoginPage);

module.exports = router;