import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Spinner from '../components/Spinner';
import {
    handleChange,
    addIngredient,
    removeIngredient,
    handleIngredientChange,
    addDirection,
    removeDirection,
    handleDirectionChange,
    handleEditSubmit
} from '../components/CreateRecipe/functions';

import FormInput from '../components/CreateRecipe/FormInput';
import FormSelect from '../components/CreateRecipe/FormSelect';
import IngredientList from '../components/CreateRecipe/IngredientList';
import DirectionList from '../components/CreateRecipe/DirectionList';
import FormButton from '../components/CreateRecipe/FormButton';
import ErrorMessage from '../components/Authorization/ErrorMessage';

const EditRecipe = () => {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const backend_url = import.meta.env.VITE_BACKEND_URL; // Accessing the VITE_BACKEND_URL environment variable
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
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const getData = async () => {
            setError(null);  // Reset the error state before making the request
            try {
                const response = await axios.get(`${backend_url}/recipes/${id}`);
                const recipeData = response.data;
                setFormData({
                    title: recipeData.title,
                    image: recipeData.image,
                    prep_time: recipeData.prep_time,
                    cook_time: recipeData.cook_time,
                    servings: recipeData.servings,
                    difficulty: recipeData.difficulty,
                    calories: recipeData.nutrition.calories,
                    fat: recipeData.nutrition.fat,
                    protein: recipeData.nutrition.protein,
                    carbs: recipeData.nutrition.carbs,
                    tags: recipeData.tags
                });
                setIngredients(recipeData.ingredients);
                setDirections(recipeData.directions);
            } catch (error) {
                if (error.response) {
                    // Handle specific client-side errors without redirecting
                    const errorMessage = error.response.data.message || 'An error occurred. Please try again.';
                    setError(errorMessage);
                    console.error('Response data:', error.response.data);
                    console.error('Response status:', error.response.status);
                    console.error('Response headers:', error.response.headers);
                } else if (error.request) {
                    // The request was made but no response was received
                    const errorMessage = 'No response from server. Please try again later.';
                    setError(errorMessage);
                    navigate('/error', { state: { message: errorMessage } });
                    console.error('Request data:', error.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    const errorMessage = 'An error occurred. Please try again.';
                    setError(errorMessage);
                    navigate('/error', { state: { message: errorMessage } });
                    console.error('Error message:', error.message);
                }
                console.error('Error config:', error.config);
            } finally {
                setLoading(false);
            }
        };
        getData();
    }, [id, backend_url, navigate, setError]);
    

    

    

    if (loading) {
        return <Spinner />;
    }

    return (
        <form onSubmit={(event) => handleEditSubmit(axios, event, formData, ingredients, directions, navigate, backend_url, id, setError)} className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <ErrorMessage message={error}/>
            <h2 className="text-2xl font-bold mb-6">Edit Recipe</h2>
            <FormInput
                label="Title"
                id="title"
                name="title"
                type="text"
                value={formData.title}
                onChange={(event) => handleChange(event, setFormData, formData)}
                required
            />
            <FormInput
                label="Image URL"
                id="image"
                name="image"
                type="url"
                value={formData.image}
                onChange={(event) => handleChange(event, setFormData, formData)}
            />
            <div className="grid grid-cols-2 gap-4">
                <FormInput
                    label="Preparation Time (minutes)"
                    id="prep_time"
                    name="prep_time"
                    type="number"
                    value={formData.prep_time}
                    onChange={(event) => handleChange(event, setFormData, formData)}
                />
                <FormInput
                    label="Cooking Time (minutes)"
                    id="cook_time"
                    name="cook_time"
                    type="number"
                    value={formData.cook_time}
                    onChange={(event) => handleChange(event, setFormData, formData)}
                />
            </div>
            <FormInput
                label="Servings"
                id="servings"
                name="servings"
                type="number"
                value={formData.servings}
                onChange={(event) => handleChange(event, setFormData, formData)}
            />
            <FormSelect
                label="Difficulty"
                id="difficulty"
                name="difficulty"
                value={formData.difficulty}
                onChange={(event) => handleChange(event, setFormData, formData)}
                options={[
                    { value: 'Easy', label: 'Easy' },
                    { value: 'Medium', label: 'Medium' },
                    { value: 'Hard', label: 'Hard' }
                ]}
            />
            <IngredientList
                ingredients={ingredients}
                handleIngredientChange={(index, event) => handleIngredientChange(index, event, ingredients, setIngredients)}
                addIngredient={() => addIngredient(ingredients, setIngredients)}
                removeIngredient={(index) => removeIngredient(index, ingredients, setIngredients)}
            />
            <DirectionList
                directions={directions}
                handleDirectionChange={(index, event) => handleDirectionChange(index, event, directions, setDirections)}
                addDirection={() => addDirection(directions, setDirections)}
                removeDirection={(index) => removeDirection(index, directions, setDirections)}
            />
            <div className="grid grid-cols-2 gap-4">
                <FormInput
                    label="Calories"
                    id="calories"
                    name="calories"
                    type="number"
                    value={formData.calories}
                    onChange={(event) => handleChange(event, setFormData, formData)}
                />
                <FormInput
                    label="Fat (grams)"
                    id="fat"
                    name="fat"
                    type="number"
                    value={formData.fat}
                    onChange={(event) => handleChange(event, setFormData, formData)}
                />
                <FormInput
                    label="Protein (grams)"
                    id="protein"
                    name="protein"
                    type="number"
                    value={formData.protein}
                    onChange={(event) => handleChange(event, setFormData, formData)}
                />
                <FormInput
                    label="Carbs (grams)"
                    id="carbs"
                    name="carbs"
                    type="number"
                    value={formData.carbs}
                    onChange={(event) => handleChange(event, setFormData, formData)}
                />
            </div>
            <FormInput
                label="Tags"
                id="tags"
                name="tags"
                type="text"
                value={formData.tags}
                onChange={(event) => handleChange(event, setFormData, formData)}
                placeholder="Comma separated tags"
            />
            <div className="flex space-x-4">
                <FormButton type="submit" label="Update Recipe" className="bg-blue-500 text-white rounded px-4 py-2" />
                <a href="/recipes" className="bg-yellow-500 text-white rounded px-4 py-2">Back to All Recipes</a>
            </div>
        </form>
    );
};

export default EditRecipe;
