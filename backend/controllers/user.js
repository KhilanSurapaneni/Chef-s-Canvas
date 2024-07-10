import User from "../models/user.js";

export const register_user = async (req, res, next) => {
    const { email, username, password } = req.body;  // Extracting email, username, and password from request body
    const user = new User({ email, username });  // Creating a new User instance
    const registeredUser = await User.register(user, password);  // Registering the user
    req.login(registeredUser, err => {
        if (err) { return next(err); }
        res.status(201).send({message: "Succesfully Registered", user: registeredUser});
    })
    
}

export const logout_user = (req, res, next) => {
    req.logout((err) => {
        if (err) { return next(err); }
        req.session.destroy((err) => {
            if (err) { return next(err); }
            res.clearCookie('connect.sid');
            res.status(200).send({ message: 'Logout successful' });
        });
    });
}

export const logged_in = (req, res) => {
    return res.send({logged_in: req.isAuthenticated()});
}