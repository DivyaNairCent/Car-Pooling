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


module.exports = router;