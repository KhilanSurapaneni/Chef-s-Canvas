import mongoose from 'mongoose';

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
  created_at: {
    type: Date,
    default: Date.now
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
  chef: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
});

const Recipe = mongoose.model('Recipe', recipeSchema);

export default Recipe;
