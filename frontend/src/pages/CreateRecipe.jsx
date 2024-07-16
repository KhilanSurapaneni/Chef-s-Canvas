import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Box, useTheme } from '@mui/material';
import RecipeForm from '../components/CreateRecipe/RecipeForm';

const CreateRecipe = () => {
  const [ingredients, setIngredients] = useState([{ ingredient: '', quantity: '' }]);
  const [directions, setDirections] = useState(['']);
  const [images, setImages] = useState(['']); // State for image URLs
  const [formData, setFormData] = useState({
    title: '',
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
  const theme = useTheme();
  const backend_url = import.meta.env.VITE_BACKEND_URL; // Accessing the VITE_BACKEND_URL environment variable

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      {error && (
        <Box mb={2}>
          <Typography sx={{ color: theme.palette.error.main }}>{error}</Typography>
        </Box>
      )}
      <Typography variant="h4" gutterBottom>
        Create a New Recipe
      </Typography>
      <RecipeForm
        formData={formData}
        setFormData={setFormData}
        ingredients={ingredients}
        setIngredients={setIngredients}
        directions={directions}
        setDirections={setDirections}
        images={images}
        setImages={setImages}
        errors={errors}
        setErrors={setErrors}
        error={error}
        setError={setError}
        navigate={navigate}
        backend_url={backend_url}
        theme={theme}
      />
    </Container>
  );
};

export default CreateRecipe;
