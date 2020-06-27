var mongoose=require("mongoose");
var comment=require("./models/comment");
var camp=require("./models/campground");

var data=
[
]

function seedDB()
{
	//remov all dbs
	/*camp.deleteMany({},function(err){
	if(err){
	console.log(err);
		}

	console.log("removed campgrounds");

	comment.deleteMany({}, function(err) {	
		if (err){
                console.log(err);
            }

	console.log("removed comments!");
	*/
		// if(err)console.log(err);
		// console.log("REMOVED CCAMP");
		// //add new 
		data.forEach(function(seed)
			{
			camp.create(seed,function(err,camp)
				{
 				if(err)
 				console.log(err);
 				else
					{
 					console.log("newly created campground");
 					//console.log(camp);
					//campground create a comment
					comment.create(
					{
						text:"this is a beautiful place", author:"hum main"
					},function(err,comm)
						{
							if(err)console.log(err);
							else
								{
									camp.comments.push(comm);
									camp.save();
									console.log(camp);
								}
						});
					}
				});
		});
	

}
module.exports=seedDB;
		/*camp.create({
 	name:"Franite hill", image:"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRIq8c-O8MZIm0CVmuQNfSfzED0SDJ-9Ieb5E6hVROx3kgOFd8G&usqp=CAU" ,description: "new place of granite hill"},
 {name:"Mountain's goat rest",
    image:"https://images.unsplash.com/photo-1556942154-006c061d4561?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80",description:"baby girl"},*/
 /*function(err,camp){
 	if(err)
 		console.log(err);
 	else{
 		console.log("newly created campground");
 		console.log(camp);
	*/	/*comment.create({	text:"this is a beautiful place", author:"hum main"
		},function(err,m){
			if(err)console.log(err);
			else{
				camp.comments.push(comm);
				camp.save();
				console.log("CREATED NEW CAMP");
			}
		})*/
 	/*	}
 	});
	});	
}*/


