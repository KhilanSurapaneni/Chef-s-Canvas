import React from 'react';
import { Box, Typography, Grid, List, ListItem, ListItemText, Divider, useTheme } from '@mui/material';
import RecipeTags from '../RecipeList/RecipeTags';
import RecipeTitle from './Details/RecipeTitle';
import RecipeImage from './Details/RecipeImage';
import RecipeSection from './Details/RecipeSection';
import Rating from '../RecipeList/Rating';
import CreatedBy from '../RecipeList/CreatedBy';

const RecipeDetails = ({ recipe }) => {
  const theme = useTheme();

  return (
    <Box sx={{ padding: 2, backgroundColor: theme.palette.background.paper }}>
      <Box sx={{ padding: 2, marginBottom: 2 }}>
        <RecipeImage images={recipe.images} title={recipe.title} />
        <RecipeTitle title={recipe.title} created_by={recipe.created_by.username}/>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 1 }}>
          <RecipeTags tags={recipe.tags} />
          <Rating recipe={recipe} showNumRatings={true} />
        </Box>
        <Box sx={{ marginTop: 2, width: '100%', lg: { width: '67%' } }}>
          <RecipeSection title="Ingredients">
            <List sx={{ listStyleType: 'disc', pl: 2 }}>
              {recipe.ingredients.map((ingredient) => (
                <ListItem key={ingredient._id} sx={{ display: 'list-item' }}>
                  <ListItemText primary={`${ingredient.quantity}g ${ingredient.ingredient}`} />
                </ListItem>
              ))}
            </List>
          </RecipeSection>
          <Divider sx={{ marginY: 2, backgroundColor: theme.palette.divider }} />
          <RecipeSection title="Directions">
            <List sx={{ listStyleType: 'decimal', pl: 2 }}>
              {recipe.directions.map((direction, index) => (
                <ListItem key={index} sx={{ display: 'list-item' }}>
                  <ListItemText primary={direction} />
                </ListItem>
              ))}
            </List>
          </RecipeSection>
          <Divider sx={{ marginY: 2, backgroundColor: theme.palette.divider }} />
          <RecipeSection title="Nutrition">
            <Grid container spacing={2}>
              <Grid item xs={6}><Typography>Calories: {recipe.nutrition.calories}</Typography></Grid>
              <Grid item xs={6}><Typography>Fat: {recipe.nutrition.fat}g</Typography></Grid>
              <Grid item xs={6}><Typography>Protein: {recipe.nutrition.protein}g</Typography></Grid>
              <Grid item xs={6}><Typography>Carbs: {recipe.nutrition.carbs}g</Typography></Grid>
            </Grid>
          </RecipeSection>
          <Divider sx={{ marginY: 2, backgroundColor: theme.palette.divider }} />
          <RecipeSection title="Details">
            <Grid container spacing={2}>
              <Grid item xs={6}><Typography>Prep Time: {recipe.prep_time} mins</Typography></Grid>
              <Grid item xs={6}><Typography>Cook Time: {recipe.cook_time} mins</Typography></Grid>
              <Grid item xs={6}><Typography>Servings: {recipe.servings}</Typography></Grid>
              <Grid item xs={6}><Typography>Difficulty: {recipe.difficulty}</Typography></Grid>
            </Grid>
          </RecipeSection>
        </Box>
      </Box>
    </Box>
  );
};

export default RecipeDetails;
