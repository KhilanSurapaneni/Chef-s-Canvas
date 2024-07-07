//.env file setup
if(process.env.NODE_ENV !== "production"){
  require("dotenv").config();
}

//express setup
const express = require('express')
const app = express();



//MongoDB and Mongoose Setup
const mongoose = require('mongoose');
// const uri = process.env.ATLAS_URI;
const uri = process.env.LOCAL_URI;

mongoose.connect(uri)
    .then(() => {
        console.log("CONNECTED TO MONGO!!!");
    })
    .catch(err => {
        console.log("ERROR CONNECTING TO MONGO!!!");
        console.log(err);
    });


//Requiring Path for EJS and Other Libraries Potentially
const path = require("path");

// EJS setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
const ejsMate = require("ejs-mate");
app.engine("ejs", ejsMate);

//allowing you to serve static files
app.use(express.static(path.join(__dirname, 'public')));

//Requiring Method Override to do delete and patch requests on EJS
const methodOverride = require('method-override');
app.use(methodOverride('_method'))


// Express Middleware to Parse Requests, using URL instead of JSON
app.use(express.urlencoded({ extended: true }));


//Routes

//Home Route
app.get("/", async(req,res) => {
  res.render("landing");
})

//Recipe Routes
const recipe_routes = require("./routes/recipe");
app.use("/recipes", recipe_routes);




//404 Error Routes
const ExpressError = require("./utils/expressError");
app.all("*", (req, res, next) => {
    return next(new ExpressError("Page not Found", 404))
})

app.use((err, req, res, next) => {
    const { status = 500 } = err;
    if (!err.message) {
        err.message = "There was an Error"
    }
    else if (!err.status) {
        err.status = 500;
    }
    res.status(status).render("error", { err });
});


const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server is running on: http://localhost:${port}/`);
});