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
            req.flash("success", "Welcome to MyshOp " + user.username);
            res.redirect("/products");
        });
    });
});

router.get("/login", function(req, res){
    res.render("login", {page: "login"});
});

router.post("/login", passport.authenticate("local", {
    successRedirect: "/products",
    failureRedirect: "/login"
}), function(req, res){
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