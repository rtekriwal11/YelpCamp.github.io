var campground=require("../models/campground");
var comment=require("../models/comment");

var middlewareObj={};

middlewareObj.checkCampgroundOwnership=function(req,res,next){
	if(req.isAuthenticated())
		{
			campground.findById(req.params.id,function(err,found)
			{
				if(err)
				{req.flash("error","Campground Not Found");
					res.redirect("back");
				}else
				{
				if(found.author.id.equals(req.user._id))
					{
					//	console.log(found.author._id);
					//	console.log(req.user._id);
					next();		   
					}
					else
						{
							req.flash("error","You dont have the permission");
							res.redirect("back");
						}
				}
		 	});
		}else
		{
			req.flash("error","You need to login to do that");
			res.redirect("back");	
		}
	};

middlewareObj.checkCommentOwnership=function (req,res,next){
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
							req.flash("error","You dont have the permission");
							res.redirect("back");
						}
				}
		 	});
		}else
		{ req.flash("error","You need to login to do that");
			
			res.redirect("back");	
		}
	};

middlewareObj.isLoggedIn=function(req,res,next){
	if(req.isAuthenticated()){
		return next();
	}
	req.flash("error","You need to be logged in Idiot!!");
	res.redirect("/login" );
}


module.exports=middlewareObj;