import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Typography, Box, useTheme } from '@mui/material';
import Spinner from '../components/Spinner';
import RecipeForm from '../components/CreateRecipe/RecipeForm';

const EditRecipe = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const backend_url = import.meta.env.VITE_BACKEND_URL;
  const [ingredients, setIngredients] = useState([{ ingredient: '', quantity: '' }]);
  const [directions, setDirections] = useState(['']);
  const [images, setImages] = useState(['']);
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

  useEffect(() => {
    const getData = async () => {
      setError(null);
      try {
        const response = await axios.get(`${backend_url}/recipes/${id}`);
        const recipeData = response.data;
        setFormData({
          title: recipeData.title,
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
        setImages(recipeData.images || ['']);
      } catch (error) {
        handleRequestError(error);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [id, backend_url, navigate]);

  const handleRequestError = (error) => {
    if (error.response) {
      const errorMessage = error.response.data.message || 'An error occurred. Please try again.';
      setError(errorMessage);
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
      console.error('Response headers:', error.response.headers);
    } else if (error.request) {
      const errorMessage = 'No response from server. Please try again later.';
      setError(errorMessage);
      navigate('/error', { state: { message: errorMessage } });
      console.error('Request data:', error.request);
    } else {
      const errorMessage = 'An error occurred. Please try again.';
      setError(errorMessage);
      navigate('/error', { state: { message: errorMessage } });
      console.error('Error message:', error.message);
    }
    console.error('Error config:', error.config);
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      {error && (
        <Box mb={2}>
          <Typography sx={{ color: theme.palette.error.main }}>{error}</Typography>
        </Box>
      )}
      <Typography variant="h4" gutterBottom>
        Edit Recipe
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
        isEdit={true}
        id={id}
      />
    </Container>
  );
};

export default EditRecipe;
