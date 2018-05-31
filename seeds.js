var mongoose = require("mongoose");
var Product = require("./models/product");
var faker = require('faker');
var User = require("./models/user");
var Comment = require("./models/comment");




module.exports = {
        seedDB: function(){
        mongoose.connect("mongodb://localhost/myshop");
        mongoose.connection.collections["products"].drop();
        mongoose.connection.collections["users"].drop();
        mongoose.connection.collections["comments"].drop();
        User.create({
            username: faker.internet.userName(),
            password: faker.internet.password()
        }, function(err, user){
            for(var i=0; i<60;i++){
                var cat = "Casual";
                var img = "https://images.unsplash.com/photo-1484704849700-f032a568e944?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=04c4af64629678d376f21fd9bd05229f&auto=format&fit=crop&w=1050&q=80";
                if(i > 19){
                    cat = "Office";
                    img = "https://images.unsplash.com/3/www.madebyvadim.com.jpg?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=0d00b2e84a1695cf3c46c8eda5548195&auto=format&fit=crop&w=1060&q=80";
                }
                if(i > 39){
                    cat = "Outdoor";
                    img = "https://images.unsplash.com/photo-1485965120184-e220f721d03e?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=51a9aa4dd828bf5d50fcd8154dc405b8&auto=format&fit=crop&w=1050&q=80";
                }
                var seed = {
                    name: faker.commerce.productName(),
                    price: faker.commerce.price(),
                    image: img,
                    description: faker.lorem.paragraph(),
                    createdAt: faker.date.past(),
                author: {
                    id: user._id,
                    username: user.username
                },
                infos: [
                    faker.commerce.productMaterial(),
                    faker.commerce.productAdjective(),
                    faker.commerce.color()
                    ],
                category: cat
                }
                Product.create(seed, function(err, product){
                    if(err){
                        console.log(err)
                    } else {
                        Comment.create({
                            text: faker.lorem.paragraph(),
                            createdAt: faker.date.past(),
                            author: {
                                id: user._id,
                                username: user.username
                            }
                            
                        }, function(err, com){
                            if(err){
                                console.log(err);
                            } else {
                                product.comments.push(com);
                                product.save();
                            }
                        });
                    }
                });
            }
        });
    }
}