module.exports=function(app){
  
    var index=require('../controllers/index.server.controller');
   
    app.get('/',function(req,res){
       
        res.render('index',{loginMessage:'Pleaselogin'});
    });
    
    app.post('/',function(req,res){
        
        index.displayInfo(req,res);
    });
 };