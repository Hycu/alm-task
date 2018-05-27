var express = require("express");
var router = express.Router({mergeParams: true});
var Product = require("../models/product");
var Comment = require("../models/comment");
var middleware = require("../middleware");

router.get("/new", middleware.isLoggedIn, function(req, res){
    Product.findById(req.params.id, function(err, foundProduct){
        if(err){
            console.log(err);
        } else {
            res.render("comments/new", {prod: foundProduct});
        }
    });
});

router.post("/", middleware.isLoggedIn, function(req, res){
    Product.findById(req.params.id, function(err, foundProduct){
        if(err){
            console.log(err);
        } else {
            Comment.create(req.body.comment, function(err, createdComment){
                if(err){
                    req.flash("error", "Something went wrong.")
                    console.log(err);
                } else {
                    createdComment.author.id = req.user.id;
                    createdComment.author.username = req.user.username;
                    createdComment.save();
                    foundProduct.comments.push(createdComment);
                    foundProduct.save();
                    req.flash("success", "Successfully added comment.")
                    res.redirect("/products/" + req.params.id);
                }
            });
        }
    });
});

router.get("/:comment_id/edit", middleware.checkCommentOwner, function(req, res){
    Product.findById(req.params.id, function(err, foundProduct){
        if(err || !foundProduct){
            req.flash("error", "Product not found.");
            return res.redirect("back");
        }
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err){
                res.redirect("back");
            } else {
                res.render("comments/edit", {comment: foundComment, prodId: req.params.id});
            }
        });
    });
});

router.put("/:comment_id", middleware.checkCommentOwner, function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
        if(err){
            res.redirect("back");
        } else{
            res.redirect("/products/" + req.params.id);
        }
    });
});

router.delete("/:comment_id", middleware.checkCommentOwner, function(req, res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err){
            res.redirect("back");
        } else {
            req.flash("success", "Comment deleted.");
            res.redirect("/products/" + req.params.id);
        }
    });
});

module.exports = router;