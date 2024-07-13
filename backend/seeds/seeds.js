import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Recipe from '../models/recipe.js';
import Review from '../models/review.js';
import User from '../models/user.js';
import { faker } from '@faker-js/faker';
import { foodDishes, ingredients, recipeTags } from './data.js';

// Configure dotenv
dotenv.config();

// Function to create fake users
async function createUsers(num) {
    const users = [];
    for (let i = 0; i < num; i++) {
        const user = new User({
            username: faker.internet.userName(),
            email: faker.internet.email(),
        });
        await user.setPassword(faker.internet.password()); // Using Passport.js method to set password
        await user.save();
        users.push(user);
    }

    const khilan = new User({
        username: "Khilan",
        email: "khilans@gmail.com"
    });
    await khilan.setPassword("Khilan123");
    await khilan.save();
    users.push(khilan);

    return users;
}

// Function to create fake recipes
function createFakeRecipes(users, num) {
    const fakeRecipes = [];
    for (let i = 0; i < num; i++) {
        const recipe = {
            title: faker.helpers.arrayElement(foodDishes),
            ingredients: Array.from({ length: faker.number.int({ min: 3, max: 15 }) }, () => ({
                ingredient: faker.helpers.arrayElement(ingredients),
                quantity: faker.number.int({ min: 1, max: 300 }),
            })),
            directions: Array.from({ length: faker.number.int({ min: 3, max: 10 }) }, () => faker.lorem.sentence()),
            image: faker.image.urlLoremFlickr({ category: 'food' }),
            prep_time: faker.number.int({ min: 5, max: 60 }),
            cook_time: faker.number.int({ min: 10, max: 100 }),
            servings: faker.number.int({ min: 1, max: 8 }),
            nutrition: {
                calories: faker.number.int({ min: 100, max: 1000 }),
                fat: faker.number.int({ min: 3, max: 40 }),
                protein: faker.number.int({ min: 3, max: 60 }),
                carbs: faker.number.int({ min: 3, max: 100 }),
            },
            tags: Array.from({ length: faker.number.int({ min: 1, max: 3 }) }, () => faker.helpers.arrayElement(recipeTags)),
            difficulty: faker.helpers.arrayElement(['Easy', 'Medium', 'Hard']),
            created_by: faker.helpers.arrayElement(users)._id,
        };
        fakeRecipes.push(recipe);
    }
    return fakeRecipes;
}

// Function to create fake reviews
function createFakeReviews(recipes, users, num) {
    const fakeReviews = [];
    for (let i = 0; i < num; i++) {
        const review = {
            rating: faker.number.int({ max: 5, min: 1 }),
            comment: faker.lorem.sentence(),
            created_by: faker.helpers.arrayElement(users)._id,
            recipe: faker.helpers.arrayElement(recipes)._id,
        };
        fakeReviews.push(review);
    }
    return fakeReviews;
}

// Connect to MongoDB and seed the database
async function seedDB() {
    try {
        if (!process.env.LOCAL_URI) {
            throw new Error('LOCAL_URI is not defined in environment variables');
        }

        await mongoose.connect(process.env.LOCAL_URI);

        // Remove existing data
        await User.deleteMany({});
        await Recipe.deleteMany({});
        await Review.deleteMany({});

        // Create sample users
        const users = await createUsers(10);

        // Create sample recipes
        const recipeData = createFakeRecipes(users, 50);
        const insertedRecipes = await Recipe.insertMany(recipeData);

        // Create and insert reviews for each recipe
        const reviewData = createFakeReviews(insertedRecipes, users, 200);
        const insertedReviews = await Review.insertMany(reviewData);

        // Update recipes with reviews
        for (const review of insertedReviews) {
            await Recipe.findByIdAndUpdate(review.recipe, { $push: { reviews: review._id } });
        }

        console.log('Database seeded successfully!');
    } catch (error) {
        console.error('Error seeding the database:', error);
    } finally {
        mongoose.connection.close();
    }
}

seedDB();
