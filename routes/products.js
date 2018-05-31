var express = require("express");
var router = express.Router();
var Product = require("../models/product");
var middleware = require("../middleware");

router.get("/", function(req, res){
    var perPage = 8;
    var pageQuery = parseInt(req.query.page);
    var pageNumber = pageQuery ? pageQuery : 1;
    //eval(require('locus'));
    if(req.query.search){
        const regex = new RegExp(middleware.escapeRegex(req.query.search), "gi");
        Product.find({name: regex}).skip((perPage * pageNumber) - perPage).limit(perPage).exec(function(err, allProducts){
            Product.count({name: regex}).exec(function(err, count){
                if(err){
                    console.log(err);
                } else {
                    var error;
                    if(allProducts.length < 1){
                        error= "No products match that query, please try again.";
                    }
                    res.render("products/index", {
                        products: allProducts,
                        page: "products",
                        error: error,
                        current: pageNumber,
                        pages: Math.ceil(count / perPage),
                        search: req.query.search,
                        cat: false
                    });
                }
            });
        });
    } else if(req.query.cat){
        const regex = new RegExp(middleware.escapeRegex(req.query.cat), "gi");
        Product.find({category: regex}).skip((perPage * pageNumber) - perPage).limit(perPage).exec(function(err, allProducts){
            Product.count({category: regex}).exec(function(err, count){
                if(err){
                    console.log(err);
                } else {
                    var error;
                    if(allProducts.length < 1){
                        error= "No products match that query, please try again.";
                    }
                    res.render("products/index", {
                        products: allProducts,
                        page: "products",
                        error: error,
                        current: pageNumber,
                        pages: Math.ceil(count / perPage),
                        search: false,
                        cat: req.query.cat
                    });
                }
            });
        });
    } else {
        Product.find({}).skip((perPage * pageNumber) - perPage).limit(perPage).exec(function(err, allProducts){
            Product.count().exec(function(err, count){
                if(err){
                    console.log(err);
                } else {
                    res.render("products/index", {
                        products: allProducts,
                        page: "products",
                        current: pageNumber,
                        pages: Math.ceil(count / perPage),
                        search: false,
                        cat: false
                    });
                }
            });
        });
    }
});

router.post("/", middleware.isLoggedIn, function(req, res){
    var newProduct = {
        name: req.body.name,
        price: req.body.price,
        image: req.body.image, 
        description: req.body.desc,
        author: {
            id: req.user.id,
            username: req.user.username
        }
    };
    Product.create(newProduct, function(err, product){
        if(err){
            console.log(err);
        } else {
            res.redirect("/products");
        }
    });
});

router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("products/new");
});

router.get("/:id", function(req, res){
    Product.findById(req.params.id).populate("comments").exec(function(err, foundProduct){
        if (err || !foundProduct){
            req.flash("error", "Product not found.");
            res.redirect("/products");
        } else {
            res.render("products/show", {prod: foundProduct});
        }
    });
});

router.get("/:id/edit", middleware.checkProductOwner, function(req, res){
    Product.findById(req.params.id, function(err, foundProduct){
        res.render("products/edit", {prod: foundProduct});
    });
});

router.put("/:id", middleware.checkProductOwner, function(req, res){
    Product.findByIdAndUpdate(req.params.id, req.body.product, function(err, updatedProduct){
        if(err){
            res.redirect("/products");
        } else {
            res.redirect("/products/" + req.params.id);
        }
    });
});

router.delete("/:id", middleware.checkProductOwner, function(req, res){
    Product.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/products");
        } else {
            res.redirect("/products");
        }
    });
});

module.exports = router;