import React from 'react';
import RecipeTags from '../RecipeList/RecipeTags';
import RecipeTitle from './Details/RecipeTitle';
import RecipeImage from './Details/RecipeImage';
import RecipeSection from './Details/RecipeSection';

const RecipeDetails = ({ recipe }) => {
  return (
    <>
\      
      <div className="p-8 flex flex-col items-center">
        <RecipeImage image={recipe.image} title={recipe.title} />
        <RecipeTitle title={recipe.title} created_by={recipe.created_by.username} />
        <div className="mt-4 w-full lg:w-2/3">
          <RecipeSection title="Ingredients">
            <ul className="list-disc list-inside mb-6 text-md text-gray-700">
              {recipe.ingredients.map((ingredient) => (
                <li key={ingredient._id} className="py-1">
                  <span className="font-medium">{ingredient.quantity}g</span> {ingredient.ingredient}
                </li>
              ))}
            </ul>
          </RecipeSection>
          <RecipeSection title="Directions">
            <ol className="list-decimal list-inside mb-6 text-md text-gray-700">
              {recipe.directions.map((direction, index) => (
                <li key={index} className="mb-2">
                  {direction}
                </li>
              ))}
            </ol>
          </RecipeSection>
          <RecipeSection title="Nutrition">
            <div className="grid grid-cols-2 gap-4 text-md text-gray-700">
              <p><span className="font-medium">Calories:</span> {recipe.nutrition.calories}</p>
              <p><span className="font-medium">Fat:</span> {recipe.nutrition.fat}g</p>
              <p><span className="font-medium">Protein:</span> {recipe.nutrition.protein}g</p>
              <p><span className="font-medium">Carbs:</span> {recipe.nutrition.carbs}g</p>
            </div>
          </RecipeSection>
          <RecipeSection title="Details">
            <div className="grid grid-cols-2 gap-4 text-md text-gray-700">
              <p><span className="font-medium">Prep Time:</span> {recipe.prep_time} mins</p>
              <p><span className="font-medium">Cook Time:</span> {recipe.cook_time} mins</p>
              <p><span className="font-medium">Servings:</span> {recipe.servings}</p>
              <p><span className="font-medium">Difficulty:</span> {recipe.difficulty}</p>
            </div>
          </RecipeSection>
          <RecipeSection title="Tags">
            <RecipeTags tags={recipe.tags} />
          </RecipeSection>
        </div>
      </div>
    </>
  );
};

export default RecipeDetails;
