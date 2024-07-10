import express from 'express';
import { logged_in, login, logout_user, register_user } from '../controllers/user.js';
import catchAsync from '../utils/catchAsync.js';
import { isLoggedIn } from '../middleware.js';

const router = express.Router();

// Register route
router.route('/register')
    .post(catchAsync(register_user));

// Login route with custom authentication handling
router.route('/login')
    .post(login);

router.route("/logout")
    .post(isLoggedIn, logout_user);

router.route("/loggedIn")
    .get(logged_in);
export default router;
