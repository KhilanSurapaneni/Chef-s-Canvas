import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../components/Spinner';

const Recipe = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [recipe, setRecipe] = useState({
    nutrition: {},
    ingredients: [],
    directions: [],
    tags: [],
  });

  const backend_url = 'http://localhost:3000'; // Backend URL

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(`${backend_url}/recipes/${id}`);
        setRecipe(response.data);
      } catch (error) {
        console.error('Error fetching recipes:', error);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [id]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="container mx-auto p-6 bg-gray-100 min-h-screen">
      <button
        onClick={() => navigate('/recipes')}
        className="mb-6 px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition duration-300"
      >
        Back to Recipes
      </button>
      <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-4xl font-bold mb-6">{recipe.title}</h1>
        <img src={recipe.image} alt={recipe.title} className="w-full h-64 object-cover rounded-lg mb-6" />
        <div className="w-full lg:w-3/4 bg-white rounded-lg p-6 shadow-md">
          <h2 className="text-3xl font-semibold mb-4">Ingredients</h2>
          <ul className="list-disc list-inside mb-6 text-lg">
            {recipe.ingredients.map((ingredient) => (
              <li key={ingredient._id}>
                {ingredient.quantity}g {ingredient.ingredient}
              </li>
            ))}
          </ul>
          <h2 className="text-3xl font-semibold mb-4">Directions</h2>
          <ol className="list-decimal list-inside mb-6 text-lg">
            {recipe.directions.map((direction, index) => (
              <li key={index} className="mb-2">
                {direction}
              </li>
            ))}
          </ol>
          <div className="mb-6">
            <h2 className="text-3xl font-semibold mb-4">Nutrition</h2>
            <p className="text-lg">Calories: {recipe.nutrition.calories}</p>
            <p className="text-lg">Fat: {recipe.nutrition.fat}g</p>
            <p className="text-lg">Protein: {recipe.nutrition.protein}g</p>
            <p className="text-lg">Carbs: {recipe.nutrition.carbs}g</p>
          </div>
          <div className="mb-6">
            <h2 className="text-3xl font-semibold mb-4">Details</h2>
            <p className="text-lg">Prep Time: {recipe.prep_time} mins</p>
            <p className="text-lg">Cook Time: {recipe.cook_time} mins</p>
            <p className="text-lg">Servings: {recipe.servings}</p>
            <p className="text-lg">Difficulty: {recipe.difficulty}</p>
          </div>
          <div>
            <h2 className="text-3xl font-semibold mb-4">Tags</h2>
            <div className="flex flex-wrap">
              {recipe.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-blue-200 text-blue-800 text-sm font-semibold mr-2 px-3 py-1 rounded-full mb-2"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between mt-6 space-x-4">
        <button
          onClick={async () => {
            await axios.delete(`${backend_url}/recipes/${id}`);
            navigate('/recipes');
          }}
          className="px-6 py-3 bg-red-600 text-white rounded-lg shadow hover:bg-red-700 transition duration-300"
        >
          Delete
        </button>
        <button
          onClick={() => {
            navigate(`/recipes/${id}/edit`);
          }}
          className="px-6 py-3 bg-yellow-600 text-white rounded-lg shadow hover:bg-yellow-700 transition duration-300"
        >
          Edit
        </button>
      </div>
    </div>
  );
};

export default Recipe;
