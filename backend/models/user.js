import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

// Define the user schema
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Email is required"],
        trim: true,
        match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
        minlength: [5, "Email must be at least 5 characters long"],
        maxlength: [255, "Email must be at most 255 characters long"]
    }
});

// Apply the passport-local-mongoose plugin to the user schema
userSchema.plugin(passportLocalMongoose);

// Create the User model
const User = mongoose.model("User", userSchema);

export default User;
