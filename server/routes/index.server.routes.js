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


 let express = require('express');
 let router = express.Router();
 let indexController = require('../controllers/index.server.controller');

 /* GET home page. */
router.get('/', indexController.displayHomePage);

 module.exports = router;