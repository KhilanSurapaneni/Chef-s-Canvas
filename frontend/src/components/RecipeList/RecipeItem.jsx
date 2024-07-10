import React from 'react';
import { Link } from 'react-router-dom';
import RecipeTags from './RecipeTags';

const RecipeItem = ({ recipe }) => {
  return (
    <Link to={`/recipes/${recipe._id}`} className="transform hover:scale-105 transition-transform duration-300">
      <div className="p-4 border rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow duration-300">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-48 object-cover rounded-lg"
        />
        <div className="mt-4">
          <h2 className="text-2xl font-semibold text-gray-800">{recipe.title}</h2>
          <div className="mt-2 text-gray-600">
            <p>Prep Time: {recipe.prep_time} mins</p>
            <p>Cook Time: {recipe.cook_time} mins</p>
            <p>Servings: {recipe.servings}</p>
            <p>Difficulty: {recipe.difficulty}</p>
            <p>Calories: {recipe.nutrition.calories}</p>
          </div>
          <RecipeTags tags={recipe.tags} />
        </div>
        <footer className="mt-4 text-sm text-center text-indigo-600 font-medium border-t pt-2">
          Created by: {recipe.created_by?.username}
        </footer>
      </div>
    </Link>
  );
};

export default RecipeItem;
