var Product = require("../models/product");
var Comment = require("../models/comment");
module.exports = {
    checkProductOwner: function(req, res, next){
            if(req.isAuthenticated()){
                    Product.findById(req.params.id, function(err, foundProduct){
                    if(err || !foundProduct){
                        req.flash("error", "Product not found.");
                        res.redirect("back");
                    } else {
                        if(foundProduct.author.id.equals(req.user.id)){
                            next();
                        } else {
                            req.flash("error", "Permission denied.");
                            return res.redirect("back");
                        }
                    }
                });
            } else {
                req.flash("error", "You need to be logged in.");
                return res.redirect("back");
            }
        },
    checkCommentOwner: function (req, res, next){
            if(req.isAuthenticated()){
                    Comment.findById(req.params.comment_id, function(err, foundComment){
                    if(err || !foundComment){
                        req.flash("error", "Comment not found.");
                        res.redirect("back");
                    } else {
                        if(foundComment.author.id.equals(req.user.id)){
                            next();
                        } else {
                            req.flash("error", "Permission denied.");
                            return res.redirect("back");
                        }
                    }
                });
            } else {
                req.flash("error", "You need to be logged in.");
                return res.redirect("back");
            }
        },
    isLoggedIn: function (req, res, next){
            if(req.isAuthenticated()){
                return next();
            }
            req.flash("error", "You need to be logged in.");
            res.redirect("/login");
        },
    escapeRegex: function(text){
            return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
        }
    };