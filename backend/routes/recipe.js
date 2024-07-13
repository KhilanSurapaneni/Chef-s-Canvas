import express from 'express';
import catchAsync from '../utils/catchAsync.js';
import { all_recipes, add_recipe, find_recipe, update_recipe, delete_recipe, is_author, search } from '../controllers/recipe.js';
import { isAuthor, isLoggedIn } from '../middleware.js'; // Ensure correct path to middleware

const router = express.Router();

// Get all recipes and add a new recipe
router.route("/")
  .get(catchAsync(all_recipes))
  .post(isLoggedIn, catchAsync(add_recipe)); // Protect add recipe route

router.route("/search")
  .get(catchAsync(search));

// Get, update, or delete a specific recipe by ID
router.route("/:id")
  .get(catchAsync(find_recipe))
  .put(isLoggedIn, isAuthor, catchAsync(update_recipe)) // Protect update recipe route
  .delete(isLoggedIn, isAuthor, catchAsync(delete_recipe)); // Protect delete recipe route

router.route("/:id/isAuthor")
  .get(isLoggedIn, catchAsync(is_author));

export default router;
