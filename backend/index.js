import dotenv from 'dotenv';

// Configure dotenv
dotenv.config();

import express from "express";
import recipe_routes from "./routes/recipe.js";
import ExpressError from "./utils/expressError.js";

const app = express();

const port = process.env.PORT;

//this allows use to use the backend server as an API
import cors from "cors";
app.use(cors());
// app.use(cors({
//     origin: `http://localhost:${port}`,
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type'],
// }))

//MongoDB and Mongoose Setup
import mongoose from 'mongoose';
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


// Middleware to parse JSON requests
app.use(express.json());

// Home Route
app.get("/", async (req, res) => {
    res.send("Welcome to Chef's Canvas")
});

// Recipe Routes
app.use("/recipes", recipe_routes);

// 404 Error Routes
app.all("*", (req, res, next) => {
    return next(new ExpressError("Page not Found", 404));
});

app.use((err, req, res, next) => {
    const { status = 500 } = err;
    if (!err.message) {
        err.message = "There was an Error";
    } else if (!err.status) {
        err.status = 500;
    }
    res.status(status).send(err);
});


app.listen(port, () => {
    console.log(`Server is running on: http://localhost:${port}`);
});
