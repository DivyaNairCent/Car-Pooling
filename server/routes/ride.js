let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// creating a reference to the model
let Ride = require('../models/ride');

let rideController = require('../controllers/ride');

/* GET Route for displaying the Add page - CREATE Operation */
router.get('/add', rideController.displayAddPage);

/* POST Route for processing the Add page - CREATE Operation */
router.post('/add', rideController.processAddPage);

/* GET Route for the Ride List page - READ Operation */
router.get('/', rideController.displayRideList);

/* GET router for the DELETE Book page - DELETE */
router.get('/delete/:id', rideController.performRideDeletion);

/* GET Route for displaying the Edit page - UPDATE Operation */
router.get('/edit/:id', rideController.displayEditRide);

/* POST router for the EDIT Ride page - UPDATE */
router.post('/edit/:id', rideController.processRideUpdate);

module.exports = router;