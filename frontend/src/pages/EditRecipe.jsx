import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { 
  Container, 
  Typography, 
  TextField, 
  Grid, 
  Button, 
  Box, 
  MenuItem, 
  FormControl, 
  InputLabel, 
  Select, 
  Divider 
} from '@mui/material';
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
import IngredientList from '../components/CreateRecipe/IngredientList';
import DirectionList from '../components/CreateRecipe/DirectionList';
import { toast } from "react-toastify";

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
  const [errors, setErrors] = useState({});
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

  const validateForm = () => {
    let formErrors = {};
    if (!formData.title) formErrors.title = 'Title is required';
    if (!formData.image) formErrors.image = 'Image URL is required';
    if (!formData.prep_time) formErrors.prep_time = 'Preparation time is required';
    if (!formData.cook_time) formErrors.cook_time = 'Cooking time is required';
    if (!formData.servings) formErrors.servings = 'Servings is required';
    if (!formData.calories) formErrors.calories = 'Calories are required';
    if (!formData.fat) formErrors.fat = 'Fat content is required';
    if (!formData.protein) formErrors.protein = 'Protein content is required';
    if (!formData.carbs) formErrors.carbs = 'Carbs content is required';
    if (!ingredients.every(ing => ing.ingredient && ing.quantity)) formErrors.ingredients = 'All ingredients must be filled';
    if (!directions.every(dir => dir)) formErrors.directions = 'All directions must be filled';
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      handleEditSubmit(axios, event, formData, ingredients, directions, navigate, backend_url, id, setError, toast);
    } else {
      toast.error('Please fill in all required fields');
    }
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <Container maxWidth="md">
      {error && (
        <Box mb={2}>
          <Typography color="error">{error}</Typography>
        </Box>
      )}
      <Typography variant="h4" gutterBottom>
        Edit Recipe
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Title"
          id="title"
          name="title"
          value={formData.title}
          onChange={(event) => handleChange(event, setFormData, formData)}
          required
          margin="normal"
          error={!!errors.title}
          helperText={errors.title}
        />
        <TextField
          fullWidth
          label="Image URL"
          id="image"
          name="image"
          type="url"
          value={formData.image}
          onChange={(event) => handleChange(event, setFormData, formData)}
          margin="normal"
          error={!!errors.image}
          helperText={errors.image}
        />
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Preparation Time (minutes)"
              id="prep_time"
              name="prep_time"
              type="number"
              value={formData.prep_time}
              onChange={(event) => handleChange(event, setFormData, formData)}
              margin="normal"
              error={!!errors.prep_time}
              helperText={errors.prep_time}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Cooking Time (minutes)"
              id="cook_time"
              name="cook_time"
              type="number"
              value={formData.cook_time}
              onChange={(event) => handleChange(event, setFormData, formData)}
              margin="normal"
              error={!!errors.cook_time}
              helperText={errors.cook_time}
            />
          </Grid>
        </Grid>
        <TextField
          fullWidth
          label="Servings"
          id="servings"
          name="servings"
          type="number"
          value={formData.servings}
          onChange={(event) => handleChange(event, setFormData, formData)}
          margin="normal"
          error={!!errors.servings}
          helperText={errors.servings}
        />
        <FormControl fullWidth margin="normal" error={!!errors.difficulty}>
          <InputLabel id="difficulty-label">Difficulty</InputLabel>
          <Select
            labelId="difficulty-label"
            id="difficulty"
            name="difficulty"
            value={formData.difficulty}
            onChange={(event) => handleChange(event, setFormData, formData)}
          >
            <MenuItem value="Easy">Easy</MenuItem>
            <MenuItem value="Medium">Medium</MenuItem>
            <MenuItem value="Hard">Hard</MenuItem>
          </Select>
        </FormControl>
        <IngredientList
          ingredients={ingredients}
          handleIngredientChange={(index, event) => handleIngredientChange(index, event, ingredients, setIngredients)}
          addIngredient={() => addIngredient(ingredients, setIngredients)}
          removeIngredient={(index) => removeIngredient(index, ingredients, setIngredients)}
          error={!!errors.ingredients}
          helperText={errors.ingredients}
        />
        <DirectionList
          directions={directions}
          handleDirectionChange={(index, event) => handleDirectionChange(index, event, directions, setDirections)}
          addDirection={() => addDirection(directions, setDirections)}
          removeDirection={(index) => removeDirection(index, directions, setDirections)}
          error={!!errors.directions}
          helperText={errors.directions}
        />
        <Divider sx={{ my: 2 }} />
        <Typography variant="h6" gutterBottom>
          Nutrition Information
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Calories"
              id="calories"
              name="calories"
              type="number"
              value={formData.calories}
              onChange={(event) => handleChange(event, setFormData, formData)}
              margin="normal"
              error={!!errors.calories}
              helperText={errors.calories}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Fat (grams)"
              id="fat"
              name="fat"
              type="number"
              value={formData.fat}
              onChange={(event) => handleChange(event, setFormData, formData)}
              margin="normal"
              error={!!errors.fat}
              helperText={errors.fat}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Protein (grams)"
              id="protein"
              name="protein"
              type="number"
              value={formData.protein}
              onChange={(event) => handleChange(event, setFormData, formData)}
              margin="normal"
              error={!!errors.protein}
              helperText={errors.protein}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Carbs (grams)"
              id="carbs"
              name="carbs"
              type="number"
              value={formData.carbs}
              onChange={(event) => handleChange(event, setFormData, formData)}
              margin="normal"
              error={!!errors.carbs}
              helperText={errors.carbs}
            />
          </Grid>
        </Grid>
        <TextField
          fullWidth
          label="Tags"
          id="tags"
          name="tags"
          type="text"
          value={formData.tags}
          onChange={(event) => handleChange(event, setFormData, formData)}
          placeholder="Comma separated tags"
          margin="normal"
        />
        <Box display="flex" justifyContent="space-between" mt={2}>
          <Button type="submit" variant="contained" color="primary">
            Update Recipe
          </Button>
          <Button component={Link} to="/recipes" variant="contained" color="secondary">
            Back to All Recipes
          </Button>
        </Box>
      </form>
    </Container>
  );
};

export default EditRecipe;
