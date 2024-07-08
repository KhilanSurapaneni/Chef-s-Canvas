import React from 'react';
import RecipeTags from '../RecipeList/RecipeTags';
import RecipeTitle from './Details/RecipeTitle';
import RecipeImage from './Details/RecipeImage';
import RecipeSection from './Details/RecipeSection';

const RecipeDetails = ({ recipe }) => {
  return (
    <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-md">
      <RecipeTitle title={recipe.title} />
      <RecipeImage image={recipe.image} title={recipe.title} />
      <div className="w-full lg:w-3/4 bg-white rounded-lg p-6 shadow-md">
        <RecipeSection title="Ingredients">
          <ul className="list-disc list-inside mb-6 text-lg">
            {recipe.ingredients.map((ingredient) => (
              <li key={ingredient._id}>
                {ingredient.quantity}g {ingredient.ingredient}
              </li>
            ))}
          </ul>
        </RecipeSection>
        <RecipeSection title="Directions">
          <ol className="list-decimal list-inside mb-6 text-lg">
            {recipe.directions.map((direction, index) => (
              <li key={index} className="mb-2">
                {direction}
              </li>
            ))}
          </ol>
        </RecipeSection>
        <RecipeSection title="Nutrition">
          <p className="text-lg">Calories: {recipe.nutrition.calories}</p>
          <p className="text-lg">Fat: {recipe.nutrition.fat}g</p>
          <p className="text-lg">Protein: {recipe.nutrition.protein}g</p>
          <p className="text-lg">Carbs: {recipe.nutrition.carbs}g</p>
        </RecipeSection>
        <RecipeSection title="Details">
          <p className="text-lg">Prep Time: {recipe.prep_time} mins</p>
          <p className="text-lg">Cook Time: {recipe.cook_time} mins</p>
          <p className="text-lg">Servings: {recipe.servings}</p>
          <p className="text-lg">Difficulty: {recipe.difficulty}</p>
        </RecipeSection>
        <RecipeSection title="Tags">
          <RecipeTags tags={recipe.tags} />
        </RecipeSection>
      </div>
    </div>
  );
};

export default RecipeDetails;
