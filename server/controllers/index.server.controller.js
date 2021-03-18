
// exports.displayInfo=function(req,res){
//     var username=req.body.username;
//     var session=req.session;
//     session.username=username;console.log("usernameinsession:"+session.username);

// res.render('display',
// {username:username});
// };



module.exports.displayHomePage = (req, res, next) => {
    console.log("hello")
    res.render('index', {title: 'Home'});
}