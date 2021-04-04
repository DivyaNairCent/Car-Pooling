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

function requireAuth(req, res, next)
{
    //check if user is logged in
    if(!req.isAuthenticated())
    {
        return res.redirect('/users/login');
    
    }
    next();
}

/* GET Route for displaying the Add page - CREATE Operation */
router.get('/register',  userController.displayAddPage);

/* POST Route for processing the Add page - CREATE Operation */
router.post('/register', userController.processAddPage);

/* POST Route for processing the Add page - CREATE Operation */
router.get('/login', userController.displayLoginPage);

/*POST  Route for processing the Login Page */
router.post('/login', userController.processLoginPage);

/*POST  Route for processing the Login Page */
router.get('/logout', userController.performLogout);


/// from ride.js router

// creating a reference to the model
let Ride = require('../models/ride');

/* GET Route for displaying the Add page - CREATE Operation */
router.get('/add', requireAuth, userController.displayRideAddPage);

/* POST Route for processing the Add page - CREATE Operation */
router.post('/add', userController.processRideAddPage);

/* GET Route for the Ride List page - READ Operation */
router.get('/displayride',requireAuth, userController.displayRideList);

/* GET router for the DELETE Book page - DELETE */
router.get('/delete/:id',requireAuth, userController.performRideDeletion);

/* GET Route for displaying the Edit page - UPDATE Operation */
router.get('/edit/:id',requireAuth, userController.displayEditRide);

/* POST router for the EDIT Ride page - UPDATE */
router.post('/edit/:id', userController.processRideUpdate);

/// from index.js controller

 /* GET home page. */
 router.get('/', userController.displayHomePage);
 router.get('/home', userController.displayHomePage);
 
 /* GET about page. */
 router.get('/about', userController.displayAboutPage);
 
 // /* GET add ride page. */
 // router.get('/addride', indexController.displayAddRidePage);
 
 // /* GET list ride page. */
 // router.get('/listride', indexController.displayListRidePage);
 
 /* GET contact page. */
 router.get('/contact', userController.displayContactPage);

 /* GET Route for the Ride List page specific to the user - READ Operation */
router.get('/myrides', userController.displayRideListByUserId);
 

module.exports = router;