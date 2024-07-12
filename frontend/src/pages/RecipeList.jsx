import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, Grid, CircularProgress, Typography, Box, useTheme } from '@mui/material';
import RecipeItem from '../components/RecipeList/RecipeItem';

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const theme = useTheme();
  const backend_url = import.meta.env.VITE_BACKEND_URL; // Accessing the VITE_BACKEND_URL environment variable

  useEffect(() => {
    const get_data = async () => {
      try {
        const response = await axios.get(`${backend_url}/recipes`);
        setRecipes(response.data);
      } catch (error) {
        const errorMessage = error.response?.data?.message || 'An error occurred while fetching recipes. Please try again later.';
        navigate('/error', { state: { message: errorMessage } });
        console.error('Error fetching recipes:', error);
      } finally {
        setLoading(false);
      }
    };

    get_data();
  }, [backend_url, navigate]);

  if (loading) {
    return (
      <Container>
        <Grid container justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
          <CircularProgress sx={{ color: theme.palette.primary.main }} />
        </Grid>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 4, mb: 4 }}> {/* Added mb: 4 for bottom spacing */}
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Recipe List
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          Explore a variety of delicious recipes.
        </Typography>
      </Box>
      <Grid container spacing={4}>
        {recipes.map((recipe) => (
          <Grid item key={recipe._id} xs={12} sm={6} md={6} lg={4}>
            <RecipeItem recipe={recipe} />
          </Grid>
        ))}
      </Grid>
      <Box sx={{ mb: 4 }} /> {/* Added an empty Box for extra bottom spacing */}
    </Container>
  );
};

export default RecipeList;