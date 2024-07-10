import Recipe from '../models/recipe.js';
import ExpressError from '../utils/expressError.js';

export const all_recipes = async (req, res) => {
    const recipes = await Recipe.find({}).populate("created_by");
    res.status(200).send(recipes);
}

export const find_recipe = async (req, res) => {
    const { id } = req.params;
    const recipe = await Recipe.findById(id).populate("created_by");
    if (!recipe) {
        throw new ExpressError('Recipe not found', 404);
    }
    res.status(200).send(recipe);
}

export const delete_recipe = async (req, res) => {
    const { id } = req.params;
    const deleted_recipe = await Recipe.findByIdAndDelete(id);
    if (!deleted_recipe) {
        throw new ExpressError('Recipe not found', 404);
    }
    res.status(200).send(deleted_recipe);
}

export const add_recipe = async (req, res) => {
    const recipe = new Recipe(req.body.recipe);
    recipe.created_by = req.user._id;
    await recipe.save();
    res.status(201).send(recipe);
}

export const update_recipe = async (req, res) => {
    const { id } = req.params;
    const updated_recipe = await Recipe.findByIdAndUpdate(id, { ...req.body.recipe }, { new: true });
    if (!updated_recipe) {
        throw new ExpressError('Recipe not found', 404);
    }
    res.status(200).send(updated_recipe);
}

export const is_author = async (req,res) => {
    const { id } = req.params;
    try {
        const recipe = await Recipe.findById(id);
        if (!recipe) {
            return res.status(404).json({ isAuthor: false });
        }
        if (req.user && recipe.created_by.equals(req.user._id)) {
            return res.status(200).json({ isAuthor: true });
        } else {
            return res.status(200).json({ isAuthor: false });
        }
    } catch (error) {
        return res.status(500).json({ isAuthor: false });
    }
}