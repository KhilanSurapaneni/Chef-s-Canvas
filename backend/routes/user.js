import express from 'express';
import catchAsync from '../utils/catchAsync.js';
import { register_user } from '../controllers/user.js';

const router = express.Router();

router.route("/register")
    .post(catchAsync(register_user));

export default router;