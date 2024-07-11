import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Box, CircularProgress } from '@mui/material';
import RecipeDetails from '../components/Recipe/RecipeDetails';
import RecipeActions from '../components/Recipe/RecipeActions';
import ReviewForm from '../components/Recipe/Reviews/ReviewForm';

const Recipe = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [recipe, setRecipe] = useState({
    nutrition: {},
    ingredients: [],
    directions: [],
    tags: [],
  });
  const navigate = useNavigate();
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
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 4 }}>
      <RecipeActions backend_url={backend_url} />
      <Box component="article" sx={{ p: 3, bgcolor: 'background.paper', borderRadius: 1 }}>
        <RecipeDetails recipe={recipe} />
      </Box>
      <ReviewForm backend_url={backend_url} />
    </Container>
  );
};

export default Recipe;
