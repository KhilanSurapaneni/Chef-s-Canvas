import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  handleChange, 
  addIngredient, 
  removeIngredient, 
  handleIngredientChange, 
  addDirection, 
  removeDirection, 
  handleDirectionChange, 
  handleSubmit 
} from '../components/CreateRecipe/functions';

import FormInput from '../components/CreateRecipe/FormInput';
import FormSelect from '../components/CreateRecipe/FormSelect';
import IngredientList from '../components/CreateRecipe/IngredientList';
import DirectionList from '../components/CreateRecipe/DirectionList';
import FormButton from '../components/CreateRecipe/FormButton';
import ErrorMessage from '../components/Authorization/ErrorMessage';
import { toast } from "react-toastify";

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
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const backend_url = import.meta.env.VITE_BACKEND_URL; // Accessing the VITE_BACKEND_URL environment variable

  return (
    <form 
      onSubmit={(event) => handleSubmit(axios, event, formData, ingredients, directions, navigate, backend_url, setError, toast)} 
      className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md"
    >
      <ErrorMessage message={error}/>
      <h2 className="text-2xl font-bold mb-6">Create a New Recipe</h2>
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
        <FormButton type="submit" label="Create Recipe" className="bg-blue-500 text-white rounded px-4 py-2" />
        <a href="/recipes" className="bg-yellow-500 text-white rounded px-4 py-2">Back to All Recipes</a>
      </div>
    </form>
  );
};

export default CreateRecipe;
