import Review from "../models/review.js";
import ExpressError from "../utils/expressError.js";
import Recipe from "../models/recipe.js";

// Function to create a review for a recipe
export const create_review = async (req, res) => {
    const { id } = req.params; // Get the recipe ID from the request parameters
    const recipe = await Recipe.findById(id); // Find the recipe by ID

    // If the recipe is not found, throw an error
    if (!recipe) {
        throw new ExpressError('Recipe not found', 404);
    }

    // Create a new review instance with the data from the request body
    const review = new Review(req.body.review);
    review.created_by = req.user._id; // Set the review's creator to the currently logged-in user
    review.recipe = recipe._id; // Set the recipe reference in the review

    // Add the review's ID to the recipe's reviews array
    recipe.reviews.push(review._id);

    // Save the review and update the recipe in the database
    await review.save();
    await recipe.save();

    // Send the created review as the response
    res.status(200).send(review);
};


export const delete_review = async (req, res) => {
    const { id, reviewID } = req.params;

    // Find and delete the review
    const deletedReview = await Review.findByIdAndDelete(reviewID);

    // If the review is not found, throw an error
    if (!deletedReview) {
        throw new ExpressError('Review not found', 404);
    }

    // Find and update the recipe to remove the reference to the deleted review
    const updatedRecipe = await Recipe.findByIdAndUpdate(id, { $pull: { reviews: reviewID } }, { new: true });

    // If the recipe is not found, throw an error
    if (!updatedRecipe) {
        throw new ExpressError('Recipe not found', 404);
    }

    // Send the response
    res.status(200).send({ message: 'Review deleted successfully', review: deletedReview, recipe: updatedRecipe });
};

// Function to update a review for a recipe
export const update_review = async (req, res) => {
    const { reviewID } = req.params; // Get the recipe ID and review ID from the request parameters

    // Find and update the review with the new data from the request body
    const updatedReview = await Review.findByIdAndUpdate(reviewID, req.body.review, { new: true });

    // If the review is not found, throw an error
    if (!updatedReview) {
        throw new ExpressError('Review not found', 404);
    }

    // Send the updated review as the response
    res.status(200).send({ message: 'Review updated successfully', review: updatedReview });
};

// Function to check if the current user is the author of a review
export const is_author = async (req, res) => {
    const { reviewID } = req.params;
    try {
        const review = await Review.findById(reviewID);
        if (!review) {
            return res.status(404).send({ isAuthor: false }); // Review not found
        }
        if (req.user && review.created_by.equals(req.user._id)) {
            return res.status(200).send({ isAuthor: true }); // User is the author
        } else {
            return res.status(200).send({ isAuthor: false }); // User is not the author
        }
    } catch (error) {
        return res.status(500).send({ isAuthor: false }); // Server error
    }
}