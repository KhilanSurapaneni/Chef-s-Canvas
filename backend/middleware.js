import Recipe from "./models/recipe.js"; // Importing the Recipe model
import Review from "./models/review.js" // Importing the Review Model

export const isLoggedIn = (req, res, next) => {
    // If the user is not authenticated, send a 401 status with a message
    if (!req.isAuthenticated()) {
        return res.status(401).send({ message: 'You need to be logged in to access this resource' });
    }
    // If the user is authenticated, proceed to the next middleware or route handler
    next();
};


export const isAuthor = async (req, res, next) => {
    const { id } = req.params; // Extracting the recipe ID from the request parameters
    try {
        // Find the recipe by ID
        const recipe = await Recipe.findById(id);
        
        // If the recipe is not found, send a 404 status with a message
        if (!recipe) {
            return res.status(404).send({ message: 'Recipe not found' });
        }
        
        // If the user is not the author of the recipe, send a 401 status with a message
        if (!recipe.created_by.equals(req.user._id)) {
            return res.status(401).send({ message: 'You do not have permission to edit or delete this recipe' });
        }
        
        // If the user is the author, proceed to the next middleware or route handler
        next();
    } catch (error) {
        // If there is an error, send a 500 status with a message
        return res.status(500).send({ message: 'Internal Server Error' });
    }
};

export const isReviewAuthor = async (req, res, next) => {
    const { reviewID } = req.params; // Extracting the review ID from the request parameters
    try {
        // Find the review by ID
        const review = await Review.findById(reviewID);
        
        // If the review is not found, send a 404 status with a message
        if (!review) {
            return res.status(404).send({ message: 'Review not found' });
        }
        
        // If the user is not the author of the review, send a 401 status with a message
        if (!review.created_by.equals(req.user._id)) {
            return res.status(401).send({ message: 'You do not have permission to edit or delete this review' });
        }
        
        // If the user is the author, proceed to the next middleware or route handler
        next();
    } catch (error) {
        // If there is an error, send a 500 status with a message
        return res.status(500).send({ message: 'Internal Server Error' });
    }
};
