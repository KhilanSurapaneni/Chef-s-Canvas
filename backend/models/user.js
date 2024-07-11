import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

// Define the user schema
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Email is required"], // Email is required
        trim: true, // Trims whitespace from the input
        match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"], // Regex for validating email format
        minlength: [5, "Email must be at least 5 characters long"], // Minimum length for email
        maxlength: [255, "Email must be at most 255 characters long"] // Maximum length for email
    }
}, { timestamps: true }); // Adds createdAt and updatedAt fields

// Apply the passport-local-mongoose plugin to the user schema
userSchema.plugin(passportLocalMongoose); // Adds username, hash, and salt fields, and provides authentication methods

// Create the User model
const User = mongoose.model("User", userSchema); // Creates the User model from the schema

export default User; // Exports the User model
