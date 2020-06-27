var express = require("express");
var router  = express.Router();
var campground = require("../models/campground");
var middleware=require("../middleware");
//INDEX-Show all campground
router.get("/",function(req,res){
	//get all campgrounds from db
	campground.find({},function(err, allcamp){  //allcamp means all the data coming from database
		if(err)
			console.log(err);
		else
			res.render("campgrounds/index",{campground:allcamp});
	})
	
})

// app.post("/campdata",function(req,res){
// 	var nam=req.body.name;
// 	var img=req.body.image;
// 	var data={name: nam, image:img};
// 	camp.push(data);
// 	//res.send("got it");
// 	res.redirect("/campground");
// })

router.post("/",middleware.isLoggedIn,function(req,res){
	var nam=req.body.name;
	var img=req.body.image;
	var price=req.body.price;
	var desc=req.body.description;
	var author={
		id:req.user._id,
		username:req.user.username
	}
	var data={name: nam,price:price, image:img,description:desc ,author:author};
	//after creating db we deleted the camp array so data should be stored in database
//	camp.push(data);
	campground.create(data,function(err,camp){  //data is what we send newly createdand camp is data we get from db
		if(err)
			console.log(err);
		else{
			console.log("newly created campground");
			console.log(camp);res.redirect("/campground");
		}
	})
	//res.send("got it");
	//res.redirect("/campground");
})
//new -login page
router.get("/search",middleware.isLoggedIn, function(req,res){
	campground.findById(req.params.id,function(err,found){
		if(err)res.redirect("/campground");
		else
	res.render("campgrounds/search",{campground:found});
	})
})

//show-more details about one campground
router.get("/:id",function(req,res){
	campground.findById(req.params.id).populate("comments").exec(function(err,foundcamp){  //we use populate so that all comments instead of their ids can be printed
		if(err)
			console.log(err);
		else{
			console.log(foundcamp);
			res.render("campgrounds/show",{camp:foundcamp});	
		}
	})
})

//EDIT CAMPGROUND ROUTE
router.get("/:id/edit",middleware.checkCampgroundOwnership,function(req,res)
	{
		campground.findById(req.params.id,function(err,found)
			{
					res.render("campgrounds/edit",{campground:found});		   
			});
	});
//update router
router.put("/:id",middleware.checkCampgroundOwnership,function(req,res){
	campground.findByIdAndUpdate(req.params.id,req.body.campground,function(err,update){
		if(err)res.redirect("/campground");
		else res.redirect("/campground/"+req.params.id);
	})
})

//DELETE ROUTER
router.delete("/:id",middleware.checkCampgroundOwnership,function(req,res){
	campground.findByIdAndRemove(req.params.id,function(err){
		if(err)res.redirect("/campground");
		else
			res.redirect("/campground");
	})
	})
	//find the campground with provided id

/*
function isLoggedIn(req,res,next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
}	

function checkCampgroundOwnership(req,res,next){
	if(req.isAuthenticated())
		{
			campground.findById(req.params.id,function(err,found)
			{
				if(err)res.redirect("back");
				else
				{
				if(found.author.id.equals(req.user._id))
					{
					//	console.log(found.author._id);
					//	console.log(req.user._id);
					next();		   
					}
					else
						{
							res.redirect("back");
						}
				}
		 	});
		}else
		{
			res.redirect("back");	
		}
	};

*/	
	//res.send("this page will show one day");
	module.exports = router;