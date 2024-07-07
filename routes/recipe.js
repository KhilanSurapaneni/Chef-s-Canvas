const express = require('express');
const router = express.Router();
const { render_list, render_view, delete_recipe, render_new, add_new, render_update, update_recipe } = require('../controllers/recipe');
const catchAsync = require('../utils/catchAsync');

// Get all recipes
router.route("/")
  .get(catchAsync(render_list))
  .post(catchAsync(add_new));

router.route("/new")
  .get(catchAsync(render_new))

router.route("/:id/edit")
  .get(catchAsync(render_update));

router.route("/:id")
  .get(catchAsync(render_view))
  .put(catchAsync(update_recipe))
  .delete(catchAsync(delete_recipe));

module.exports = router;
