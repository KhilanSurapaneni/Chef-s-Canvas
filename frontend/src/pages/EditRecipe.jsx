import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';

const EditRecipe = () => {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);

    const [recipe, setRecipe] = useState({
        title: '',
        image: '',
        prep_time: '',
        cook_time: '',
        servings: '',
        difficulty: 'Easy',
        ingredients: [{ ingredient: '', quantity: '' }],
        directions: [''],
        nutrition: {
            calories: '',
            fat: '',
            protein: '',
            carbs: ''
        },
        tags: ''
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
    
    

    const handleChange = (event) => {
        const { name, value } = event.target;
        setRecipe({
            ...recipe,
            [name]: value
        });
    };

    const addIngredient = () => {
        setRecipe({
            ...recipe,
            ingredients: [...recipe.ingredients, { ingredient: '', quantity: '' }]
        });
    };

    const removeIngredient = (index) => {
        const newIngredients = recipe.ingredients.filter((_, i) => i !== index);
        setRecipe({
            ...recipe,
            ingredients: newIngredients
        });
    };

    const handleIngredientChange = (index, event) => {
        const { name, value } = event.target;
        const newIngredients = recipe.ingredients.map((ingredient, i) =>
            i === index ? { ...ingredient, [name]: value } : ingredient
        );
        setRecipe({
            ...recipe,
            ingredients: newIngredients
        });
    };

    const addDirection = () => {
        setRecipe({
            ...recipe,
            directions: [...recipe.directions, '']
        });
    };

    const removeDirection = (index) => {
        const newDirections = recipe.directions.filter((_, i) => i !== index);
        setRecipe({
            ...recipe,
            directions: newDirections
        });
    };

    const handleDirectionChange = (index, event) => {
        const { value } = event.target;
        const newDirections = recipe.directions.map((direction, i) =>
            i === index ? value : direction
        );
        setRecipe({
            ...recipe,
            directions: newDirections
        });
    };

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        try {
            const response = await axios.put(`${backend_url}/recipes/${id}`, { recipe }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const updated_recipe = response.data;
            navigate(`/recipes/${updated_recipe._id}/`);  // Ensure this path is correct
        } catch (error) {
            if (error.response) {
                console.error('Response data:', error.response.data);
                console.error('Response status:', error.response.status);
                console.error('Response headers:', error.response.headers);
            } else if (error.request) {
                console.error('Request data:', error.request);
            } else {
                console.error('Error message:', error.message);
            }
            console.error('Error config:', error.config);
        }
    };    

    if (loading) {
        return <Spinner />;
    }

    return (
        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6">Edit Recipe</h2>

            <div className="mb-4">
                <label htmlFor="title" className="block text-lg font-medium mb-2">Title</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={recipe.title}
                    onChange={handleChange}
                    placeholder="Recipe Title"
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
                    value={recipe.image}
                    onChange={handleChange}
                    placeholder="https://example.com/image.jpg"
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
                        value={recipe.prep_time}
                        onChange={handleChange}
                        placeholder="10"
                        className="border border-gray-300 rounded px-4 py-2 w-full"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="cook_time" className="block text-lg font-medium mb-2">Cooking Time (minutes)</label>
                    <input
                        type="number"
                        id="cook_time"
                        name="cook_time"
                        value={recipe.cook_time}
                        onChange={handleChange}
                        placeholder="20"
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
                    value={recipe.servings}
                    onChange={handleChange}
                    placeholder="4"
                    className="border border-gray-300 rounded px-4 py-2 w-full"
                />
            </div>

            <div className="mb-4">
                <label htmlFor="difficulty" className="block text-lg font-medium mb-2">Difficulty</label>
                <select
                    id="difficulty"
                    name="difficulty"
                    value={recipe.difficulty}
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
                    {recipe.ingredients.map((ingredient, index) => (
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
                    {recipe.directions.map((direction, index) => (
                        <li key={index} className="mb-3 flex items-center space-x-2">
                            <textarea
                                name="direction"
                                placeholder="Step by step instructions"
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
                        value={recipe.nutrition.calories}
                        onChange={handleChange}
                        placeholder="500"
                        className="border border-gray-300 rounded px-4 py-2 w-full"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="fat" className="block text-lg font-medium mb-2">Fat (grams)</label>
                    <input
                        type="number"
                        id="fat"
                        name="fat"
                        value={recipe.nutrition.fat}
                        onChange={handleChange}
                        placeholder="20"
                        className="border border-gray-300 rounded px-4 py-2 w-full"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="protein" className="block text-lg font-medium mb-2">Protein (grams)</label>
                    <input
                        type="number"
                        id="protein"
                        name="protein"
                        value={recipe.nutrition.protein}
                        onChange={handleChange}
                        placeholder="25"
                        className="border border-gray-300 rounded px-4 py-2 w-full"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="carbs" className="block text-lg font-medium mb-2">Carbs (grams)</label>
                    <input
                        type="number"
                        id="carbs"
                        name="carbs"
                        value={recipe.nutrition.carbs}
                        onChange={handleChange}
                        placeholder="60"
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
                    value={recipe.tags}
                    onChange={handleChange}
                    placeholder="Comma separated tags"
                    className="border border-gray-300 rounded px-4 py-2 w-full"
                />
            </div>

            <div className="flex space-x-4">
                <button type="submit" className="bg-blue-500 text-white rounded px-4 py-2">Update Recipe</button>
                <a href="/recipes" className="bg-yellow-500 text-white rounded px-4 py-2">Back to All Recipes</a>
            </div>
        </form>
    );
};

export default EditRecipe;
