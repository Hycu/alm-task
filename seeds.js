var mongoose = require("mongoose");
var Product = require("./models/product");
var faker = require('faker');



module.exports = {
        seedDB: function(){
        mongoose.connect("mongodb://localhost/alm_task");
        mongoose.connection.collections["products"].drop();
        
        for(var i=0; i<20;i++){
            var seed = {
                name: faker.commerce.productName(),
                price: faker.commerce.price(),
                image: "https://images.unsplash.com/photo-1484704849700-f032a568e944?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=04c4af64629678d376f21fd9bd05229f&auto=format&fit=crop&w=1050&q=80",
                description: faker.lorem.paragraph(),
                createdAt: faker.date.past(),
            author: {
                id: "5b0951b687036a2f9f00723f",
                username: "Hycu"
            },
            infos: [
                faker.commerce.productMaterial(),
                faker.commerce.productAdjective(),
                faker.commerce.color()
                ],
            category: "Casual"
            }
            Product.create(seed, function(err, product){
                if(err){
                    console.log(err)
                } else {
                    console.log("added a product");
                }
            });
        }
        
        for(var i=0; i<20;i++){
            var seed = {
                name: faker.commerce.productName(),
                price: faker.commerce.price(),
                image: "https://images.unsplash.com/3/www.madebyvadim.com.jpg?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=0d00b2e84a1695cf3c46c8eda5548195&auto=format&fit=crop&w=1060&q=80",
                description: faker.lorem.paragraph(),
                createdAt: faker.date.past(),
            author: {
                id: "5b0951b687036a2f9f00723f",
                username: "Hycu"
            },
            infos: [
                faker.commerce.productMaterial(),
                faker.commerce.productAdjective(),
                faker.commerce.color()
                ],
            category: "Office"
            }
            Product.create(seed, function(err, product){
                if(err){
                    console.log(err)
                } else {
                    console.log("added a product");
                }
            });
        }
        
        for(var i=0; i<20;i++){
            var seed = {
                name: faker.commerce.productName(),
                price: faker.commerce.price(),
                image: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=51a9aa4dd828bf5d50fcd8154dc405b8&auto=format&fit=crop&w=1050&q=80",
                description: faker.lorem.paragraph(),
                createdAt: faker.date.past(),
            author: {
                id: "5b0951b687036a2f9f00723f",
                username: "Hycu"
            },
            infos: [
                faker.commerce.productMaterial(),
                faker.commerce.productAdjective(),
                faker.commerce.color()
                ],
            category: "Outdoor"
            }
            Product.create(seed, function(err, product){
                if(err){
                    console.log(err)
                } else {
                    console.log("added a product");
                }
            });
        }
    }
}