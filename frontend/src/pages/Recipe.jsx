import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Box, CircularProgress, Grid, useTheme } from '@mui/material';
import RecipeDetails from '../components/Recipe/RecipeDetails';
import RecipeActions from '../components/Recipe/RecipeActions';
import ReviewForm from '../components/Recipe/Reviews/Form/ReviewForm';
import ReviewList from '../components/Recipe/Reviews/List/ReviewList';

const Recipe = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [recipe, setRecipe] = useState({
    nutrition: {},
    ingredients: [],
    directions: [],
    tags: [],
    reviews: []
  });
  const navigate = useNavigate();
  const theme = useTheme();
  const backend_url = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(`${backend_url}/recipes/${id}`);
        setRecipe(response.data);
      } catch (error) {
        const errorMessage = error.response?.data?.message || 'An error occurred while fetching the recipe. Please try again later.';
        navigate('/error', { state: { message: errorMessage } });
        console.error('Error fetching recipe:', error);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [id, backend_url, navigate]);

  if (loading) {
    return (
      <Container>
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
          <CircularProgress sx={{ color: theme.palette.primary.main }} />
        </Box>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 4 }}>
      <Box component="article" sx={{ p: 3, bgcolor: 'background.paper', borderRadius: 1 }}>
        <RecipeActions backend_url={backend_url} />
        <RecipeDetails recipe={recipe} />
      </Box>
      <Grid container spacing={3} sx={{ mt: 4 }}>
        <Grid item xs={12} md={6}>
          <ReviewForm backend_url={backend_url} />
        </Grid>
        <Grid item xs={12} md={6}>
          <ReviewList reviews={recipe.reviews} backend_url={backend_url} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Recipe;