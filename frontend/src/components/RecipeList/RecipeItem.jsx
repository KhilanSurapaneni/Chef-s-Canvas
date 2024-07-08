import React from 'react';
import { Link } from 'react-router-dom';
import RecipeTags from './RecipeTags';

const RecipeItem = ({ recipe }) => {
  return (
    <Link to={`/recipes/${recipe._id}`}>
      <div className="p-4 border rounded shadow-md">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-48 object-cover rounded"
        />
        <h2 className="text-xl font-semibold mt-2">{recipe.title}</h2>
        <p className="text-gray-600">Prep Time: {recipe.prep_time} mins</p>
        <p className="text-gray-600">Cook Time: {recipe.cook_time} mins</p>
        <p className="text-gray-600">Servings: {recipe.servings}</p>
        <p className="text-gray-600">Difficulty: {recipe.difficulty}</p>
        <p className="text-gray-600">Calories: {recipe.nutrition.calories}</p>
        <RecipeTags tags={recipe.tags} />
      </div>
    </Link>
  );
};

export default RecipeItem;
