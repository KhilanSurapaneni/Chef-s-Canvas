import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Recipe from '../models/recipe.js';
import Review from '../models/review.js';
import { recipes, reviews } from './data.js';

// Configure dotenv
dotenv.config();

/**
 * Function to copy an object within an array and add it to the array.
 * @param {Array} array - The array containing the object to be copied.
 * @param {Number} index - The index of the object to be copied.
 * @param {Number} times - The number of times to copy the object.
 * @returns {Array} - The updated array with the object copied and added.
 */
function copyObjectInArray(array, times) {
    if (times < 1) {
        return array; // Return the original array if times is less than 1
    }

    const objectToCopy = array.slice();
    for (let i = 0; i < times - 1; i++) {
        array.push(...objectToCopy);
    }

    return array;
}

// Connect to MongoDB and seed the database
async function seedDB() {
    try {
        if (!process.env.LOCAL_URI) {
            throw new Error('LOCAL_URI is not defined in environment variables');
        }

        let recipe_data = copyObjectInArray([...recipes], 30);
        
        await mongoose.connect(process.env.LOCAL_URI);

        // Remove existing recipes and reviews
        await Recipe.deleteMany({});
        await Review.deleteMany({});

        // Insert sample recipes
        const insertedRecipes = await Recipe.insertMany(recipe_data);

        // Create and insert reviews for each recipe
        for (let recipe of insertedRecipes) {
            const reviewPromises = reviews.map(review => {
                const reviewCopies = copyObjectInArray([review], 15);
                return reviewCopies.map(async reviewCopy => {
                    const newReview = new Review({ ...reviewCopy, recipe: recipe._id });
                    await newReview.save();
                    return newReview._id;
                });
            }).flat();
            
            const reviewIds = await Promise.all(reviewPromises);
            recipe.reviews = reviewIds;
            await recipe.save();
        }

        console.log('Database seeded successfully!');
    } catch (error) {
        console.error('Error seeding the database:', error);
    } finally {
        mongoose.connection.close();
    }
}

seedDB();
