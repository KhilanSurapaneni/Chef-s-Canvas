import Recipe from "./models/recipe.js"
export const isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return res.status(401).json({ message: 'You need to be logged in to access this resource' });
    }
    next();
};

export const isAuthor = async (req, res, next) => {
    const { id } = req.params;
    try {
        const recipe = await Recipe.findById(id);
        if (!recipe) {
            return res.status(404).json({ message: 'Recipe not found' });
        }
        if (req.user && !recipe.created_by.equals(req.user._id)) {
            return res.status(401).json({ message: 'You do not have permission to edit or delete this recipe' });
        }
        next();
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};