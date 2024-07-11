import mongoose from 'mongoose';
import Review from './review.js';

// Define the Recipe schema
const recipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 100
  },
  ingredients: [{
    ingredient: {
      type: String,
      required: true,
      trim: true
    },
    quantity: {
      type: Number,
      required: true,
      min: 0.1
    }
  }],
  directions: {
    type: [String],
    required: true,
    validate: {
      validator: function (value) {
        return value.length > 0;
      },
      message: 'At least one direction is required.'
    }
  },
  image: {
    type: String,
    required: false,
    trim: true
  },
  prep_time: {
    type: Number, // Time in minutes
    required: false
  },
  cook_time: {
    type: Number, // Time in minutes
    required: false
  },
  servings: {
    type: Number,
    required: false,
    min: 1
  },
  nutrition: {
    calories: { type: Number, required: false },
    fat: { type: Number, required: false },
    protein: { type: Number, required: false },
    carbs: { type: Number, required: false }
  },
  tags: {
    type: [String],
    required: false
  },
  difficulty: {
    type: String,
    required: false,
    enum: ['Easy', 'Medium', 'Hard']
  },
  created_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  reviews: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Review"
  }]
}, { timestamps: true });

// Middleware to delete associated reviews when a recipe is deleted
recipeSchema.post("findOneAndDelete", async function (doc) {
  if (doc && doc.reviews && doc.reviews.length > 0) {
    await Review.deleteMany({
      _id: { $in: doc.reviews }
    });
  }
});

// Create the Recipe model
const Recipe = mongoose.model('Recipe', recipeSchema);

export default Recipe;
