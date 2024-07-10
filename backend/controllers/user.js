import User from "../models/user.js";

export const register_user = async (req, res) => {
    const { email, username, password } = req.body;  // Extracting email, username, and password from request body
    const user = new User({ email, username });  // Creating a new User instance
    const registeredUser = await User.register(user, password);  // Registering the user
    console.log(registeredUser);
    res.status(201).send(registeredUser);
}

export const logout_user = (req, res, next) => {
    req.logout((err) => {
        if (err) { return next(err); }
        res.status(200).send({ message: 'Logout successful' });
    })
}