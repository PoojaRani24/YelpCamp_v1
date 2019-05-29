var Campground = require("../model/Campground");
var Comment = require("../model/Comment");

var middlewareObj={}

middlewareObj.isLoggedIn= function(req,res,next){
  if(req.isAuthenticated()){
    return next();
  }
  req.flash("error","You need to be logged in to do that!");
  res.redirect("/login");
}

middlewareObj.checkOwner=function(req,res,next){
  //if logged in
  if(req.isAuthenticated())
      {    //find the campground
            Campground.findById(req.params.id,function(err,retcamp)
            {
                if(err){
                  req.flash("info","Something went wrong!")
                  //campground does not exist
                  res.redirect("back");
                }
                else{
                  //does the user own the campground
                  if(retcamp.author.id.equals(req.user._id)){
                      next();
                     }
                     else{
                      req.flash("error","You are not allowed to do this");
                      res.redirect("back");
                     }
                }
            })
      }
      //otherwise redirect
      else{
        req.flash("error","You need to be LoggedIn to that");
        res.redirect("/login");
      }
    }

middlewareObj.isCommentOwner=function(req,res,next){
  if(req.isAuthenticated()){
      Comment.findById(req.params.comment_id,function(err,retcomment){
        if(err){
          req.flash("info","Something went wrong!")
          res.redirect("back");
        }
        else{
          if(retcomment.author.id.equals(req.user._id)){
           next();}
           else{
            req.flash("error","You do not have this permission")
            res.redirect("back");
          }
        }

      })
  }
  else{
    req.flash("error","You need to be logged in to do that!")
    res.redirect("back");
  }
}


module.exports= middlewareObj;