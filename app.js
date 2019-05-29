var express     = require("express"),
 seedDB         = require("./seed"),
 bodyparser     = require("body-parser"),
 mongoose       = require('mongoose'),
 passport       = require('passport'),
 localStratergy = require('passport-local'),
 methodOverride = require('method-override'),
 flash          = require('connect-flash'),
 Campground     = require('./model/Campground'),
 Comment        = require('./model/Comment'),
 User           = require('./model/User'),
 app            = express();

var campgroundRoutes = require('./routes/campground'),
    commentRoutes    = require('./routes/comment'),
    indexRoutes      = require('./routes/index');


//seedDB();//comment seed the database

mongoose.connect("mongodb://localhost:27017/yelp_camp",{useNewUrlParser:true})
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static(__dirname + "/public"));
app.set("view engine","ejs");
app.use(methodOverride("_method"));
app.use(flash());

//PASSPORT CONFIG
app.use(require('express-session')({
	secret:"Silk is the best doggo ever",
	resave:false,
	saveUninitialized:false
}))
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStratergy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
	res.locals.currentUser=req.user;
	res.locals.error      =req.flash("error");
    res.locals.success    =req.flash("success");
    res.locals.info       =req.flash("info");
	next();
})
 
 //Campground.create(
 //{
 //    name:"Tso Moriri Lake, Ladakh",
 //    image : "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Tsomoriri_Lake.jpg/320px-Tsomoriri_Lake.jpg",
 //    description:"Tsomoriri Lake is the highest lake in the world and located in Ladakh. Camping here is the experience of a lifetime. The lake is completely frozen during the winters and is an excitingly unique thing to witness. The best time to camp here is during May to September and it is simply wonderful to spend time in the decorated tents. You can trek in the nearby Ladakh region and witness the mesmerizing sunset at the lake. The best part is that the tents are comfortable with electricity supply."
 //}, 
 //  function(err,retcampground){
 //  	if(err){
 // 		console.log("An Error occurred")
 // 		console.log(err)
 //  	}
 //  	else{
 //  		console.log("Campground Created")
 //  		console.log(retcampground)
 //  	}
 //  }
 //)

//var campground=[
	//{name : "Exotica", image : "https://images.unsplash.com/photo-1506404214625-2c59d5e6e912?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"},
	//{name : "Cloudeburst", image : "https://images.unsplash.com/photo-1537905569824-f89f14cceb68?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"},
	//{name : "WanderLust", image : "https://images.unsplash.com/photo-1508873696983-2dfd5898f08b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"},
	//{name : "Tropicana", image : "https://images.unsplash.com/photo-1526491109672-74740652b963?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"},
	//{name : "Rose Merry", image : "https://images.unsplash.com/photo-1537565266759-34bbc16be345?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"},
	//{name : "Petal Falls", image : "https://images.unsplash.com/photo-1510312305653-8ed496efae75?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"},
	//{name : "Quakemeire", image : "https://images.unsplash.com/photo-1484960055659-a39d25adcb3c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"},
	//{name : "Greeny Hills", image : "https://images.unsplash.com/photo-1471115853179-bb1d604434e0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"}
	//];

app.use("/campgrounds",campgroundRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);
app.use("/",indexRoutes);


//===========================================
//server
//============================================
app.listen(3000,function(){
	console.log("YelpCamp Server has started !!")
})
