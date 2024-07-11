import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
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
import IngredientList from '../components/CreateRecipe/IngredientList';
import DirectionList from '../components/CreateRecipe/DirectionList';
import { toast } from "react-toastify";

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
  Divider,
  Paper
} from '@mui/material';

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
    <Container maxWidth="md">
      {error && (
        <Box mb={2}>
          <Typography color="error">{error}</Typography>
        </Box>
      )}
      <Typography variant="h4" gutterBottom>
        Create a New Recipe
      </Typography>
      <form
        onSubmit={(event) => handleSubmit(axios, event, formData, ingredients, directions, navigate, backend_url, setError, toast)}
      >
        <TextField
          fullWidth
          label="Title"
          id="title"
          name="title"
          value={formData.title}
          onChange={(event) => handleChange(event, setFormData, formData)}
          required
          margin="normal"
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
        />
        <Typography variant="h7" gutterBottom>
          Difficulty
        </Typography>
        <FormControl fullWidth margin="normal">
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
            Create Recipe
          </Button>
          <Button component={Link} to="/recipes" variant="contained" color="secondary">
            Back to All Recipes
          </Button>
        </Box>
      </form>
    </Container>
  );
};

export default CreateRecipe;
