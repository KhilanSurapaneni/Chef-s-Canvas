const Recipe = require('../models/recipe');

const render_list = async (req,res) => {
    const recipes = await Recipe.find({});
    res.render("recipes/list",{ recipes });
}

const render_view = async (req,res) => {
    const {id} = req.params;
    const recipe = await Recipe.findById(id);
    res.render("recipes/show", {recipe});
}

const delete_recipe = async(req,res) => {
    const {id} = req.params;
    const recipe = await Recipe.findByIdAndDelete(id);
    res.redirect("/recipes");
}

const render_new = async(req,res) => {
    res.render("recipes/new");
}

const add_new = async(req,res) => {
    const recipe = new Recipe(req.body.recipe);
    await recipe.save();
    res.redirect(`recipes/${recipe._id}`);
}

const render_update = async (req,res) => {
    const {id} = req.params;
    const recipe = await Recipe.findById(id);
    res.render("recipes/update", {recipe});
}

const update_recipe = async (req,res) => {
    const {id} = req.params;
    const recipe = await Recipe.findByIdAndUpdate(id, {...req.body.recipe}, { new: true });
    res.redirect(`/recipes/${recipe._id}`);
}


module.exports = {render_list, render_view, delete_recipe, render_new, add_new, render_update, update_recipe};