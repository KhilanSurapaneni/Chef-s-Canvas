import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateRecipe = () => {
  const [ingredients, setIngredients] = useState([{ ingredient: '', quantity: '' }]);
  const [directions, setDirections] = useState(['']);
  const [formData, setFormData] = useState({
    title: '',
    image: '',
    prep_time: '',
    cook_time: '',
    servings: '',
    difficulty: 'Easy',
    calories: '',
    fat: '',
    protein: '',
    carbs: '',
    tags: ''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const addIngredient = () => {
    setIngredients([...ingredients, { ingredient: '', quantity: '' }]);
  };

  const removeIngredient = (index) => {
    const newIngredients = ingredients.filter((_, i) => i !== index);
    setIngredients(newIngredients);
  };

  const handleIngredientChange = (index, event) => {
    const { name, value } = event.target;
    const newIngredients = ingredients.map((ingredient, i) =>
      i === index ? { ...ingredient, [name]: value } : ingredient
    );
    setIngredients(newIngredients);
  };

  const addDirection = () => {
    setDirections([...directions, '']);
  };

  const removeDirection = (index) => {
    const newDirections = directions.filter((_, i) => i !== index);
    setDirections(newDirections);
  };

  const handleDirectionChange = (index, event) => {
    const { value } = event.target;
    const newDirections = directions.map((direction, i) =>
      i === index ? value : direction
    );
    setDirections(newDirections);
  };

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const recipeData = {
      ...formData,
      ingredients,
      directions,
      nutrition: {
        calories: formData.calories,
        fat: formData.fat,
        protein: formData.protein,
        carbs: formData.carbs,
      },
    };
  
    const backend_url = 'http://localhost:3000'; // Backend URL
  
    try {
      const response = await axios.post(`${backend_url}/recipes`, { recipe: recipeData }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('Response:', response.data);
      navigate("/recipes");
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code that falls out of the range of 2xx
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
        console.error('Response headers:', error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.error('Request data:', error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error message:', error.message);
      }
      console.error('Error config:', error.config);
    }
  };  

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Create a New Recipe</h2>

      <div className="mb-4">
        <label htmlFor="title" className="block text-lg font-medium mb-2">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="border border-gray-300 rounded px-4 py-2 w-full"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="image" className="block text-lg font-medium mb-2">Image URL</label>
        <input
          type="url"
          id="image"
          name="image"
          value={formData.image}
          onChange={handleChange}
          className="border border-gray-300 rounded px-4 py-2 w-full"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="mb-4">
          <label htmlFor="prep_time" className="block text-lg font-medium mb-2">Preparation Time (minutes)</label>
          <input
            type="number"
            id="prep_time"
            name="prep_time"
            value={formData.prep_time}
            onChange={handleChange}
            className="border border-gray-300 rounded px-4 py-2 w-full"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="cook_time" className="block text-lg font-medium mb-2">Cooking Time (minutes)</label>
          <input
            type="number"
            id="cook_time"
            name="cook_time"
            value={formData.cook_time}
            onChange={handleChange}
            className="border border-gray-300 rounded px-4 py-2 w-full"
          />
        </div>
      </div>

      <div className="mb-4">
        <label htmlFor="servings" className="block text-lg font-medium mb-2">Servings</label>
        <input
          type="number"
          id="servings"
          name="servings"
          value={formData.servings}
          onChange={handleChange}
          className="border border-gray-300 rounded px-4 py-2 w-full"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="difficulty" className="block text-lg font-medium mb-2">Difficulty</label>
        <select
          id="difficulty"
          name="difficulty"
          value={formData.difficulty}
          onChange={handleChange}
          className="border border-gray-300 rounded px-4 py-2 w-full"
        >
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-lg font-medium mb-2">Ingredients</label>
        <ol>
          {ingredients.map((ingredient, index) => (
            <li key={index} className="mb-3 flex items-center space-x-2">
              <input
                type="text"
                name="ingredient"
                placeholder="Ingredient"
                value={ingredient.ingredient}
                onChange={(e) => handleIngredientChange(index, e)}
                required
                className="border border-gray-300 rounded px-4 py-2 w-full"
              />
              <input
                type="number"
                name="quantity"
                placeholder="Quantity"
                value={ingredient.quantity}
                onChange={(e) => handleIngredientChange(index, e)}
                min="0.01"
                step="any"
                required
                className="border border-gray-300 rounded px-4 py-2 w-full"
              />
              <button
                type="button"
                className="bg-red-500 text-white rounded px-4 py-2"
                onClick={() => removeIngredient(index)}
              >
                Remove
              </button>
            </li>
          ))}
        </ol>
        <button
          type="button"
          className="bg-blue-500 text-white rounded px-4 py-2 mb-3"
          onClick={addIngredient}
        >
          Add Ingredient
        </button>
      </div>

      <div className="mb-4">
        <label className="block text-lg font-medium mb-2">Directions</label>
        <ol>
          {directions.map((direction, index) => (
            <li key={index} className="mb-3 flex items-center space-x-2">
              <textarea
                name="direction"
                value={direction}
                onChange={(e) => handleDirectionChange(index, e)}
                required
                className="border border-gray-300 rounded px-4 py-2 w-full"
              ></textarea>
              <button
                type="button"
                className="bg-red-500 text-white rounded px-4 py-2"
                onClick={() => removeDirection(index)}
              >
                Remove
              </button>
            </li>
          ))}
        </ol>
        <button
          type="button"
          className="bg-blue-500 text-white rounded px-4 py-2 mb-3"
          onClick={addDirection}
        >
          Add Direction
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="mb-4">
          <label htmlFor="calories" className="block text-lg font-medium mb-2">Calories</label>
          <input
            type="number"
            id="calories"
            name="calories"
            value={formData.calories}
            onChange={handleChange}
            className="border border-gray-300 rounded px-4 py-2 w-full"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="fat" className="block text-lg font-medium mb-2">Fat (grams)</label>
          <input
            type="number"
            id="fat"
            name="fat"
            value={formData.fat}
            onChange={handleChange}
            className="border border-gray-300 rounded px-4 py-2 w-full"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="protein" className="block text-lg font-medium mb-2">Protein (grams)</label>
          <input
            type="number"
            id="protein"
            name="protein"
            value={formData.protein}
            onChange={handleChange}
            className="border border-gray-300 rounded px-4 py-2 w-full"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="carbs" className="block text-lg font-medium mb-2">Carbs (grams)</label>
          <input
            type="number"
            id="carbs"
            name="carbs"
            value={formData.carbs}
            onChange={handleChange}
            className="border border-gray-300 rounded px-4 py-2 w-full"
          />
        </div>
      </div>

      <div className="mb-4">
        <label htmlFor="tags" className="block text-lg font-medium mb-2">Tags</label>
        <input
          type="text"
          id="tags"
          name="tags"
          value={formData.tags}
          onChange={handleChange}
          placeholder="Comma separated tags"
          className="border border-gray-300 rounded px-4 py-2 w-full"
        />
      </div>

      <div className="flex space-x-4">
        <button type="submit" className="bg-blue-500 text-white rounded px-4 py-2">Create Recipe</button>
        <a href="/recipes" className="bg-yellow-500 text-white rounded px-4 py-2">Back to All Recipes</a>
      </div>
    </form>
  );
};

export default CreateRecipe;
