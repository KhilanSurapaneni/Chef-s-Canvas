import React from 'react';
import { TextField, Grid, Box, Button, Divider, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { Link } from 'react-router-dom';
import ImageList from './ImageList';
import IngredientList from './IngredientList';
import DirectionList from './DirectionList';
import NutritionInfo from './NutritionInfo';
import RecipeTags from './RecipeTags';
import { handleChange, handleSubmit as handleCreateSubmit, handleEditSubmit, addIngredient, removeIngredient, handleIngredientChange, addDirection, removeDirection, handleDirectionChange, addImage, removeImage, handleImageChange } from './functions';
import { toast } from "react-toastify";
import axios from 'axios';

const RecipeForm = ({ formData, setFormData, ingredients, setIngredients, directions, setDirections, images, setImages, errors, setErrors, error, setError, navigate, backend_url, theme, isEdit = false, id = null }) => {

  const handleSubmitForm = (event) => {
    event.preventDefault();
    if (validateForm()) {
      if (isEdit) {
        handleEditSubmit(axios, event, formData, ingredients, directions, images, navigate, backend_url, id, setError, toast);
      } else {
        handleCreateSubmit(axios, event, formData, ingredients, directions, images, navigate, backend_url, setError, toast);
      }
    } else {
      toast.error('Please fill in all required fields');
    }
  };

  const validateForm = () => {
    let formErrors = {};
    if (!formData.title) formErrors.title = 'Title is required';
    if (!images.every(img => img)) formErrors.images = 'All image URLs must be filled';
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

  return (
    <form onSubmit={handleSubmitForm}>
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
      <ImageList
        images={images}
        handleImageChange={(index, event) => handleImageChange(index, event, images, setImages)}
        addImage={() => addImage(images, setImages)}
        removeImage={(index) => removeImage(index, images, setImages)}
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
      />
      <DirectionList
        directions={directions}
        handleDirectionChange={(index, event) => handleDirectionChange(index, event, directions, setDirections)}
        addDirection={() => addDirection(directions, setDirections)}
        removeDirection={(index) => removeDirection(index, directions, setDirections)}
      />
      <Divider sx={{ my: 2 }} />
      <Typography variant="h6" gutterBottom>
        Nutrition Information
      </Typography>
      <NutritionInfo formData={formData} setFormData={setFormData} errors={errors} handleChange={handleChange} />
      <RecipeTags formData={formData} setFormData={setFormData} handleChange={handleChange} />
      <Box display="flex" justifyContent="space-between" mt={2}>
        <Button type="submit" variant="contained" sx={{ backgroundColor: theme.palette.primary.main }}>
          {isEdit ? "Update Recipe" : "Create Recipe"}
        </Button>
        <Button component={Link} to="/recipes" variant="contained" sx={{ backgroundColor: theme.palette.secondary.main }}>
          Back to All Recipes
        </Button>
      </Box>
    </form>
  );
};

export default RecipeForm;
