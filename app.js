var methodOverride = require("method-override"),
    LocalStrategy  = require("passport-local"),
    User           = require("./models/user"),
    flash          = require("connect-flash"),
    bodyParser     = require("body-parser"),
    mongoose       = require("mongoose"),
    passport       = require("passport"),
    express        = require("express"),
    app            = express();

var productRoutes  = require("./routes/products"),
    commentRoutes  = require("./routes/comments"),
    authRoutes     = require("./routes/auth"),
    seed           = require("./seeds");

mongoose.connect("mongodb://localhost/alm_task");
seed.seedDB();
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
app.locals.moment = require("moment");
app.use(require("express-session")({
    secret: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.user = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.use("/products", productRoutes);
app.use("/products/:id/comments", commentRoutes);
app.use(authRoutes);

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("App started.");
});