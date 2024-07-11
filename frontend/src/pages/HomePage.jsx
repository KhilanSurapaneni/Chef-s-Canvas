import React from 'react';
import { Container, Typography, Box, Button, Grid } from '@mui/material';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 8 }}>
      <Box textAlign="center" mb={4}>
        <Typography variant="h2" component="h1" gutterBottom>
          Welcome to Chef's Canvas
        </Typography>
        <Typography variant="h5" component="h2" color="textSecondary">
          Discover, create, and share amazing recipes with our community.
        </Typography>
      </Box>

      <Grid container spacing={4} justifyContent="center">
        <Grid item>
          <Button component={Link} to="/recipes" variant="contained" color="primary">
            Browse Recipes
          </Button>
        </Grid>
        <Grid item>
          <Button component={Link} to="/recipes/create" variant="contained" color="secondary">
            Create a Recipe
          </Button>
        </Grid>
      </Grid>

      <Box mt={6} textAlign="center">
        <Typography variant="body1" color="textSecondary">
          Explore the world of culinary delights with Chef's Canvas.
        </Typography>
      </Box>
    </Container>
  );
};

export default HomePage;
