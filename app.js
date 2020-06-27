var express=require("express");
var app=express();
var bodyparser=require("body-parser");
var mongoose=require("mongoose");
var passport=require("passport");
var flash=require("connect-flash");
var LocalStrategy=require("passport-local");
var methodOverride=require("method-override");
var passportlocalMongoose=require("passport-local-mongoose");
var campground=require("./models/campground");
var comment=require("./models/comment");
var User=require("./models/user");
var seedDB=require("./seed");

 
//requring routes
var commentRoutes    = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes      = require("./routes/index")

//mongoose.connect("mongodb://localhost/yelp_camp_v10");
mongoose.connect("mongodb+srv://Raahil:Raahil@11@yelpcamp-1dc0j.mongodb.net/yelpcamp?retryWrites=true&w=majority",{
	useNewUrlParser:true,
	useCreateIndex:true
}).then(()=>{
	console.log("Connected To Db!!");
}).catch(err => {
	console.log("ERROR",err.message);
});
app.use(bodyparser.urlencoded({extended: true}));
app.set("view engine","ejs");
app.use(flash());
app.use(express.static(__dirname+"/public"));
app.use(methodOverride("_method"));
seedDB();

//PASSPORT CONFIGURATION

app.use(require("express-session")({
	secret:"Once again Rusty wins cutest dogs!",
	resave:false, saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//this run before every single route
app.use(function(req, res, next){
  res.locals.currentUser = req.user;
	res.locals.error=req.flash("error");
	res.locals.success=req.flash("success");
  next();
});

//SCHEMA SETUP
// var campgroundSchema=new mongoose.Schema({
// 	name:String, image: String, description: String
// });

// var campground=new mongoose.model("campground",campgroundSchema);

/* campground.create({
 	name:"granite hill", image:"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRIq8c-O8MZIm0CVmuQNfSfzED0SDJ-9Ieb5E6hVROx3kgOFd8G&usqp=CAU" ,description: "new place of granite hill"},
 {name:"Mountain's goat rest",
    image:"https://images.unsplash.com/photo-1556942154-006c061d4561?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80",description:"baby girl"},
 function(err,camp){
 	if(err)
 		console.log(err);
 	else{
 		console.log("newly created campground");
 		console.log(camp);
 	}
 });

*/
// var camp=[
// 		{name:"Salmon creek", image:"https://pixabay.com/get/57e8d1464d53a514f1dc84609620367d1c3ed9e04e507440742a73d69f44c4_340.jpg"},
// 		{name:"granite hill", image:"https://pixabay.com/get/50e9d4474856b10ff3d8992ccf2934771438dbf852547848702779dc9e4c_340.jpg"},
// 		{name:"Mountain's goat rest", image:"https://pixabay.com/get/57e8d0424a5bae14f1dc84609620367d1c3ed9e04e507440742a73d69f44c4_340.jpg"},
// 	{name:"Salmon creek", image:"https://pixabay.com/get/57e8d1464d53a514f1dc84609620367d1c3ed9e04e507440742a73d69f44c4_340.jpg"},
// 		{name:"granite hill", image:"https://pixabay.com/get/50e9d4474856b10ff3d8992ccf2934771438dbf852547848702779dc9e4c_340.jpg"},
// 		{name:"Mountain's goat rest", image:"https://pixabay.com/get/57e8d0424a5bae14f1dc84609620367d1c3ed9e04e507440742a73d69f44c4_340.jpg"}
// 	]
//index.ejs 
/*
app.get("/",function(req,res){
	res.render("landing");
	//res.redirect("/campground");
});
*/

/*campgrounds.ejs
  //INDEX-Show all campground
app.get("/campground",function(req,res){
	//get all campgrounds from db
	campground.find({},function(err, allcamp){  //allcamp means all the data coming from database
		if(err)
			console.log(err);
		else
			res.render("campgrounds/index",{camp:allcamp});
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

app.post("/campground",function(req,res){
	var nam=req.body.name;
	var img=req.body.image;
	var desc=req.body.description;
	var data={name: nam, image:img,description:desc};
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
app.get("/campground/search",function(req,res){
	res.render("campgrounds/search");
})

//show-more details about one campground
app.get("/campground/:id",function(req,res){
	campground.findById(req.params.id).populate("comments").exec(function(err,foundcamp){  //we use populate so that all comments instead of their ids can be printed
		if(err)
			console.log(err);
		else{
			console.log(foundcamp);
			res.render("campgrounds/show",{camp:foundcamp});	
		}
	})
})
	//find the campground with provided id
	
	//res.send("this page will show one day");
*/

//====================	
//comments
//=====================
/*
app.get("/campground/:id/comments/new",isLoggedIn,function(req,res){
		campground.findById(req.params.id,function(err,found){
			if(err){console.log(err);}
			else {res.render("comments/new",{campground:found}) };
		})
})
	//create add new campground
	app.post("/campground/:id/comments",isLoggedIn,function(req,res){
		campground.findById(req.params.id,function(err,campground){
		if(err){ console.log(err);res.redirect("/campground")}
		else{
			comment.create(req.body.comment,function(err,found)
				{
				if(err)console.log(err);
				else{
					campground.comments.push(found);
		    		campground.save();
					res.redirect("/campground/"+campground._id);	
				}
				})
			}	
		})
		
	})
*/
/*
//=========================================
//AUTH ROUTES
//=========================================
app.get("/register",function(req,res){
	res.render("register");
})

app.post("/register",function(req,res)
	{
		//req.body.username
		//req.body.password
		var newUser=new User({username:req.body.username});
		User.register(newUser,req.body.password,function(err,user)
		{
			if(err)
			{ 
				console.log(err);
				return res.render("register")
			}
			passport.authenticate("local")(req,res,function()
			{
				res.redirect("/campground");
			});
		});
	});

//login form
app.get("/login",function(req,res){
	res.render("login");
});

app.post("/login",passport.authenticate("local",
	{
		//successRedirect:"/campground",
		failureRedirect:"/login"
 	}),function(req,res){
	console.log(req.body.username+" jzzt logged in");
	res.redirect("/campground");
});

function isLoggedIn(req,res,next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
}

app.get("/logout",function(req,res){
	req.logout();
	res.redirect("/campground");
})*/
//Raahil-raahil,password-password,tekriwal-password,Raa-password

app.use("/", indexRoutes);
app.use("/campground", campgroundRoutes);
app.use("/campground/:id/comments", commentRoutes);

// app.listen("3000",function(){
// 	console.log("Server fr Yelp camp is starrted");
// });
var port = process.env.PORT || 3000;
    app.listen(port, function () {
      console.log("Server Has Started!");
    });