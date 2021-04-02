// index.server.routes.js
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
 let indexController = require('../controllers/index.server.controller');

 /* GET home page. */
router.get('/', indexController.displayHomePage);
router.get('/home', indexController.displayHomePage);

/* GET about page. */
router.get('/about', indexController.displayAboutPage);

// /* GET add ride page. */
// router.get('/addride', indexController.displayAddRidePage);

// /* GET list ride page. */
// router.get('/listride', indexController.displayListRidePage);

/* GET contact page. */
router.get('/contact', indexController.displayContactPage);

module.exports = router;


 // module.exports=function(app){
  
//     var index=require('../controllers/index.server.controller');
   
//     app.get('/',function(req,res){
//         console.log("hello");
       
//         res.render('index',{loginMessage:'Pleaselogin'});
//     });
    
//     app.post('/',function(req,res){
//         console.log("hello1")
        
//         index.displayInfo(req,res);
//     });
//  };
