const mongoose = require('mongoose');
const Recipe = require('../models/recipe');
const recipes = require("./data");

if(process.env.NODE_ENV !== "production"){
    require("dotenv").config();
}


// Connect to MongoDB and seed the database
async function seedDB() {
  try {
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
