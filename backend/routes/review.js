import express from 'express';
import catchAsync from '../utils/catchAsync.js';
import { create_review, delete_review, is_author, update_review } from '../controllers/review.js';
import { isLoggedIn, isReviewAuthor } from '../middleware.js';

const router = express.Router({ mergeParams: true }); // Merge params to access :id in routes

router.route("/")
    .post(isLoggedIn, catchAsync(create_review));

router.route("/:reviewID")
    .put(isLoggedIn, isReviewAuthor, catchAsync(update_review))
    .delete(isLoggedIn, isReviewAuthor, catchAsync(delete_review));
router.route("/:reviewID/isAuthor")
    .get(isLoggedIn, catchAsync(is_author))    

export default router;
