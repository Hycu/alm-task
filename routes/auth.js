var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");

router.get("/", function(req, res){
    res.render("home");
});

router.get("/register", function(req, res){
    res.render("register", {page: "register"});
});

router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            return res.render("register", {error: err.message + "."});
        }
        passport.authenticate("local")(req, res, function(){
            req.flash("success", "Welcome to MyShop " + user.username + ".");
            res.redirect("/products");
        });
    });
});

router.get("/login", function(req, res){
    res.render("login", {page: "login"});
});

router.post("/login", function(req, res){
    passport.authenticate("local", function (err, user){
        if(!err && user){
            req.flash("success", "Welcome back " + user.username + ".");
            passport.authenticate("local", {
                successRedirect: "/products"
            })(req, res, function(){
            });
        } else {
            req.flash("error", "Incorrect username or password.");
            res.redirect("/login");
        }
    })(req, res);
});

router.get("/logout", function(req, res){
    req.logout();
    req.flash("success", "You have been logged out.");
    res.redirect("/products");
});

router.get("*", function(req, res){
    req.flash("error", "Page not found.");
    res.redirect("/products");
});

module.exports = router;