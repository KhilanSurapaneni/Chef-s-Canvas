import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Recipe from '../models/recipe.js';
import recipes from './data.js';

// Configure dotenv
dotenv.config();

// Connect to MongoDB and seed the database
async function seedDB() {
  try {
    if (!process.env.LOCAL_URI) {
      throw new Error('LOCAL_URI is not defined in environment variables');
    }
    
    await mongoose.connect(process.env.LOCAL_URI);

    // Remove existing recipes
    await Recipe.deleteMany({});

    // Insert sample recipes
    await Recipe.insertMany(recipes);

    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding the database:', error);
  } finally {
    mongoose.connection.close();
  }
}

seedDB();
