var express  =  require('express');
var router   =  express.Router();
var User     =  require('../model/User');
var passport =  require('passport');

//=================================================
// root route
//===================================================
router.get("/",function(req,res){
	res.render("landing")
})


//====================================================
//SignUp Route
//====================================================

//shows register form
router.get("/register",function(req,res){
	res.render("register");
})

//handles signup logic
router.post("/register",function(req,res){
	var newUser= new User({username:req.body.username});
	User.register(newUser,req.body.password,function(err,retuser){
		if(err){
			 req.flash("error", err.message);
			res.redirect("back");
		}
		passport.authenticate("local")(req,res,function(){
		 req.flash("success","Welcome "+ retuser.username+" !")
			res.redirect("/campgrounds");
		})
	})
})

//======================================================
//SignIn Routes
//======================================================

//shows login form
router.get("/login",function(req,res){
	res.render("login");
})

//handles login logic
router.post("/login",passport.authenticate("local",{
               successRedirect:"/campgrounds",
               failureRedirect:"/register"
}),function(req,res){
	
})

//======================================================
//SignOut Route
//======================================================
router.get("/logout",function(req,res){
    req.logout();
    req.flash("success","Logged you out");
    res.redirect("/campgrounds");
})

module.exports = router;