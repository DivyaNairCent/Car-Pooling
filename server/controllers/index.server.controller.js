module.exports.displayHomePage = (req, res, next) => {
    res.render('index', {title: 'Home'});
}

module.exports.displayAboutPage = (req, res, next) => {
    res.render('index', {title: 'About'});
}

// module.exports.displayAddRidePage = (req, res, next) => {
//     res.render('index', {title: 'Add Ride'});
// }

// module.exports.displayListRidePage = (req, res, next) => {
//     res.render('index', {title: 'List Ride'});
// }

module.exports.displayContactPage = (req, res, next) => {
    res.render('index', {title: 'Contact'});
}


// exports.displayInfo=function(req,res){
//     var username=req.body.username;
//     var session=req.session;
//     session.username=username;console.log("usernameinsession:"+session.username);

// res.render('display',
// {username:username});
// };


