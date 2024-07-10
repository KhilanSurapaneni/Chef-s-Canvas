import dotenv from 'dotenv';

// Configure dotenv to load environment variables from a .env file into process.env
dotenv.config();

import express from "express"; // Import Express library
import cors from "cors"; // Import CORS library to allow cross-origin requests
import mongoose from 'mongoose'; // Import Mongoose library
import session from 'express-session'; // Import express-session for handling sessions
import passport from 'passport'; // Import Passport for authentication
import LocalStrategy from "passport-local"; // Import Passport's Local Strategy
import recipe_routes from "./routes/recipe.js"; // Import routes for recipe-related operations
import user_routes from "./routes/user.js"; // Import routes for user-related operations
import ExpressError from "./utils/expressError.js"; // Import custom error handling class
import User from "./models/user.js"; // Import User model

// Initialize Express application
const app = express();

// Get the port number from environment variables
const port = process.env.PORT;

// Enable CORS for all routes to allow the backend server to be used as an API
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

// MongoDB and Mongoose Setup
const uri = process.env.LOCAL_URI; // Get the MongoDB URI from environment variables

// Connect to MongoDB using Mongoose
mongoose.connect(uri)
    .then(() => {
        console.log("CONNECTED TO MONGO!!!"); // Log success message on successful connection
    })
    .catch(err => {
        console.log("ERROR CONNECTING TO MONGO!!!"); // Log error message on failed connection
        console.log(err); // Log the error details
    });

// Express Session Setup
const sessionConfig = {
    secret: "secret", // Secret key to sign the session ID cookie
    resave: false, // Do not save session if unmodified
    saveUninitialized: false, // Save uninitialized sessions
    cookie: {
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7, // Set cookie expiration to one week
        maxAge: 1000 * 60 * 60 * 24 * 7, // Set cookie max age to one week
        httpOnly: true // Ensure cookie is only accessible through the HTTP protocol
    }
};
app.use(session(sessionConfig)); // Use the session middleware with the configuration

// Initialize Passport for authentication
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate())); // Use local strategy for authentication

// Serialize user information into the session
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Middleware to parse JSON requests
app.use(express.json());

// Recipe Routes
app.use("/recipes", recipe_routes);
// User Routes
app.use("/", user_routes);

// 404 Error Routes - Handle undefined routes
app.all("*", (req, res, next) => {
    return next(new ExpressError("Page not Found", 404));
});

// Global Error Handling Middleware
app.use((err, req, res, next) => {
    const { status = 500 } = err; // Default status to 500 if not specified
    if (!err.message) {
        err.message = "There was an Error"; // Default error message if not specified
    }
    res.status(status).send(err); // Send error response with status and message
});

// Start the server and listen on the specified port
app.listen(port, () => {
    console.log(`Server is running on: http://localhost:${port}`);
});
