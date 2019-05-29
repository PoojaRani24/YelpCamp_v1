var express    = require('express');
var router     = express.Router({mergeParams:true});
var Campground = require('../model/Campground');
var Comment    = require('../model/Comment');
var middleware = require('../middleware');

//=======================================
//Comment route
//=======================================

//Comment New route- shows comment form
router.get("/new",middleware.isLoggedIn,function(req,res){
	Campground.findById(req.params.id,function(err,retcamp){
		if(err){
			req.flash("info","Something went wrong!")
      res.redirect("back");
		}
		else{     
             res.render("comment/new",{campground:retcamp});
		}
	})
})

//Comment create route- creates new comments
router.post("/",middleware.isLoggedIn,function(req,res){
         //find campground by id
          //create comment
          //associate campground and comment
          //redirect to show page
          Campground.findById(req.params.id,function(err,retcamp){
              if(err){
              	req.flash("info","Something went wrong!")
                res.redirect("back");
              }
              else{
              	Comment.create(req.body.comment, function(err,retcomment){
              		if(err){
              			req.flash("info","Something went wrong!")
                    res.redirect("back");
              		}
              		else{
                    retcomment.author.id=req.user._id;
                    retcomment.author.username=req.user.username;
                    retcomment.save();
              			retcamp.comments.push(retcomment);
              			retcamp.save();
                    req.flash("success","Successfully created Comment!")
              			res.redirect("/campgrounds/"+ req.params.id)
              		}
              	})

              }
          })
})

//Comment Edit route
router.get("/:comment_id/edit",middleware.isCommentOwner,function(req,res)
{
   Comment.findById(req.params.comment_id, function(err,retcomment){
      res.render("comment/edit",{campground_id:req.params.id,comment:retcomment})
    })
   })


//Comment Update route
router.put("/:comment_id",middleware.isCommentOwner,function(req,res){
  Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err,retcomment){
    if(err){
      req.flash("info","Something went wrong!")
      res.redirect("back");
    }
    else{
      req.flash("success","Successfully edited comment!")
      res.redirect("/campgrounds/" + req.params.id )
    }
  })
})

//Comment delete route
router.delete("/:comment_id",middleware.isCommentOwner,function(req,res){
  Comment.findByIdAndRemove(req.params.comment_id,function(err){
       if(err){
        req.flash("info","Something went wrong!")
            res.redirect("back");
        }
        else{
          req.flash("success","Successfully deleted comment!")
          res.redirect("/campgrounds/"+ req.params.id)
  }
  
  })
})

module.exports= router;