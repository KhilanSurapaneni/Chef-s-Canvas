import express from 'express';
import catchAsync from '../utils/catchAsync.js';
import { all_recipes, add_recipe, find_recipe, update_recipe, delete_recipe } from '../controllers/recipe.js';

const router = express.Router();

// Get all recipes
router.route("/")
  .get(catchAsync(all_recipes))
  .post(catchAsync(add_recipe));

router.route("/:id")
  .get(catchAsync(find_recipe))
  .put(catchAsync(update_recipe))
  .delete(catchAsync(delete_recipe));

export default router;
