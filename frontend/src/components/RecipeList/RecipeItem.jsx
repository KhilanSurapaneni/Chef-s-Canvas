import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardActionArea, CardContent, CardMedia, Typography, Box, Divider } from '@mui/material';
import RecipeTags from './RecipeTags';

const RecipeItem = ({ recipe }) => {
  return (
    <Card
      component={Link}
      to={`/recipes/${recipe._id}`}
      sx={{
        transform: 'scale(1)',
        transition: 'transform 0.3s',
        '&:hover': {
          transform: 'scale(1.05)',
        },
      }}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          height="180"
          image={recipe.image}
          alt={recipe.title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" color="textPrimary">
            {recipe.title}
          </Typography>
          <Box sx={{ mt: 2, color: 'text.secondary' }}>
            <Typography>Prep Time: {recipe.prep_time} mins</Typography>
            <Typography>Cook Time: {recipe.cook_time} mins</Typography>
            <Typography>Servings: {recipe.servings}</Typography>
            <Typography>Difficulty: {recipe.difficulty}</Typography>
            <Typography>Calories: {recipe.nutrition.calories}</Typography>
          </Box>
          <RecipeTags tags={recipe.tags} />
          <Divider sx={{ my: 2 }} />
          <Typography variant="body2" color="textSecondary" align="center">
            Created by: {recipe.created_by?.username}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default RecipeItem;
