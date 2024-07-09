import express from 'express';
import { register_user } from '../controllers/user.js';
import passport from 'passport';
import catchAsync from '../utils/catchAsync.js';

const router = express.Router();

// Register route
router.route('/register')
    .post(catchAsync(register_user));

// Login route with custom authentication handling
router.route('/login')
    .post((req, res, next) => {
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
    });

export default router;
