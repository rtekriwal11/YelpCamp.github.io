
var express = require("express");
var router  = express.Router({mergeParams: true});
var campground = require("../models/campground");
var comment = require("../models/comment");
var middleware=require("../middleware");

router.get("/new",middleware.isLoggedIn,function(req,res){
		campground.findById(req.params.id,function(err,found){
			if(err){console.log(err);}
			else {res.render("comments/new",{campground:found}) };
		})
})
	//create add new campground
	router.post("/",middleware.isLoggedIn,function(req,res){
		campground.findById(req.params.id,function(err,campground){
		if(err){ console.log(err);res.redirect("/campground")}
		else{
			comment.create(req.body.comment,function(err,comment)
				{
				if(err){req.flash("errror","Something went wrong")
					console.log(err);
				}else{
					comment.author.id=req.user._id;
					comment.author.username=req.user.username;
					comment.save();
					campground.comments.push(comment);
		    		campground.save();
					req.flash("success","Successfully added comment");
					res.redirect("/campground/"+campground._id);	
				}
				})
			}	
		})
		
	})
//EDIT COMMENTS
router.get("/:comment_id/edit",middleware.checkCommentOwnership,function(req,res){
	comment.findById(req.params.comment_id,function(err,foundcomm){
		if(err)res.render("back");
		else
	res.render("comments/edit",{campground_id:req.params.id, comment:foundcomm});		
	})	
})
//UPDATE COMMENTS
router.put("/:comment_id",middleware.checkCommentOwnership,function(req,res){
	comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err,updated){
		if(err)res.redirect("back");
		else res.redirect("/campground/"+req.params.id);//id always consider of campground
	})
})

//DELETE COMMENTS
router.delete("/:comment_id",middleware.checkCommentOwnership,function(req,res){
	comment.findByIdAndRemove(req.params.comment_id,function(err){
		if(err)res.redirect("back");
		else{
			req.flash("success","Comment delete");
		res.redirect("/campground/"+req.params.id);	
		}
	})
})
/*
function isLoggedIn(req,res,next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
}


function checkCommentOwnership(req,res,next){
	if(req.isAuthenticated())
		{
			comment.findById(req.params.comment_id,function(err,found)
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
module.exports = router;
