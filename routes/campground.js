var express   = require('express');
var router     = express.Router();
var Campground = require('../model/Campground');
var middleware = require('../middleware');


//Index route- shows all campgrounds
router.get("/", function(req,res){
	Campground.find({},function(err,retcamp){
		if(err){
			req.flash("info","Something went wrong!")
      res.redirect("back");
		}
		else{
          res.render("campground/index",{campground : retcamp})
		}
	})
	
})

//Create Route - creates a new campground in database
router.post("/",middleware.isLoggedIn,function(req,res){
	var name       = req.body.campname;
  var price      =req.body.campprice;
	var image      = req.body.campimage;
	var description=req.body.campdesc;
	var author={
            id       :req.user._id,
            username : req.user.username
  }
	var newcampground= {name : name,price :price, image : image, description:description, author:author}
    Campground.create(newcampground,function(err,retcamp){
    	if(err){
        req.flash("info","Something went wrong!")
        res.redirect("back");
    	}
    	else{
    		req.flash("success","Successfully created a Campground")
            res.redirect("/campgrounds");
    	}
    })
})

//New Route- Shows form for adding new campground
router.get("/new",middleware.isLoggedIn,function(req,res){
	res.render("campground/new");
})

//Show Route- shows one campground
router.get("/:id",function(req,res){
	Campground.findById(req.params.id).populate("comments").exec(function(err,retcamp){
		if(err){
      req.flash("info","Something went wrong!")
      res.redirect("back");
		}
		else{
          res.render("campground/show",{campground:retcamp});

		}
	})
	
})

//Edit route - shows edit form
router.get("/:id/edit",middleware.checkOwner,function(req,res)
    {
      Campground.findById(req.params.id,function(err,retcamp){
        if(err){
           req.flash("info","Something went wrong!")
           res.redirect("back");
        }else{
           res.render("./campground/edit",{campground:retcamp});
        }
      })
   })
	   

//Update route - updates a campground
router.put("/:id",middleware.checkOwner,function(req,res){
	Campground.findByIdAndUpdate(req.params.id,req.body.camp,function(err,retcampground){
		if(err){
      req.flash("info","Something went wrong!")
			res.redirect("/back");
		}
		else{
      req.flash("success","Successfully edited campground!")
			res.redirect("/campgrounds/" + retcampground._id)
		}
	})
})

//delete route - deletes a campground
router.delete("/:id",middleware.checkOwner,function(req,res){
       Campground.findByIdAndRemove(req.params.id,function(err){
       	if(err){
          req.flash("info","Something went wrong!")
       		res.redirect("/campgrounds");
       	}
       	else{
          req.flash("success","Successfully deleted campground!")
       		res.redirect("/campgrounds");
       	}
       })
})

module.exports= router;


