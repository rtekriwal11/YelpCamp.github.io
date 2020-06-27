var express = require("express");
var router  = express.Router();
var passport = require("passport");
var User = require("../models/user");
//router.set("view engine","ejs");

router.get("/",function(req,res){
	res.render("landing.ejs");
	//res.redirect("/campground");
});

router.get("/register",function(req,res){
	res.render("register.ejs");
})

router.post("/register",function(req,res)
	{
		//req.body.username
		//req.body.password
		var newUser=new User({username:req.body.username});
		User.register(newUser,req.body.password,function(err,user)
		{
			if(err)
			{ 
				//console.log(err);
				req.flash("error",err.message);
				return res.redirect("/register")
			}
			passport.authenticate("local")(req,res,function()
			{
				req.flash("success","Welcome to YelpCamp "+ user.username);
				res.redirect("/campground");
			});
		});
	});

//login form
router.get("/login",function(req,res){
	res.render("login");	//,{message:req.flash("error")});
});

router.post("/login", function (req, res, next) {
  passport.authenticate("local",
    {
      successRedirect: "/campground",
      failureRedirect: "/login",
      failureFlash: true,
      successFlash: "Welcome to YelpCamp, " + req.body.username + "!"
    })(req, res);
});

// router.post("/login",passport.authenticate("local",
// 	{
// 		//successRedirect:"/campground",
// 		failureRedirect:"/login"
//  	}),function(req,res){
// 	console.log(req.body.username+" jzzt logged in");
// 	req.flash("success","Welcome to YelpCamp "+ req.body.username);
// 	res.redirect("/campground");
// });


// function isLoggedIn(req,res,next){
// 	if(req.isAuthenticated()){
// 		return next();
// 	}
// 	res.redirect("/login");
// }

router.get("/logout",function(req,res){
	req.logout();
	req.flash("success","You are kicked Out!!");
	res.redirect("/campground");
})

module.exports = router;