import User from "../models/user.js";
import passport from "passport";

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

export const login_user = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return next(err); // Pass error to the next middleware
        }
        if (!user) {
            // Authentication failed, send a 401 response
            return res.status(401).send({ message: 'Invalid username or password' });
        }
        // Log in the user
        req.logIn(user, (err) => {
            if (err) {
                return next(err); // Pass error to the next middleware
            }
            // Authentication and login successful, send a 200 response with user data
            return res.status(200).send({ message: 'Login successful', user });
        });
    })(req, res, next); // Invoke the function returned by passport.authenticate with req, res, next
}

export const logged_in = (req, res) => {
    return res.send({logged_in: req.isAuthenticated()});
}