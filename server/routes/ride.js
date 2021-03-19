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


module.exports = router;